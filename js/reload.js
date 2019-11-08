'use strict';
(function () {
  var listSelects = window.domRef.mapFilters.querySelectorAll('.map__filter');
  var featureCheckboxs = window.domRef.mapFilters.querySelectorAll('.map__checkbox');
  var housingSelect = window.domRef.mapFilters.querySelector('#housing-type');
  var priceSelect = window.domRef.mapFilters.querySelector('#housing-price');
  var roomSelect = window.domRef.mapFilters.querySelector('#housing-rooms');
  var guestSelect = window.domRef.mapFilters.querySelector('#housing-guests');

  var updatePins = function (dataPins) {
    window.map.renderPins(window.page.cropPinList(dataPins));
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

  var checkOption = function (dataList, option, fn) {
    if (option.value !== 'any') {
      dataList = window.filter.checkData(dataList, fn);
    }
    return dataList;
  };

  var onFilterChange = window.util.debounce(function () {
    var pinList = window.dataPins;
    window.map.deletePins();
    window.card.close();
    pinList = checkOption(pinList, housingSelect, window.filter.getType);
    pinList = checkOption(pinList, priceSelect, window.filter.getPrice);
    pinList = checkOption(pinList, roomSelect, window.filter.getRoom);
    pinList = checkOption(pinList, guestSelect, window.filter.getGues);
    pinList = window.filter.features(pinList, getCheckboxList());

    updatePins(pinList);
  });

  listSelects.forEach(function (select) {
    select.addEventListener('change', onFilterChange);
  });

  featureCheckboxs.forEach(function (checkbox) {
    checkbox.addEventListener('change', onFilterChange);
  });

  window.reload = {
    housingSelect: housingSelect,
    priceSelect: priceSelect,
    roomSelect: roomSelect,
    guestSelect: guestSelect,
  };
})();
