'use strict';
(function () {
  var housingSelect = window.domRef.mapFilters.querySelector('#housing-type');

  var onFilterChange = function (evt) {
    var optionValue = evt.target.value;
    var pinList = window.dataPins;
    window.util.deletePins();
    window.card.close();
    if (optionValue !== 'any') {
      pinList = window.getFilterTypes(window.dataPins, optionValue);
    }
    window.map.renderPins(window.page.cropPinList(pinList));
  };

  housingSelect.addEventListener('change', onFilterChange);
})();
