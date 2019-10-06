'use strict';
(function () {
  var mapPinsBlock = document.querySelector('.map__pins');
  var pinTemplateCont = document.querySelector('#pin').content.querySelector('.map__pin');

  var PRICES = [100, 150, 200, 250, 300, 350, 400, 450];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [2, 3, 1];
  var GUESTS = [1, 2, 3];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['text1', 'text2', 'text3', 'text4', 'text5', 'text6', 'text7', 'text8'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var MapRect = {
    LEFT: 0,
    TOP: 130,
    RIGHT: 1200,
    BOTTOM: 630
  };

  var keyboardKey = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    ESCAPE_IE: 'Esc'
  };

  var MainPinSize = {
    RADIUS: 32,
    HEIGHT: 80
  };

  var ROOM_PRICES = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };
  var TIME_LIST = ['12:00', '13:00', '14:00'];
  var SET_ATTRIBUTE_DISABLED = {
    '1': [0, 1, 3],
    '2': [0, 3],
    '3': [3],
    '100': [0, 1, 2]
  };
  var SET_ATTRIBUTE_SELECTED = {
    '1': [2],
    '2': [2],
    '3': [2],
    '100': [3]
  };
  var REMOVE_ATTRIBUTE_DISABLED = {
    '1': [2],
    '2': [1, 2],
    '3': [0, 1, 2],
    '100': [3]
  };
  var REMOVE_ATTRIBUTE_SELECTED = {
    '1': [0, 1, 3],
    '2': [0, 1, 3],
    '3': [0, 1, 3],
    '100': [0, 1, 2]
  };

  // Creating random array element
  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Creating random array langth
  var getRandomLength = function (array) {
    return Math.round(0.5 + Math.random() * array.length);
  };

  // create a new list of random length from the old list
  var createListRandomLength = function (oldList) {
    var newList = [];
    for (var i = 0; i < getRandomLength(oldList); i++) {
      newList.push(oldList[i]);
    }
    return newList;
  };

  // random number
  var getRandomNumber = function (min, max) {
    var number = min + Math.random() * (max + 1 - min);
    return Math.floor(number);
  };

  var getOffer = function () {
    var locationX = getRandomNumber(MapRect.LEFT, MapRect.RIGHT);
    var locationY = getRandomNumber(MapRect.TOP, MapRect.BOTTOM);
    var offerTemplate = {
      'author': {
        'avatar': 'img/avatars/user0' + 1 + '.png'
      },
      'offer': {
        'title': 'заголовок предложения',
        'address': 'x: ' + locationX + '; y: ' + locationY,
        'price': getRandomElement(PRICES),
        'type': getRandomElement(TYPES),
        'rooms': getRandomElement(ROOMS),
        'guests': getRandomElement(GUESTS),
        'checkin': getRandomElement(CHECKINS),
        'checkout': getRandomElement(CHECKOUTS),
        'features': createListRandomLength(FEATURES),
        'description': getRandomElement(DESCRIPTIONS),
        'photos': createListRandomLength(PHOTOS)
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    return offerTemplate;
  };
  // Pin creating
  var fragmentPin = document.createDocumentFragment();
  var createPin = function (offer) {
    var pin = pinTemplateCont.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pinImage.alt = offer.offer.title;
    pinImage.src = offer.author.avatar;
    // pin.style.left = offer.location.x + 'px; ';
    // pin.style.top = offer.location.y + 'px; ';
    pin.style = 'left: ' + offer.location.x + 'px; ' +
                'top: ' + offer.location.y + 'px;';
    return fragmentPin.appendChild(pin);
  };

  var addOffers = function (count, offer) {
    for (var i = 0; i < count; i++) {
      createPin(offer());
    }
    return mapPinsBlock.appendChild(fragmentPin);
  };

  // MODULE 4

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var inputPrice = adForm.querySelector('#price');
  var selectTypeHose = adForm.querySelector('#type');
  var selectTimein = adForm.querySelector('#timein');
  var selectTimeout = adForm.querySelector('#timeout');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var optionsCapacitys = selectCapacity.querySelectorAll('option');
  var formFieldsetList = adForm.querySelectorAll('fieldset');

  // add attributes disabled for form elements
  var toglelDisabled = function (listElements, flag) {
    if (flag) {
      listElements.forEach(function (element) {
        element.removeAttribute('disabled');
      });
    } else {
      listElements.forEach(function (element) {
        element.setAttribute('disabled', 'disabled');
      });
    }
  };

  var isEnterKey = function (evt) {
    return evt.key === keyboardKey.ENTER;
  };

  var getMainPinCoords = function (height) {
    return {
      x: mapPinMain.offsetLeft + MainPinSize.RADIUS,
      y: mapPinMain.offsetTop + height
    };
  };

  var renderAddress = function (coords) {
    adFormAddress.value = coords.x + ', ' + coords.y;
  };

  // Show map. filter and forms
  var showMapAndForm = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    addOffers(8, getOffer);
    renderAddress(getMainPinCoords(MainPinSize.HEIGHT));

    mapPinMain.removeEventListener('mousedown', onShowMap);
    mapPinMain.removeEventListener('keydown', onShowMap);
    toglelDisabled(formFieldsetList, true);
  };

  var onShowMap = function (evt) {
    if (isEnterKey(evt)) {
      showMapAndForm();
    } else {
      showMapAndForm();
    }
  };

  // Change the minimum price depending on the type of housing
  var changeMinPrice = function (objRooms) {
    var roomTypsList = Object.keys(objRooms);

    roomTypsList.forEach(function (element) {
      if (selectTypeHose.value === element) {
        inputPrice.min = objRooms[element];
      }
    });
  };

  // synchronizes time between timein and timeout
  var changeTime = function (timeList, checkElement, changeElement) {
    timeList.forEach(function (element) {
      if (checkElement.value === element) {
        changeElement.value = element;
      }
    });
  };

  // add atribute for capacity list
  var addAttributes = function (objAttributes, attribute) {
    var keysList = Object.keys(objAttributes); // ['1', '2', '3', '100']

    keysList.forEach(function (keysListElement) {
      if (selectRoomNumber.value === keysListElement) { // '1'
        var elementIndexList = objAttributes[keysListElement]; // [0, 1, 3]

        elementIndexList.forEach(function (elementIndex) {
          optionsCapacitys[elementIndex].setAttribute(attribute, true);
        });
      }
    });
  };

  // remove atribute for capacity list
  var removeAttributes = function (objAttributes, attribute) {
    var keysList = Object.keys(objAttributes); // ['1', '2', '3', '100']

    keysList.forEach(function (keysListElement) {
      if (selectRoomNumber.value === keysListElement) { // '1'
        var elementList = objAttributes[keysListElement]; // [2]

        elementList.forEach(function (elementIndex) {
          optionsCapacitys[elementIndex].removeAttribute(attribute);
        });
      }
    });
  };

  formFieldsetList.forEach(function (fieldset) {
    fieldset.setAttribute('disabled', 'disabled');
  });

  mapPinMain.addEventListener('mousedown', onShowMap);
  mapPinMain.addEventListener('keydown', onShowMap);

  toglelDisabled(formFieldsetList);

  selectTypeHose.addEventListener('change', function () {
    changeMinPrice(ROOM_PRICES);
  });

  selectTimein.addEventListener('change', function () {
    changeTime(TIME_LIST, selectTimein, selectTimeout);
  });

  selectTimeout.addEventListener('change', function () {
    changeTime(TIME_LIST, selectTimeout, selectTimein);
  });

  renderAddress(getMainPinCoords(MainPinSize.RADIUS));

  addAttributes(SET_ATTRIBUTE_DISABLED, 'disabled');
  addAttributes(SET_ATTRIBUTE_SELECTED, 'selected');

  selectRoomNumber.addEventListener('change', function () {
    addAttributes(SET_ATTRIBUTE_DISABLED, 'disabled');
    addAttributes(SET_ATTRIBUTE_SELECTED, 'selected');
    removeAttributes(REMOVE_ATTRIBUTE_DISABLED, 'disabled');
    removeAttributes(REMOVE_ATTRIBUTE_SELECTED, 'selected');
  });
}());
