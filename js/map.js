'use strict';
(function () {
  var map = document.querySelector('.map');
  var adFormFieldsetList = window.domRef.adForm.querySelectorAll('fieldset');
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
    window.domRef.adForm.classList.remove('ad-form--disabled');

    window.renderPins(window.offers);
    window.form.renderAddress(window.pin.getMainPinCoords(window.pin.MainPinSize.HEIGHT));

    window.domRef.mapPinMain.removeEventListener('mousedown', onMainPinMouseDown);
    window.domRef.mapPinMain.removeEventListener('keydown', onMainPinEnterPress);
    addDisabledFildset(adFormFieldsetList, false);
    addDisabledFildset(filterFormFieldsetList, false);
  };

  window.domRef.mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
  window.domRef.mapPinMain.addEventListener('keydown', onMainPinEnterPress);

  addDisabledFildset(adFormFieldsetList, true);
  addDisabledFildset(filterFormFieldsetList, true);
}());
