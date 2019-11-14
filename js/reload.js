'use strict';
(function () {
  var featureCheckboxs = window.domRef.mapFilters.querySelectorAll('.map__checkbox');
  var housingSelect = window.domRef.mapFilters.querySelector('#housing-type');
  var priceSelect = window.domRef.mapFilters.querySelector('#housing-price');
  var roomSelect = window.domRef.mapFilters.querySelector('#housing-rooms');
  var guestSelect = window.domRef.mapFilters.querySelector('#housing-guests');

  var updatePins = function (dataPins) {
    window.map.renderPins(window.page.cropPins(dataPins));
  };

  var reduce = Array.prototype.reduce;

  var reduceFeatures = function (checkedFeatures, feature) {
    if (feature.checked) {
      checkedFeatures.push(feature.value);
    }
    return checkedFeatures;
  };

  var getCheckedFeatures = function () {
    return reduce.call(featureCheckboxs, reduceFeatures, []);
  };

  var onFilterChange = window.util.debounce(function () {
    var dataPins = window.dataPins;
    window.map.deletePins();
    window.card.close();
    window.checkboxs = getCheckedFeatures();
    var filteredAdverts = dataPins.filter(window.filter.adverts);
    updatePins(filteredAdverts);
    window.checkboxs = null;
  });

  window.domRef.mapFilters.addEventListener('change', onFilterChange);

  window.reload = {
    housingSelect: housingSelect,
    priceSelect: priceSelect,
    roomSelect: roomSelect,
    guestSelect: guestSelect,
  };
})();
