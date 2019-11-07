'use strict';
(function () {
  var Price = {
    MIDDLE_MIN: 10000,
    MIDDLE_MAX: 50000,
    LOW: 10000,
    NIGH: 50000
  };

  var filtersData = function (listOption, getFilter) {
    return listOption.filter(getFilter);
  };

  // Housing
  var getType = function (option) {
    var housingValue = window.reload.housingSelect.value;
    return option.offer.type === housingValue;
  };

  // Price
  var getPrice = function (option) {
    var elementValue = window.reload.priceSelect.value;
    var condition = null;
    switch (elementValue) {
      case 'middle':
        condition = option.offer.price >= Price.MIDDLE_MIN &&
                    option.offer.price <= Price.MIDDLE_MAX;
        break;
      case 'low':
        condition = option.offer.price < Price.LOW;
        break;
      case 'high':
        condition = option.offer.price > Price.NIGH;
        break;
    }
    return condition;
  };

  // Rooms
  var getRoom = function (option) {
    var roomValue = Number(window.reload.roomSelect.value);
    return option.offer.rooms === roomValue;
  };

  // Guest
  var getGues = function (option) {
    var guesValue = Number(window.reload.guestSelect.value);
    return option.offer.rooms === guesValue;
  };

  // check active checkbox
  var checkFeature = function (advert, userFeatures) {
    var featureList = advert.offer.features;
    var status = null;
    userFeatures.forEach(function (userFeature) {
      var index = featureList.indexOf(userFeature);
      if (index === -1) {
        status = false;
      }
    });
    return status;
  };

  // features
  var filterFeatures = function (adverts, userFeatures) {
    var pinList = [];
    adverts.forEach(function (advert) {
      if (checkFeature(advert, userFeatures) !== false) {
        pinList.push(advert);
      }
    });
    return pinList;
  };

  window.filter = {
    filtersData: filtersData,
    getType: getType,
    getPrice: getPrice,
    getRoom: getRoom,
    getGues: getGues,
    features: filterFeatures
  };
})();
