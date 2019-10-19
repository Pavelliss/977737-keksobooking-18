'use strict';
(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var onErrorButtonEscPress = function (evt) {
    if (window.util.isEscKey(evt)) {
      onErrorButtonClick(evt);
    }
  };

  var errorBlock = null;

  var onErrorButtonClick = function (evt) {
    evt.preventDefault();
    errorBlock.remove(); // удаляет элемент из DOM (браузер)
    errorBlock = null; // удаляет элемент из памяти JS (движок языка)
  };

  window.errorHandler = function (errorMessage) {
    errorBlock = errorTemplate.cloneNode(true);
    var errorText = errorBlock.querySelector('.error__message');
    var errorButton = errorBlock.querySelector('.error__button');

    errorText.textContent = errorMessage;
    main.appendChild(errorBlock);
    errorButton.focus();

    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onErrorButtonEscPress, {once: true});
    errorBlock.addEventListener('click', onErrorButtonClick);
  };
})();

