'use strict';
(function () {
  var ADVERT_NUM = 5;

  var onMainPinMouseDown = function () {
    activatePage();
  };

  var onMainPinEnterPress = function (evt) {
    if (window.util.isEnterKey(evt)) {
      activatePage();
    }
  };

  var cropPins = function (list) {
    var shorts = list.slice(0, ADVERT_NUM);
    return shorts;
  };

  // data = adverts
  var onDataLoad = function (adverts) {
    if (adverts.length > 0) {
      window.dataPins = adverts;
      window.map.renderPins(cropPins(adverts));
      window.util.addDisabledFildset(window.domRef.filterFormFieldsets, false);
    }
  };

  var onDataLoadError = function (message) {
    window.popup.showError(message);
  };

  var activatePage = function () {
    window.domRef.mapBlock.classList.remove('map--faded');
    window.domRef.adForm.classList.remove('ad-form--disabled');

    window.load.makeRequest(window.load.urlGet, null, onDataLoad, onDataLoadError);
    window.form.renderAddress(window.mainPin.getCoords(window.mainPin.Size.HEIGHT));

    window.domRef.mapPinMain.removeEventListener('mousedown', onMainPinMouseDown);
    window.domRef.mapPinMain.removeEventListener('keydown', onMainPinEnterPress);
    window.util.addDisabledFildset(window.domRef.adFormFieldsets, false);
  };

  var deactivatePage = function () {
    window.domRef.adForm.classList.add('ad-form--disabled');
    window.domRef.mapBlock.classList.add('map--faded');

    window.domRef.mapPinMain.addEventListener('mousedown', window.page.onMainPinMouseDown);
    window.domRef.mapPinMain.addEventListener('keydown', window.page.onMainPinEnterPress);

    window.util.addDisabledFildset(window.domRef.adFormFieldsets, true);
    window.util.addDisabledFildset(window.domRef.filterFormFieldsets, true);
  };

  var onDomLoad = function () {
    deactivatePage();
  };

  var rollbackPage = function () {
    deactivatePage();
    window.map.deletePins();
    window.mainPin.resetCoords();
    window.card.close();
    window.domRef.mapFilters.reset();
  };

  document.addEventListener('DOMContentLoaded', onDomLoad);

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage,
    onMainPinMouseDown: onMainPinMouseDown,
    onMainPinEnterPress: onMainPinEnterPress,
    cropPins: cropPins,
    rollbackPage: rollbackPage,
  };
}());
