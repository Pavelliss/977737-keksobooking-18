'use strict';
(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var onErrorButtonEscPress = function (evt) {
    if (window.util.isEscKey(evt)) {
      onErrorButtonClick(evt);
    }
  };

  var onErrorButtonClick = function (evt) {
    evt.preventDefault();
    window.page.deactivatePage();
    main.removeChild(window.error);
  };

  window.errorHandler = function (errorMessage) {
    window.error = errorTemplate.cloneNode(true);
    var errorText = window.error.querySelector('.error__message');
    var errorButton = window.error.querySelector('.error__button');

    errorText.textContent = errorMessage;
    main.appendChild(window.error);
    errorButton.focus();

    errorButton.addEventListener('click', onErrorButtonClick);
    errorButton.addEventListener('keydown', onErrorButtonEscPress, {once: true});
    window.error.addEventListener('click', onErrorButtonClick);
  };
})();

