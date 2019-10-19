'use strict';
(function () {
  var PinSize = {
    RADIUS: 25,
    HEIGHT: 70
  };

  var mapPinsBlock = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Pin creating
  var renderPin = function (offer) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pinImage.alt = offer.offer.title;
    pinImage.src = offer.author.avatar;
    pin.style.left = (offer.location.x - PinSize.RADIUS) + 'px';
    pin.style.top = (offer.location.y - PinSize.HEIGHT) + 'px';

    return pin;
  };

  var getPinFragment = window.util.makeFragmentRender(renderPin);

  window.map = {
    renderPins: function (adverts) {
      mapPinsBlock.appendChild(getPinFragment(adverts));
    }
  };
}());
