'use strict';
(function () {
  var housingSelect = window.domRef.mapFilters.querySelector('#housing-type');

  // i === 0 - class: '.map__pin--main'
  var deletePins = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    mapPins.forEach(function (pin, i) {
      if (i === 0) {
        return;
      }
      pin.remove();
    });
  };

  var onFilterPins = function (evt) {
    var optionValue = evt.target.value;
    var filterPin = window.getFilterTypes(window.dataPins, optionValue);

    if (optionValue === 'any') {
      deletePins();
      window.map.renderPins(window.dataPins);
    } else {
      deletePins();
    }
    window.map.renderPins(filterPin);
  };

  housingSelect.addEventListener('change', onFilterPins);
})();
