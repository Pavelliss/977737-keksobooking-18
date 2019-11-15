'use strict';
(function () {
  window.domRef = {
    mapPinMain: document.querySelector('.map__pin--main'),
    adForm: document.querySelector('.ad-form'),
    mapBlock: document.querySelector('.map'),
    mapFilters: document.querySelector('.map__filters'),
    filterFormFieldsets: document.querySelector('.map__filters').querySelectorAll('select'),
    adFormFieldsets: document.querySelector('.ad-form').querySelectorAll('fieldset')
  };
}());
