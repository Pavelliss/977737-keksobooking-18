'use strict';
(function () {
  window.UtilMainPinSize = {
    RADIUS: 32,
    HEIGHT: 80
  };

  var KeyboardKey = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    ESCAPE_IE: 'Esc'
  };

  window.mapPinMain = document.querySelector('.map__pin--main');
  window.adForm = document.querySelector('.ad-form');
  var adFormAddress = window.adForm.querySelector('#address');

  window.util = {
    isEnterKey: function (evt) {
      return evt.key === KeyboardKey.ENTER;
    },

    renderAddress: function (coords) {
      adFormAddress.value = coords.x + ', ' + coords.y;
    },

    getMainPinCoords: function (height) {
      return {
        x: window.mapPinMain.offsetLeft + window.UtilMainPinSize.RADIUS,
        y: window.mapPinMain.offsetTop + height
      };
    }
  };
}());
