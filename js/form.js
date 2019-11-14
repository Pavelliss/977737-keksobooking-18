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
  var priceInput = adForm.querySelector('#price');
  var addressInput = adForm.querySelector('#address');
  var typeHoseSelect = adForm.querySelector('#type');
  var timeinSelect = adForm.querySelector('#timein');
  var timeoutSelect = adForm.querySelector('#timeout');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var capacitysOptions = capacitySelect.querySelectorAll('option');
  var timeField = adForm.querySelector('.ad-form__element--time');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var renderAddress = function (coords) {
    addressInput.value = coords.x + ', ' + coords.y;
  };

  // Show map. filter and forms
  var setOffersPrice = function (price) {
    priceInput.min = price;
    priceInput.placeholder = price;
  };

  // synchronizes time between timein and timeout
  var syncTime = function (time) {
    timeinSelect.value = time;
    timeoutSelect.value = time;
  };

  var onTimeChange = function (evt) {
    syncTime(evt.target.value);
  };

  // add atribute for capacity list
  var addAttributesCapacity = function (objAttributes, attribute) {
    var keys = Object.keys(objAttributes); // ['1', '2', '3', '100']

    keys.forEach(function (keysElement) {
      if (roomNumberSelect.value === keysElement) { // '1'
        var elementIndexes = objAttributes[keysElement]; // [0, 1, 3]

        elementIndexes.forEach(function (elementIndex) {
          capacitysOptions[elementIndex][attribute] = true;
        });
      }
    });
  };

  // remove atribute for capacity elementIndexes
  var removeAttributesCapacity = function (objAttributes, attribute) {
    var keys = Object.keys(objAttributes); // ['1', '2', '3', '100']

    keys.forEach(function (keysElement) {
      if (roomNumberSelect.value === keysElement) { // '1'
        var elements = objAttributes[keysElement]; // [2]

        elements.forEach(function (elementIndex) {
          capacitysOptions[elementIndex][attribute] = false;
        });
      }
    });
  };

  var onDataUploadSuccess = function () {
    window.popup.showSuccess();
    resetForm();
  };

  var resetForm = function () {
    window.page.rollbackPage();
    adForm.reset();
    renderAddress(window.mainPin.getCoords(window.mainPin.Size.RADIUS));
    window.avatarPhotos.resetFileInput();
  };

  var onDataUploadError = function (message) {
    window.popup.showError(message);
  };

  adForm.addEventListener('submit', function (evt) {
    var data = new FormData(adForm);
    evt.preventDefault();
    window.load.makeRequest(
        window.load.urlPost,
        data,
        onDataUploadSuccess,
        onDataUploadError);
  });

  resetButton.addEventListener('click', function () {
    resetForm();
  });

  setOffersPrice(offerTypeToMinPrice[typeHoseSelect.value]);

  typeHoseSelect.addEventListener('change', function (evt) {
    var minPrice = offerTypeToMinPrice[evt.target.value];
    setOffersPrice(minPrice);
  });

  timeField.addEventListener('change', onTimeChange);

  renderAddress(window.mainPin.getCoords(window.mainPin.Size.RADIUS));

  addAttributesCapacity(roomCountToAddDisabled, 'disabled');
  addAttributesCapacity(roomCountToAddSelected, 'selected');

  roomNumberSelect.addEventListener('change', function () {
    addAttributesCapacity(roomCountToAddDisabled, 'disabled');
    addAttributesCapacity(roomCountToAddSelected, 'selected');
    removeAttributesCapacity(roomCountToRemoveDisabled, 'disabled');
    removeAttributesCapacity(roomCountToRemoveSelected, 'selected');
  });

  window.form = {
    renderAddress: renderAddress
  };
}());
