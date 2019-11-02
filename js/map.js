'use strict';
(function () {
  var PinSize = {
    RADIUS: 25,
    HEIGHT: 70
  };

  var mapPinsBlock = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Pin creating
  var renderPin = function (advert) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pinImage.alt = advert.offer.title;
    pinImage.src = advert.author.avatar;
    pin.style.left = (advert.location.x - PinSize.RADIUS) + 'px';
    pin.style.top = (advert.location.y - PinSize.HEIGHT) + 'px';

    pin.addEventListener('click', function () {
      window.card.close();
      window.card.show(advert);
      pin.classList.add('map__pin--active');
    });

    return pin;
  };

  var getPinFragment = window.util.makeFragmentRender(renderPin);

  window.map = {
    renderPins: function (adverts) {
      mapPinsBlock.appendChild(getPinFragment(adverts));
    }
  };
}());

