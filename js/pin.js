'use strict';
(function () {
  var getMainPinCoords = function (height) {
    return {
      x: window.domRef.mapPinMain.offsetLeft + window.pin.MainPinSize.RADIUS,
      y: window.domRef.mapPinMain.offsetTop + height
    };
  };

  window.domRef.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      window.form.renderAddress(window.pin.getMainPinCoords(window.pin.MainPinSize.HEIGHT));

      // calculate the difference
      var shift = {
        x: startCords.x - moveEvt.clientX,
        y: startCords.y - moveEvt.clientY
      };

      // update coords
      startCords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinToLimitX = {
        pinMax: window.map.MapRect.RIGHT - window.pin.MainPinSize.RADIUS,
        pinMin: window.map.MapRect.LEFT - window.pin.MainPinSize.RADIUS,
        offsetValue: window.domRef.mapPinMain.offsetLeft - shift.x,
      };

      var pinToLimitY = {
        pinMax: window.map.MapRect.BOTTOM,
        pinMin: window.map.MapRect.TOP,
        offsetValue: window.domRef.mapPinMain.offsetTop - shift.y,
      };
      // test
      var addLimitMove = function (pinObj) {
        if (pinObj.offsetValue < pinObj.pinMax && pinObj.offsetValue > pinObj.pinMin) {
          var newCordPin = pinObj.offsetValue + 'px';
        }
        return newCordPin;
      };

      window.domRef.mapPinMain.style.left = addLimitMove(pinToLimitX);
      window.domRef.mapPinMain.style.top = addLimitMove(pinToLimitY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    MainPinSize: {
      RADIUS: 32,
      HEIGHT: 80
    },

    getMainPinCoords: getMainPinCoords
  };
}());
