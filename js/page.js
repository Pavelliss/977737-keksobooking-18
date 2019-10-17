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
    window.card.renderPins(adverts);
  };

  var activatePage = function () {
    window.domRef.mapBlock.classList.remove('map--faded');
    window.domRef.adForm.classList.remove('ad-form--disabled');

    window.load(onDataLoad);
    window.form.renderAddress(window.pin.getMainPinCoords(window.pin.MainPinSize.HEIGHT));

    window.domRef.mapPinMain.removeEventListener('mousedown', onMainPinMouseDown);
    window.domRef.mapPinMain.removeEventListener('keydown', onMainPinEnterPress);
    window.util.addDisabledFildset(window.domRefAdFormFieldsetList, false);
  };

  var deactivatePage = function () {
    window.domRef.adForm.classList.add('ad-form--disabled');
    window.domRef.mapBlock.classList.add('map--faded');

    window.domRef.mapPinMain.addEventListener('mousedown', window.page.onMainPinMouseDown);
    window.domRef.mapPinMain.addEventListener('keydown', window.page.onMainPinEnterPress);

    window.util.addDisabledFildset(window.domRefAdFormFieldsetList, true);
    window.util.addDisabledFildset(window.domRef.filterFormFieldsetList, true);
  };

  window.page = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
    onMainPinMouseDown: onMainPinMouseDown,
    onMainPinEnterPress: onMainPinEnterPress
  };
}());
