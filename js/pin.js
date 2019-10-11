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

      if (startCords.x < window.data.MapRect.RIGHT + window.pin.MainPinSize.RADIUS
        && startCords.x > window.data.MapRect.LEFT + window.pin.MainPinSize.RADIUS) {
        window.mapPinMain.style.left = (window.mapPinMain.offsetLeft - shift.x) + 'px';
      }

      if (startCords.y < window.data.MapRect.BOTTOM
        && startCords.y > window.data.MapRect.TOP) {
        window.mapPinMain.style.top = (window.mapPinMain.offsetTop - shift.y) + 'px';
      }
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
