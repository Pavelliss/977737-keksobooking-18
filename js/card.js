'use strict';
(function () {
  var FEATURE_CLASS_REMOVE = 31; // delete 'popup__feature popup__feature--'

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFelterContainer = document.querySelector('.map__filters-container');

  var housingToValue = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var removeFeature = function (featureList, elements) {
    for (var i = 0; i < elements.length; i++) {
      var className = elements[i].className;
      className = className.slice(FEATURE_CLASS_REMOVE, className.length);
      var status = featureList.includes(className);
      if (status === false) {
        elements[i].remove();
      }
    }
  };

  var getAddressPhoto = function (addressList, element) {
    var image = element.querySelector('img');
    addressList.forEach(function (addressPhoto) {
      var cardPhoto = image.cloneNode(true);
      cardPhoto.src = addressPhoto;
      element.appendChild(cardPhoto);
    });
    image.remove();
  };

  var renderCard = function (offerCard) {
    var card = cardTemplate.cloneNode(true);
    var cardAvatar = card.querySelector('.popup__avatar');
    var cardTitle = card.querySelector('.popup__title');
    var cardAddress = card.querySelector('.popup__text--address');
    var cardPrice = card.querySelector('.popup__text--price');
    var cardTypeHousing = card.querySelector('.popup__type');
    var cardRoomGuest = card.querySelector('.popup__text--capacity');
    var cardTime = card.querySelector('.popup__text--time');
    var cardDescription = card.querySelector('.popup__description');
    var cardPhotos = card.querySelector('.popup__photos');
    var cardFeatures = card.querySelectorAll('.popup__feature');

    cardTitle.textContent = offerCard.offer.title;
    cardAddress.textContent = offerCard.offer.address;
    cardPrice.textContent = offerCard.offer.price + '₽/ночь';
    cardTypeHousing.textContent = housingToValue[offerCard.offer.type];
    cardRoomGuest.textContent = offerCard.offer.rooms + ' комнат для ' +
                                offerCard.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + offerCard.offer.checkin +
                           ' выезд до ' + offerCard.offer.checkout;
    cardDescription.textContent = offerCard.offer.description;
    cardAvatar.src = offerCard.author.avatar;
    getAddressPhoto(offerCard.offer.photos, cardPhotos);
    removeFeature(offerCard.offer.features, cardFeatures);

    return card;
  };

  var getFragmentCard = window.util.makeFragmentRender(renderCard);

  var renderCards = function (adverts) {
    mapFelterContainer.before(getFragmentCard(adverts));
  };

  window.card = {
    renderCards: renderCards,
  };
})();
