'use strict';
(function () {
  // Test date
  // var ADDRESS = '600, 350';
  var PRICES = [100, 150, 200, 250, 300, 350, 400, 450];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [2, 3, 1];
  var GUESTS = [1, 2, 3];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['text1', 'text2', 'text3', 'text4', 'text5', 'text6', 'text7', 'text8'];
  // var PHOTOS = [
  //   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  // ];
  var LOCATIONS_X = [600, 550, 350, 200, 400, 300, 250, 450];
  var LOCATIONS_Y = [150, 300, 200, 180, 400, 250, 350, 450];

  var mapBlock = document.querySelector('.map');
  var mapPinsBlock = document.querySelector('.map__pins');
  var pinTemplateCont = document.querySelector('#pin').content;

  mapBlock.classList.remove('map--faded');

  // Creating random array element
  var getRandomElement = function (array) {
    var indexElement = Math.round(-0.5 + Math.random() * array.length);
    return array[indexElement];
  };
  // Creating random array langth
  var getRandomLength = function (array) {
    return Math.round(0.5 + Math.random() * array.length);
  };

  // create a new array from an old random length
  var createListRandomLength = function (oldList) {
    var newList = [];
    for (var i = 0; i < getRandomLength(oldList); i++) {
      newList.push(oldList[i]);
    }
    return newList;
  };

  // add 0 to photo number
  var getPhotoNumber = function (n) {
    n++;
    n = '0' + String(n);
    return n;
  };

  var getOffers = function (count) {
    var offersList = [];
    for (var i = 0; i < count; i++) {
      var offer =
      {
        'author': {
          'avatar': 'img/avatars/user' + getPhotoNumber(i) + '.png'
        },
        'offer': {
          'title': 'заголовок предложения',
          'address': 'left: ' + LOCATIONS_X[i] + 'px; top: ' + LOCATIONS_Y[i] + 'px',
          'price': getRandomElement(PRICES),
          'type': getRandomElement(TYPES),
          'rooms': getRandomElement(ROOMS),
          'guests': getRandomElement(GUESTS),
          'checkin': getRandomElement(CHECKINS),
          'checkout': getRandomElement(CHECKOUTS),
          'features': createListRandomLength(FEATURES),
          'description': getRandomElement(DESCRIPTIONS),
          'photos': [
            'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
            'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
          ]
        },
        'location': {
          'x': getRandomElement(LOCATIONS_X),
          'y': getRandomElement(LOCATIONS_Y)
        }
      };
      offersList.push(offer);
    }

    // Pin creating
    var fragmentPin = document.createDocumentFragment();
    var createPin = function (array, index) {
      var pinElement = pinTemplateCont.cloneNode(true);

      pinElement.querySelector('img').src = array[index].author.avatar;
      pinElement.querySelector('img').alt = array[index].offer.title;
      pinElement.querySelector('.map__pin').style = array[index].offer.address;

      return pinElement;
    };
    // adding content to the markup
    for (var j = 0; j < offersList.length; j++) {
      fragmentPin.appendChild(createPin(offersList, j));
    }

    return mapPinsBlock.appendChild(fragmentPin);
  };

  getOffers(8);
})();
