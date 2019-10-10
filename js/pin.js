'use strict';
(function () {
  window.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      window.util.renderAddress(window.util.getMainPinCoords(window.UtilMainPinSize.HEIGHT));

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

      window.mapPinMain.style.top = (window.mapPinMain.offsetTop - shift.y) + 'px';
      window.mapPinMain.style.left = (window.mapPinMain.offsetLeft - shift.x) + 'px';
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
