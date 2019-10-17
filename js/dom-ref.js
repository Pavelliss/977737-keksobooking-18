'use strict';
(function () {
  window.domRef = {
    mapPinMain: document.querySelector('.map__pin--main'),
    adForm: document.querySelector('.ad-form'),
    mapBlock: document.querySelector('.map'),
    filterFormFieldsetList: document.querySelector('.map__filters').querySelectorAll('select')
  };

  window.domRefAdFormFieldsetList = window.domRef.adForm.querySelectorAll('fieldset');
}());
