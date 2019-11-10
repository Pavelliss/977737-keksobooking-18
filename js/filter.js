'use strict';
(function () {
  var HousePrice = {
    LOW: 10000,
    HIGH: 50000
  };

  var priceToFilter = {
    low: function (price) {
      return price <= HousePrice.LOW;
    },
    middle: function (price) {
      return price >= HousePrice.LOW &&
             price <= HousePrice.HIGH;
    },
    high: function (price) {
      return price >= HousePrice.HIGH;
    }
  };

  var checkType = function (advert) {
    return window.reload.housingSelect.value === 'any'
    || window.reload.housingSelect.value === advert.offer.type;
  };

  var checkPrice = function (advert) {
    var priceValue = window.reload.priceSelect.value;
    return window.reload.priceSelect.value === 'any'
    || priceToFilter[priceValue](advert.offer.price);
  };

  var checkRoom = function (advert) {
    return window.reload.roomSelect.value === 'any'
    || +window.reload.roomSelect.value === advert.offer.rooms;
  };

  var checkGuest = function (advert) {
    return window.reload.guestSelect.value === 'any'
    || +window.reload.guestSelect.value === advert.offer.guests;
  };

  var checkCheckbox = function (advert) {
    var checkboxs = window.reload.getCheckboxList();
    return checkboxs.every(function (userFeature) {
      return advert.offer.features.indexOf(userFeature) !== -1;
    });
  };

  var filterAdverts = function (advert) {
    return checkType(advert)
        && checkPrice(advert)
        && checkRoom(advert)
        && checkGuest(advert)
        && checkCheckbox(advert);
  };

  window.filter = {
    adverts: filterAdverts,
  };
})();
