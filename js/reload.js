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

  var getCheckboxList = function () {
    var userFeatures = [];
    featureCheckboxs.forEach(function (feature) {
      if (feature.checked) {
        userFeatures.push(feature.value);
      }
    });
    return userFeatures;
  };

  var onFilterChange = window.util.debounce(function () {
    var dataPins = window.dataPins;
    window.map.deletePins();
    window.card.close();
    window.checkboxs = getCheckboxList();
    var getfilteredAdverts = dataPins.filter(window.filter.adverts);
    updatePins(getfilteredAdverts);
  });

  window.domRef.mapFilters.addEventListener('change', onFilterChange);

  window.reload = {
    housingSelect: housingSelect,
    priceSelect: priceSelect,
    roomSelect: roomSelect,
    guestSelect: guestSelect,
    getCheckboxList: getCheckboxList,
  };
})();
