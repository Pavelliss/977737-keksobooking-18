'use strict';
(function () {
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
  var LIST_TIMES = ['12:00', '13:00', '14:00'];

  var MapRect = {
    LEFT: 0,
    TOP: 130,
    RIGHT: 1200,
    BOTTOM: 630
  };

  var KeyboardKey = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    ESCAPE_IE: 'Esc'
  };

  var MainPinSize = {
    RADIUS: 32,
    HEIGHT: 80
  };

  var PinSize = {
    RADIUS: 25,
    HEIGHT: 70
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

  var offerTypeToMinPrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var mapPinsBlock = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

  var getAdvert = function (photoId) {
    var locationX = getRandomNumber(MapRect.LEFT, MapRect.RIGHT);
    var locationY = getRandomNumber(MapRect.TOP, MapRect.BOTTOM);
    return {
      'author': {
        'avatar': 'img/avatars/user0' + (photoId + 1) + '.png'
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
  };

  // Pin creating
  var renderPin = function (offer) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pinImage.alt = offer.offer.title;
    pinImage.src = offer.author.avatar;
    pin.style.left = (offer.location.x - PinSize.RADIUS) + 'px';
    pin.style.top = (offer.location.y - PinSize.HEIGHT) + 'px';

    return pin;
  };

  var getOffers = function (num) {
    return new Array(num).fill(null).map(function (_, idx) {
      return getAdvert(idx);
    });
  };

  var renderPins = function (offers) {
    var fragment = document.createDocumentFragment();
    offers.forEach(function (offer) {
      fragment.appendChild(renderPin(offer));
    });

    mapPinsBlock.appendChild(fragment);
  };

  var offers = getOffers(8);

  // MODULE 4

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var adFormAddress = adForm.querySelector('#address');
  var inputPrice = adForm.querySelector('#price');
  var selectTypeHose = adForm.querySelector('#type');
  var selectTimein = adForm.querySelector('#timein');
  var selectTimeout = adForm.querySelector('#timeout');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var optionsCapacitys = selectCapacity.querySelectorAll('option');
  var adFormFieldsetList = adForm.querySelectorAll('fieldset');
  var filterFormFieldsetList = filterForm.querySelectorAll('select');

  var addDisabledFildset = function (listElements, flag) {
    listElements.forEach(function (fildset) {
      fildset.disabled = flag;
    });
  };

  var isEnterKey = function (evt) {
    return evt.key === KeyboardKey.ENTER;
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

    renderPins(offers);
    renderAddress(getMainPinCoords(MainPinSize.HEIGHT));

    mapPinMain.removeEventListener('mousedown', onMainPinMouseDown);
    mapPinMain.removeEventListener('keydown', onMainPinEnterPress);
    addDisabledFildset(adFormFieldsetList, false);
    addDisabledFildset(filterFormFieldsetList, false);
  };

  var onMainPinMouseDown = function () {
    showMapAndForm();
  };

  var onMainPinEnterPress = function (evt) {
    if (isEnterKey(evt)) {
      showMapAndForm();
    }
  };

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

  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
  mapPinMain.addEventListener('keydown', onMainPinEnterPress);

  addDisabledFildset(adFormFieldsetList, true);
  addDisabledFildset(filterFormFieldsetList, true);

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

  renderAddress(getMainPinCoords(MainPinSize.RADIUS));

  addAttributesCapacity(roomCountToAddDisabled, 'disabled');
  addAttributesCapacity(roomCountToAddSelected, 'selected');

  selectRoomNumber.addEventListener('change', function () {
    addAttributesCapacity(roomCountToAddDisabled, 'disabled');
    addAttributesCapacity(roomCountToAddSelected, 'selected');
    removeAttributesCapacity(roomCountToRemoveDisabled, 'disabled');
    removeAttributesCapacity(roomCountToRemoveSelected, 'selected');
  });
}());
