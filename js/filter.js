'use strict';
(function () {
  var Price = {
    LOW: 10000,
    HIGH: 50000
  };

  var priceToFilter = {
    low: function (price) {
      return price <= Price.LOW;
    },
    middle: function (price) {
      return price >= Price.LOW &&
             price <= Price.HIGH;
    },
    high: function (price) {
      return price >= Price.HIGH;
    }
  };

  var checkData = function (listOption, getFilter) {
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
    return priceToFilter[elementValue](option.offer.price);
  };

  // Rooms
  var getRoom = function (option) {
    var roomValue = +window.reload.roomSelect.value;
    return option.offer.rooms === roomValue;
  };

  // Guest
  var getGues = function (option) {
    var guesValue = +window.reload.guestSelect.value;
    return option.offer.rooms === guesValue;
  };

  var checkFeature = function (advert, userFeatures) {
    var featureList = advert.offer.features;
    var status = userFeatures.every(function (userFeature) {
      return featureList.indexOf(userFeature) !== -1;
    });
    return status;
  };

  // features
  var filterFeatures = function (adverts, userFeatures) {
    var pinList = [];
    adverts.forEach(function (advert) {
      if (checkFeature(advert, userFeatures)) {
        pinList.push(advert);
      }
    });
    return pinList;
  };

  window.filter = {
    checkData: checkData,
    getType: getType,
    getPrice: getPrice,
    getRoom: getRoom,
    getGues: getGues,
    features: filterFeatures
  };
})();
