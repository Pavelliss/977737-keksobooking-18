'use strict';
(function () {
  var PinSize = {
    RADIUS: 25,
    HEIGHT: 70
  };

  var mapPinsBlock = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Pin creating
  var renderPin = function (offerPin) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pinImage.alt = offerPin.offer.title;
    pinImage.src = offerPin.author.avatar;
    pin.style.left = (offerPin.location.x - PinSize.RADIUS) + 'px';
    pin.style.top = (offerPin.location.y - PinSize.HEIGHT) + 'px';

    return pin;
  };

  var getPinFragment = window.util.makeFragmentRender(renderPin);

  window.map = {
    renderPins: function (adverts) {
      mapPinsBlock.appendChild(getPinFragment(adverts));
    }
  };
}());
