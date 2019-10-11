'use strict';
(function () {
  window.pin = {
    MainPinSize: {
      RADIUS: 32,
      HEIGHT: 80
    },

    getMainPinCoords: function (height) {
      return {
        x: window.mapPinMain.offsetLeft + window.pin.MainPinSize.RADIUS,
        y: window.mapPinMain.offsetTop + height
      };
    }
  };

  window.mapPinMain.addEventListener('mousedown', function (evt) {
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
        cords: startCords.x,
        pinMax: window.data.MapRect.RIGHT + window.pin.MainPinSize.RADIUS,
        pinMin: window.data.MapRect.LEFT + window.pin.MainPinSize.RADIUS,
        offsetValue: window.mapPinMain.offsetLeft,
        shift: shift.x
      };

      var pinToLimitY = {
        cords: startCords.y,
        pinMax: window.data.MapRect.BOTTOM,
        pinMin: window.data.MapRect.TOP,
        offsetValue: window.mapPinMain.offsetTop,
        shift: shift.y
      };

      var addLimitMove = function (pinObj) {
        if (pinObj.cords < pinObj.pinMax && pinObj.cords > pinObj.pinMin) {
          var newCordPin = (pinObj.offsetValue - pinObj.shift) + 'px';
        }
        return newCordPin;
      };

      window.mapPinMain.style.left = addLimitMove(pinToLimitX);
      window.mapPinMain.style.top = addLimitMove(pinToLimitY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}());
