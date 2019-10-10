'use strict';
(function () {
  var map = document.querySelector('.map');
  var adFormFieldsetList = window.adForm.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var filterFormFieldsetList = filterForm.querySelectorAll('select');

  var onMainPinMouseDown = function () {
    showMapAndForm();
  };

  var onMainPinEnterPress = function (evt) {
    if (window.util.isEnterKey(evt)) {
      showMapAndForm();
    }
  };

  var addDisabledFildset = function (listElements, flag) {
    listElements.forEach(function (fildset) {
      fildset.disabled = flag;
    });
  };

  // Show map. filter and forms
  var showMapAndForm = function () {
    map.classList.remove('map--faded');
    window.adForm.classList.remove('ad-form--disabled');

    window.renderPins(window.offers);
    window.util.renderAddress(window.util.getMainPinCoords(window.UtilMainPinSize.HEIGHT));

    window.mapPinMain.removeEventListener('mousedown', onMainPinMouseDown);
    window.mapPinMain.removeEventListener('keydown', onMainPinEnterPress);
    addDisabledFildset(adFormFieldsetList, false);
    addDisabledFildset(filterFormFieldsetList, false);
  };

  window.mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
  window.mapPinMain.addEventListener('keydown', onMainPinEnterPress);

  addDisabledFildset(adFormFieldsetList, true);
  addDisabledFildset(filterFormFieldsetList, true);
}());
