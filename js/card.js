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

  var makeTemplateGenerator = function (generator) {
    return function getTemplate(values) {
      return values.map(generator).join('');
    };
  };

  var checkListLength = function (list, block, funRender) {
    if (list.length === 0) {
      block.remove();
    }
    block.innerHTML = funRender(list);
  };

  var getFeatureTemplate = makeTemplateGenerator(getFeatureMarkup);
  var getPhotoTemplate = makeTemplateGenerator(getPhotoMarkup);

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
    checkListLength(offer.photos, cardPhotos, getPhotoTemplate);
    checkListLength(offer.features, cardFeatures, getFeatureTemplate);

    cardAvatar.src = advert.author.avatar;
    cardTitle.textContent = offer.title;
    cardAddress.textContent = offer.address;
    cardPrice.textContent = offer.price + '₽/ночь';
    cardTypeHousing.textContent = offerTypeEnToRu[offer.type];
    cardDescription.textContent = offer.description;

    return card;
  };

  var renderOffer = function (adverts) {
    mapFilterContainer.before(renderCard(adverts));
  };

  window.card = {
    renderOffer: renderOffer,
  };
})();
