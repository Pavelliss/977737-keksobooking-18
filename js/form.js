'use strict';
(function () {
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

  var adForm = window.domRef.adForm;
  var inputPrice = adForm.querySelector('#price');
  var adFormAddress = adForm.querySelector('#address');
  var selectTypeHose = adForm.querySelector('#type');
  var selectTimein = adForm.querySelector('#timein');
  var selectTimeout = adForm.querySelector('#timeout');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var optionsCapacitys = selectCapacity.querySelectorAll('option');
  var timeField = adForm.querySelector('.ad-form__element--time');
  var buttonReset = adForm.querySelector('.ad-form__reset');

  var renderAddress = function (coords) {
    adFormAddress.value = coords.x + ', ' + coords.y;
  };

  // Show map. filter and forms
  var setOffersPrice = function (price) {
    inputPrice.min = price;
    inputPrice.placeholder = price;
  };

  // synchronizes time between timein and timeout
  var syncTime = function (time) {
    selectTimein.value = time;
    selectTimeout.value = time;
  };

  var onTimeChange = function (evt) {
    syncTime(evt.target.value);
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

  var onDataUploadSuccess = function (form) {
    window.message.showSuccess();
    resetForm(form);
  };

  var resetForm = function (form) {
    window.page.deactivate();
    form.reset();
    window.util.deletePins();
    window.mainPin.resetCord();
    renderAddress(window.mainPin.getCoords(window.mainPin.Size.RADIUS));
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(adForm), onDataUploadSuccess(adForm));
  });

  buttonReset.addEventListener('click', function () {
    resetForm(adForm);
  });

  selectTypeHose.addEventListener('change', function (evt) {
    var minPrice = offerTypeToMinPrice[evt.target.value];
    setOffersPrice(minPrice);
  });

  timeField.addEventListener('change', onTimeChange);

  renderAddress(window.mainPin.getCoords(window.mainPin.Size.RADIUS));

  addAttributesCapacity(roomCountToAddDisabled, 'disabled');
  addAttributesCapacity(roomCountToAddSelected, 'selected');

  selectRoomNumber.addEventListener('change', function () {
    addAttributesCapacity(roomCountToAddDisabled, 'disabled');
    addAttributesCapacity(roomCountToAddSelected, 'selected');
    removeAttributesCapacity(roomCountToRemoveDisabled, 'disabled');
    removeAttributesCapacity(roomCountToRemoveSelected, 'selected');
  });

  window.form = {
    renderAddress: renderAddress
  };
}());
