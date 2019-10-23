'use strict';
(function () {
  var housingSelect = window.domRef.mapFilters.querySelector('#housing-type');

  // i === 0 - class: '.map__pin--main'
  var deletePins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (pin) {
      pin.remove();
    });
  };

  var onFilterChange = function (evt) {
    var optionValue = evt.target.value;
    var pinList = window.dataPins;
    deletePins();
    if (optionValue !== 'any') {
      pinList = window.getFilterTypes(window.dataPins, optionValue);
    }
    window.map.renderPins(window.page.cropPinList(pinList));
  };

  housingSelect.addEventListener('change', onFilterChange);
})();
