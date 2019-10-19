'use strict';
(function () {
  var onMainPinMouseDown = function () {
    activatePage();
  };

  var onMainPinEnterPress = function (evt) {
    if (window.util.isEnterKey(evt)) {
      activatePage();
    }
  };

  // data = adverts
  var onDataLoad = function (adverts) {
    if (adverts.length > 0) {
      window.map.renderPins(adverts);
      window.util.addDisabledFildset(window.domRef.filterFormFieldsetList, false);
    }
  };

  var onDataLoadError = function (message) {
    window.errorHandler(message);
  };

  var activatePage = function () {
    window.domRef.mapBlock.classList.remove('map--faded');
    window.domRef.adForm.classList.remove('ad-form--disabled');

    window.load(onDataLoad, onDataLoadError);
    window.form.renderAddress(window.mainPin.getCoords(window.mainPin.Size.HEIGHT));

    window.domRef.mapPinMain.removeEventListener('mousedown', onMainPinMouseDown);
    window.domRef.mapPinMain.removeEventListener('keydown', onMainPinEnterPress);
    window.util.addDisabledFildset(window.domRef.adFormFieldsetList, false);
  };

  var deactivatePage = function () {
    window.domRef.adForm.classList.add('ad-form--disabled');
    window.domRef.mapBlock.classList.add('map--faded');

    window.domRef.mapPinMain.addEventListener('mousedown', window.page.onMainPinMouseDown);
    window.domRef.mapPinMain.addEventListener('keydown', window.page.onMainPinEnterPress);

    window.util.addDisabledFildset(window.domRef.adFormFieldsetList, true);
    window.util.addDisabledFildset(window.domRef.filterFormFieldsetList, true);
  };

  var onDomLoad = function () {
    deactivatePage();
  };

  document.addEventListener('DOMContentLoaded', onDomLoad);

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage,
    onMainPinMouseDown: onMainPinMouseDown,
    onMainPinEnterPress: onMainPinEnterPress,
  };
}());
