'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFilterContainer = document.querySelector('.map__filters-container');

  var offerTypeEnToRu = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var getOfferTime = function (offer) {
    return 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  };

  var getFeatureMarkup = function (feature) {
    return '<li class="popup__feature popup__feature--' + feature + '"></li>';
  };

  var getPhotoMarkup = function (url) {
    return '<img src="' + url + '" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>';
  };

  var getRoomsEnding = function (rooms) {
    return window.util.pluralize(rooms, 'комната', 'комнаты', 'комнат');
  };

  var getGuestEnding = function (guests) {
    return window.util.pluralize(guests, 'гостя', 'гостей', 'гостей');
  };

  var getOfferRoom = function (offer) {
    return offer.rooms + ' ' + getRoomsEnding(offer.rooms) + ' для ' +
           offer.guests + ' ' + getGuestEnding(offer.guests);
  };

  var getFeatureTemplate = window.util.makeTemplateGenerator(getFeatureMarkup);
  var getPhotoTemplate = window.util.makeTemplateGenerator(getPhotoMarkup);

  var renderCard = function (advert) {
    var card = cardTemplate.cloneNode(true);
    var avatar = card.querySelector('.popup__avatar');
    var title = card.querySelector('.popup__title');
    var address = card.querySelector('.popup__text--address');
    var price = card.querySelector('.popup__text--price');
    var typeHousing = card.querySelector('.popup__type');
    var description = card.querySelector('.popup__description');
    var photos = card.querySelector('.popup__photos');
    var features = card.querySelector('.popup__features');

    var offer = advert.offer;
    card.querySelector('.popup__text--capacity').textContent = getOfferRoom(offer);
    card.querySelector('.popup__text--time').textContent = getOfferTime(offer);
    photos.innerHTML = offer.photos.length > 0 ? getPhotoTemplate(offer.photos) : '';
    features.innerHTML = offer.features.length > 0 ? getFeatureTemplate(offer.features) : '';
    avatar.src = advert.author.avatar;
    title.textContent = offer.title;
    address.textContent = offer.address;
    price.textContent = offer.price + '₽/ночь';
    typeHousing.textContent = offerTypeEnToRu[offer.type];
    description.textContent = offer.description;

    return card;
  };

  var removeClassActive = function () {
    var pinActive = window.domRef.mapBlock.querySelector('.map__pin--active');

    if (pinActive !== null) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  var addCardListener = function (card) {
    var closeButton = card.querySelector('.popup__close');

    var onCloseButtonEscPress = function (evt) {
      if (window.util.isEscKey(evt)) {
        window.util.removeBlock(card, onCloseButtonEscPress);
        removeClassActive();
      }
    };

    var onCloseButtonClick = function () {
      window.util.removeBlock(card, onCloseButtonEscPress);
      removeClassActive();
    };

    closeButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onCloseButtonEscPress);
  };

  var closeCard = function () {
    var cardBlock = window.domRef.mapBlock.querySelector('.map__card');
    if (cardBlock !== null) {
      cardBlock.remove();
    }
  };

  var showCard = function (advert) {
    var card = renderCard(advert);
    closeCard();
    removeClassActive();
    addCardListener(card);
    mapFilterContainer.before(card);
  };

  window.card = {
    show: showCard,
    close: closeCard,
  };
})();
