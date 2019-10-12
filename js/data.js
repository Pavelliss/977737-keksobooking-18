'use strict';
(function () {
  var MapRect = {
    LEFT: 0,
    TOP: 130,
    RIGHT: 1200,
    BOTTOM: 630
  };

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

  // random number
  var getRandomNumber = function (min, max) {
    var number = min + Math.random() * (max + 1 - min);
    return Math.floor(number);
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

  var getOffers = function (num) {
    return new Array(num).fill(null).map(function (_, idx) {
      return getAdvert(idx);
    });
  };

  window.offers = getOffers(8);
}());
