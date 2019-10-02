'use strict';
(function () {
  // Test date
  var mapBlock = document.querySelector('.map');
  var mapPinsBlock = document.querySelector('.map__pins');
  var pinTemplateCont = document.querySelector('#pin').content;

  var MAP_WIDTH = mapPinsBlock.offsetWidth;
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


  mapBlock.classList.remove('map--faded');

  // Creating random array element
  var getRandomElement = function (array) {
    var indexElement = Math.floor(Math.random() * array.length);
    return array[indexElement];
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

  var getOffers = function (count) {
    var offersList = [];
    for (var i = 0; i < count; i++) {
      var locationX = getRandomNumber(0, MAP_WIDTH);
      var locationY = getRandomNumber(130, 630);
      var offer = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
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
      offersList.push(offer);
    }
    return offersList;
  };
    // Pin creating
  var fragmentPin = document.createDocumentFragment();
  var createPin = function (array, index) {
    var pinElement = pinTemplateCont.cloneNode(true);

    pinElement.querySelector('img').src = array[index].author.avatar;
    pinElement.querySelector('img').alt = array[index].offer.title;
    pinElement.querySelector('.map__pin').style =
     'left: ' + array[index].location.x + 'px; ' + 'top: ' + array[index].location.y + 'px;';

    return pinElement;
  };

  // adding content to the markup
  var addOffers = function (array) {
    for (var i = 0; i < array.length; i++) {
      fragmentPin.appendChild(createPin(array, i));
    }
    return mapPinsBlock.appendChild(fragmentPin);
  };

  addOffers(getOffers(8));
  var KEYCODE_ENTER = 13;
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var END_PIN_HEIGHT = 22;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var inputPrice = adForm.querySelector('#price');
  var selectTypeHose = adForm.querySelector('#type');
  var selectTimein = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var optionsCapacitys = selectCapacity.querySelectorAll('option');

  // convert value from: 'left: 550px' to: '550'
  var convertAddressData = function (adress) {
    return Number(adress.substr(0, adress.length - 2));
  };

  // Get string address. Parameters 'amendmentX, amendmentY' increase or decrease values X and Y
  var getAddressValue = function (amendmentX, amendmentY) {
    var newAddress;
    if (!amendmentX || !amendmentY) {
      newAddress = 'x: ' + Math.round(convertAddressData(mapPinMain.style.left)) + ', y: ' + Math.round(convertAddressData(mapPinMain.style.top));
    } else {
      newAddress = 'x: ' + Math.round((convertAddressData(mapPinMain.style.left) + amendmentX)) + ', y: ' + Math.round((convertAddressData(mapPinMain.style.top) + amendmentY));
    }
    return newAddress;
  };

  // Show map. filter and forms
  var showMapAndForm = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    adFormAddress.value = getAddressValue(PIN_WIDTH / 2, PIN_HEIGHT + END_PIN_HEIGHT);
  };

  mapPinMain.addEventListener('mousedown', function () {
    showMapAndForm();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      showMapAndForm();
    }
  });

  // Add value adress
  adFormAddress.value = getAddressValue(PIN_WIDTH / 2, PIN_HEIGHT / 2);

  // input price
  selectTypeHose.addEventListener('change', function () {
    if (selectTypeHose.value === 'flat') {
      inputPrice.min = '1000';
    } else if (selectTypeHose.value === 'house') {
      inputPrice.min = '5000';
    } else if (selectTypeHose.value === 'palace') {
      inputPrice.min = '10000';
    } else {
      inputPrice.min = 0;
    }
  });

  selectTimein.addEventListener('change', function () {
    if (selectTimein.value === '12:00') {
      selectTimeOut.value = '12:00';
    } else if (selectTimein.value === '13:00') {
      selectTimeOut.value = '13:00';
    } else if (selectTimein.value === '14:00') {
      selectTimeOut.value = '14:00';
    }
  });

  selectTimeOut.addEventListener('change', function () {
    if (selectTimeOut.value === '12:00') {
      selectTimein.value = '12:00';
    } else if (selectTimeOut.value === '13:00') {
      selectTimein.value = '13:00';
    } else if (selectTimeOut.value === '14:00') {
      selectTimein.value = '14:00';
    }
  });

  optionsCapacitys[0].removeAttribute('selected');
  optionsCapacitys[2].removeAttribute('selected');
  optionsCapacitys[3].removeAttribute('selected');

  optionsCapacitys[2].setAttribute('selected', 'selected');


  selectRoomNumber.addEventListener('change', function () {
    if (selectRoomNumber.value === '1') {
      optionsCapacitys[0].setAttribute('disabled', 'disabled');
      optionsCapacitys[1].setAttribute('disabled', 'disabled');
      optionsCapacitys[3].setAttribute('disabled', 'disabled');

      optionsCapacitys[0].removeAttribute('selected');
      optionsCapacitys[3].removeAttribute('selected');

      optionsCapacitys[2].setAttribute('selected', 'selected');
    } else if (selectRoomNumber.value === '2') {
      optionsCapacitys[0].setAttribute('disabled', 'disabled');
      optionsCapacitys[3].setAttribute('disabled', 'disabled');

      optionsCapacitys[1].removeAttribute('disabled');
      optionsCapacitys[2].removeAttribute('disabled');
    } else if (selectRoomNumber.value === '3') {
      optionsCapacitys[3].setAttribute('disabled', 'disabled');

      optionsCapacitys[1].removeAttribute('disabled');
      optionsCapacitys[2].removeAttribute('disabled');
      optionsCapacitys[0].removeAttribute('disabled');
    } else if (selectRoomNumber.value === '100') {
      optionsCapacitys[0].setAttribute('disabled', 'disabled');
      optionsCapacitys[1].setAttribute('disabled', 'disabled');
      optionsCapacitys[2].setAttribute('disabled', 'disabled');

      optionsCapacitys[3].removeAttribute('disabled');

      optionsCapacitys[0].removeAttribute('selected');
      optionsCapacitys[1].removeAttribute('selected');
      optionsCapacitys[2].removeAttribute('selected');
      optionsCapacitys[3].setAttribute('selected', 'selected');
    }
  });
})();
