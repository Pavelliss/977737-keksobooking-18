'use strict';
(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').
                        content.querySelector('.success');

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

  var showError = function (errorMessage) {
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

  // success popup
  var successBlock = null;

  var onSuccesButtonClick = function (evt) {
    evt.preventDefault();
    window.util.removeBlock(successBlock, onSuccesButtonClick);
  };

  var onSuccesButtonEscPress = function (evt) {
    if (window.util.isEscKey(evt)) {
      window.util.removeBlock(successBlock, onSuccesButtonEscPress);
    }
  };

  var showSuccess = function () {
    successBlock = successTemplate.cloneNode(true);

    main.appendChild(successBlock);

    successBlock.addEventListener('click', onSuccesButtonClick);
    document.addEventListener('keydown', onSuccesButtonEscPress);
  };

  window.popup = {
    showError: showError,
    showSuccess: showSuccess,
  };
})();

