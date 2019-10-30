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

  var getOfferRoom = function (offer) {
    return offer.rooms + ' комнат для ' + offer.guests + ' гостей';
  };

  var getFeatureMarkup = function (feature) {
    return '<li class="popup__feature popup__feature--' + feature + '"></li>';
  };

  var getPhotoMarkup = function (url) {
    return '<img src="' + url + '" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>';
  };

  var getFeatureTemplate = window.util.makeTemplateGenerator(getFeatureMarkup);
  var getPhotoTemplate = window.util.makeTemplateGenerator(getPhotoMarkup);

  var renderCard = function (advert) {
    var card = cardTemplate.cloneNode(true);
    var cardAvatar = card.querySelector('.popup__avatar');
    var cardTitle = card.querySelector('.popup__title');
    var cardAddress = card.querySelector('.popup__text--address');
    var cardPrice = card.querySelector('.popup__text--price');
    var cardTypeHousing = card.querySelector('.popup__type');
    var cardDescription = card.querySelector('.popup__description');

    var cardPhotos = card.querySelector('.popup__photos');
    var cardFeatures = card.querySelector('.popup__features');

    var offer = advert.offer;
    card.querySelector('.popup__text--capacity').textContent = getOfferRoom(offer);
    card.querySelector('.popup__text--time').textContent = getOfferTime(offer);
    cardPhotos.innerHTML = offer.photos.length > 0 ? getPhotoTemplate(offer.photos) : '';
    cardFeatures.innerHTML = offer.features.length > 0 ? getFeatureTemplate(offer.features) : '';
    cardAvatar.src = advert.author.avatar;
    cardTitle.textContent = offer.title;
    cardAddress.textContent = offer.address;
    cardPrice.textContent = offer.price + '₽/ночь';
    cardTypeHousing.textContent = offerTypeEnToRu[offer.type];
    cardDescription.textContent = offer.description;

    card.classList.add('.map__pin--active');

    return card;
  };

  var showCard = function (adverts) {
    var cardBlock = window.domRef.mapBlock.querySelector('.map__card');
    if (cardBlock) {
      cardBlock.remove();
    }
    mapFilterContainer.before(renderCard(adverts));
  };

  var closeCard = function () {
    var cardBlock = window.domRef.mapBlock.querySelector('.map__card');
    var cardCloseButton = cardBlock.querySelector('.popup__close');

    var onCloseButtonEscPress = function (evt) {
      if (window.util.isEscKey(evt)) {
        window.util.removeBlock(cardBlock, onCloseButtonEscPress);
      }
    };

    var onCloseButtonClick = function () {
      window.util.removeBlock(cardBlock, onCloseButtonEscPress);
    };

    cardCloseButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onCloseButtonEscPress);
  };

  window.card = {
    show: showCard,
    close: closeCard,
  };
})();
