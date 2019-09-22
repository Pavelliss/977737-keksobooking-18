'use strict';

// Test date
// var ADDRESS = '600, 350';
var PRICES = [100, 150, 200, 250, 300, 350, 400, 450];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [2, 3, 1];
var GUESTS = [1, 2, 3];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['text1', 'text2', 'text3', 'text4', 'text5', 'text6', 'text7', 'text8'];
// var PHOTOS = [
//   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
// ];
var LOCATION_X = [600, 550, 350, 200, 400, 300, 250, 450];
var LOCATION_Y = [150, 300, 200, 180, 400, 250, 350, 450];

var mapBlock = document.querySelector('.map');
var mapPinsBlocks = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;

mapBlock.classList.remove('map--faded');

// Creating random array element (if true) or random array langth
var getRandomElement = function (array, element) {
  var number = Infinity;
  if (element) {
    while (number > array.length - 1) {
      number = Math.floor(Math.random() * 10);
    }
    return array[number];
  } else {
    while (number > array.length - 1) {
      number = Math.ceil(Math.random() * 10);
    }
    return number;
  }
};
// create a new array from an old random length
var getNewArray = function (oldArray) {
  var newArray = [];
  for (var i = 0; i < getRandomElement(oldArray, false); i++) {
    newArray.push(oldArray[i]);
  }
  return newArray;
};

// add 0 to photo number
var getPhotoNumber = function (n) {
  n++;
  n = '0' + String(n);
  return n;
};

var getOffers = function (quantity) {
  var offersList = [];
  for (var i = 0; i < quantity; i++) {
    var offer =
      {
        'author': {
          'avatar': 'img/avatars/user' + getPhotoNumber(i) + '.png'
        },
        'offer': {
          'title': 'заголовок предложения',
          'address': 'left: ' + LOCATION_X[i] + 'px; top: ' + LOCATION_Y[i] + 'px',
          'price': getRandomElement(PRICES, true),
          'type': getRandomElement(TYPES, true),
          'rooms': getRandomElement(ROOMS, true),
          'guests': getRandomElement(GUESTS, true),
          'checkin': getRandomElement(CHECKIN, true),
          'checkout': getRandomElement(CHECKOUT, true),
          'features': getNewArray(FEATURES),
          'description': getRandomElement(DESCRIPTION, true),
          'photos': [
            'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
          ]
        },
        'location': {
          'x': getRandomElement(LOCATION_X, true),
          'y': getRandomElement(LOCATION_Y, true)
        }
      };
    offersList.push(offer);
  }

  // Pin creatig
  var fragmentPin = document.createDocumentFragment();
  var createPin = function (array, index) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = array[index].author.avatar;
    pinElement.querySelector('img').alt = array[index].offer.title;
    pinElement.querySelector('.map__pin').style = array[index].offer.address;

    return pinElement;
  };
  // adding content to the markup
  for (var j = 0; j < offersList.length; j++) {
    fragmentPin.appendChild(createPin(offersList, j));
  }

  return mapPinsBlocks.appendChild(fragmentPin);
};

getOffers(8);

