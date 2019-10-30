'use strict';
(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  // Error popup

  var onErrorButtonEscPress = function (evt) {
    if (window.util.isEscKey(evt)) {
      window.util.removeBlock(errorBlock, onErrorButtonEscPress);
    }
  };

  var errorBlock = null;

  var onErrorButtonClick = function (evt) {
    evt.preventDefault();
    window.util.removeBlock(errorBlock, onErrorButtonEscPress);
  };

  var errorHandler = function (errorMessage) {
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

  window.popup = {
    errorHandler: errorHandler,
  };
})();

