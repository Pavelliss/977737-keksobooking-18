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
})();
