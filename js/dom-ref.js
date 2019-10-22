'use strict';
(function () {
  window.domRef = {
    mapPinMain: document.querySelector('.map__pin--main'),
    adForm: document.querySelector('.ad-form'),
    mapBlock: document.querySelector('.map'),
    mapFilters: document.querySelector('.map__filters'),
    filterFormFieldsetList: document.querySelector('.map__filters').querySelectorAll('select'),
    adFormFieldsetList: document.querySelector('.ad-form').querySelectorAll('fieldset')
  };
}());
