'use strict';
(function () {
  var LIST_TIMES = ['12:00', '13:00', '14:00'];

  var offerTypeToMinPrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var roomCountToAddDisabled = {
    '1': [0, 1, 3],
    '2': [0, 3],
    '3': [3],
    '100': [0, 1, 2]
  };

  var roomCountToAddSelected = {
    '1': [2],
    '2': [2],
    '3': [2],
    '100': [3]
  };

  var roomCountToRemoveDisabled = {
    '1': [2],
    '2': [1, 2],
    '3': [0, 1, 2],
    '100': [3]
  };
  var roomCountToRemoveSelected = {
    '1': [0, 1, 3],
    '2': [0, 1, 3],
    '3': [0, 1, 3],
    '100': [0, 1, 2]
  };

  var inputPrice = window.adForm.querySelector('#price');
  var selectTypeHose = window.adForm.querySelector('#type');
  var selectTimein = window.adForm.querySelector('#timein');
  var selectTimeout = window.adForm.querySelector('#timeout');
  var selectRoomNumber = window.adForm.querySelector('#room_number');
  var selectCapacity = window.adForm.querySelector('#capacity');
  var optionsCapacitys = selectCapacity.querySelectorAll('option');

  // Show map. filter and forms
  var setOffersPrice = function (price) {
    inputPrice.min = price;
    inputPrice.placeholder = price;
  };

  // synchronizes time between timein and timeout
  var synchronizeArrivalTime = function (timeList, checkElement, changeElement) {
    timeList.forEach(function (element) {
      if (checkElement.value === element) {
        changeElement.value = element;
      }
    });
  };

  // add atribute for capacity list
  var addAttributesCapacity = function (objAttributes, attribute) {
    var keysList = Object.keys(objAttributes); // ['1', '2', '3', '100']

    keysList.forEach(function (keysListElement) {
      if (selectRoomNumber.value === keysListElement) { // '1'
        var elementIndexList = objAttributes[keysListElement]; // [0, 1, 3]

        elementIndexList.forEach(function (elementIndex) {
          optionsCapacitys[elementIndex][attribute] = true;
        });
      }
    });
  };

  // remove atribute for capacity list
  var removeAttributesCapacity = function (objAttributes, attribute) {
    var keysList = Object.keys(objAttributes); // ['1', '2', '3', '100']

    keysList.forEach(function (keysListElement) {
      if (selectRoomNumber.value === keysListElement) { // '1'
        var elementList = objAttributes[keysListElement]; // [2]

        elementList.forEach(function (elementIndex) {
          optionsCapacitys[elementIndex][attribute] = false;
        });
      }
    });
  };

  selectTypeHose.addEventListener('change', function (evt) {
    var minPrice = offerTypeToMinPrice[evt.target.value];
    setOffersPrice(minPrice);
  });

  selectTimein.addEventListener('change', function () {
    synchronizeArrivalTime(LIST_TIMES, selectTimein, selectTimeout);
  });

  selectTimeout.addEventListener('change', function () {
    synchronizeArrivalTime(LIST_TIMES, selectTimeout, selectTimein);
  });

  window.util.renderAddress(window.util.getMainPinCoords(window.UtilMainPinSize.RADIUS));

  addAttributesCapacity(roomCountToAddDisabled, 'disabled');
  addAttributesCapacity(roomCountToAddSelected, 'selected');

  selectRoomNumber.addEventListener('change', function () {
    addAttributesCapacity(roomCountToAddDisabled, 'disabled');
    addAttributesCapacity(roomCountToAddSelected, 'selected');
    removeAttributesCapacity(roomCountToRemoveDisabled, 'disabled');
    removeAttributesCapacity(roomCountToRemoveSelected, 'selected');
  });
}());
