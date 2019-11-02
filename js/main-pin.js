'use strict';
(function () {
  var MapRect = {
    LEFT: 0,
    TOP: 130,
    RIGHT: 1200,
    BOTTOM: 630,
  };

  var MainPinSize = {
    RADIUS: 32,
    HEIGHT: 80,
  };

  var MainPinRect = {
    LEFT: MapRect.LEFT - MainPinSize.RADIUS,
    RIGHT: MapRect.RIGHT - MainPinSize.RADIUS,
    TOP: MapRect.TOP - MainPinSize.HEIGHT,
    BOTTOM: MapRect.BOTTOM - MainPinSize.HEIGHT,
  };

  var DefaultCards = {
    X: 570,
    Y: 375
  };

  var mainPin = window.domRef.mapPinMain;

  var getMainPinCoords = function (height) {
    return {
      x: mainPin.offsetLeft + MainPinSize.RADIUS,
      y: mainPin.offsetTop + height,
    };
  };

  var getMainPinOffset = function (x, y) {
    return {
      x: Math.min(Math.max(x, MainPinRect.LEFT), MainPinRect.RIGHT),
      y: Math.min(Math.max(y, MainPinRect.TOP), MainPinRect.BOTTOM),
    };
  };

  var renderMainPinPos = function (coords) {
    mainPin.style.left = coords.x + 'px';
    mainPin.style.top = coords.y + 'px';
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var x = startCoords.x + moveEvt.clientX - evt.clientX;
      var y = startCoords.y + moveEvt.clientY - evt.clientY;

      renderMainPinPos(getMainPinOffset(x, y));
      window.form.renderAddress(getMainPinCoords(MainPinSize.HEIGHT));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, {once: true});
  });

  var resetCord = function () {
    mainPin.style.left = DefaultCards.X + 'px';
    mainPin.style.top = DefaultCards.Y + 'px';
  };

  window.mainPin = {
    Size: MainPinSize,
    getCoords: getMainPinCoords,
    resetCord: resetCord,
  };
}());
