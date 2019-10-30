'use strict';
(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var removeBlock = function (block, onEscPress) {
    block.remove();
    block = null;
    document.removeEventListener('keydown', onEscPress);
  };

  // Error popup

  var onErrorButtonEscPress = function (evt) {
    if (window.util.isEscKey(evt)) {
      removeBlock(errorBlock, onErrorButtonEscPress);
    }
  };

  var errorBlock = null;

  var onErrorButtonClick = function (evt) {
    evt.preventDefault();
    removeBlock(errorBlock, onErrorButtonEscPress);
  };

  window.errorHandler = function (errorMessage) {
    errorBlock = errorTemplate.cloneNode(true);
    var errorText = errorBlock.querySelector('.error__message');
    var errorButton = errorBlock.querySelector('.error__button');

    errorText.textContent = errorMessage;
    main.appendChild(errorBlock);
    errorButton.focus();

    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onErrorButtonEscPress);
    errorBlock.addEventListener('click', onErrorButtonClick);
  };

  // Card popup

  var closeCard = function () {
    var cardBlock = window.domRef.mapBlock.querySelector('.map__card');
    var cardCloseButton = cardBlock.querySelector('.popup__close');

    var onCloseButtonEscPress = function (evt) {
      if (window.util.isEscKey(evt)) {
        removeBlock(cardBlock, onCloseButtonEscPress);
      }
    };

    var onCloseButtonClick = function () {
      removeBlock(cardBlock, onCloseButtonEscPress);
    };

    cardCloseButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onCloseButtonEscPress);
  };


  window.popup = {
    closeCard: closeCard,
  };
})();

