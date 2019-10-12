'use strict';
(function () {
  var MainPinPointer = {
    MAX_CORD: 1168,
    MIN_CORD: -32
  };

  var MapRect = {
    LEFT: 0,
    TOP: 130,
    RIGHT: 1200,
    BOTTOM: 630
  };

  var getMainPinCoords = function (height) {
    return {
      x: window.domRef.mapPinMain.offsetLeft + window.pin.MainPinSize.RADIUS,
      y: window.domRef.mapPinMain.offsetTop + height
    };
  };

  var renderMainPin = function (direction, cord) {
    var cordPinValue = window.domRef.mapPinMain.style[direction] = cord;
    return cordPinValue;
  };

  var addLimitMove = function (properties, shiftPin) {
    var offsetPin = properties.offsetValue - shiftPin;
    if (offsetPin <= properties.pinMax
     && offsetPin >= properties.pinMin) {
      return offsetPin + 'px';
    }
    return undefined;
  };

  window.domRef.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var shift = {
      x: startCords.x,
      y: startCords.y
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      window.form.renderAddress(window.pin.getMainPinCoords(window.pin.MainPinSize.HEIGHT));

      // calculate the difference
      shift = {
        x: startCords.x - moveEvt.clientX,
        y: startCords.y - moveEvt.clientY
      };

      // update coords
      startCords.x = moveEvt.clientX;
      startCords.y = moveEvt.clientY;

      var pinToLimitX = {
        pinMax: MainPinPointer.MAX_CORD,
        pinMin: MainPinPointer.MIN_CORD,
        offsetValue: window.domRef.mapPinMain.offsetLeft,
      };

      var pinToLimitY = {
        pinMax: MapRect.BOTTOM,
        pinMin: MapRect.TOP,
        offsetValue: window.domRef.mapPinMain.offsetTop,
      };

      renderMainPin('left', addLimitMove(pinToLimitX, shift.x));
      renderMainPin('top', addLimitMove(pinToLimitY, shift.y));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, {once: true});
  });

  window.pin = {
    MainPinSize: {
      RADIUS: 32,
      HEIGHT: 80
    },
    getMainPinCoords: getMainPinCoords
  };
}());
