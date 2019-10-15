'use strict';
(function () {
  var body = document.querySelector('body');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var onErrorButtonEscPress = function (evt) {
    if (window.util.isEscKey(evt)) {
      onErrorButton(evt);
    }
  };

  var onErrorButton = function (evt) {
    evt.preventDefault();
    window.domRef.adForm.classList.add('ad-form--disabled');
    window.mapBlock.classList.add('map--faded');
    window.domRef.mapPinMain.addEventListener('mousedown', window.map.onMainPinMouseDown);
    window.domRef.mapPinMain.addEventListener('keydown', window.map.onMainPinEnterPress);
    body.removeChild(window.error);
  };

  window.errorHandler = function (errorMessage) {
    window.error = errorTemplate.cloneNode(true);
    var errorText = window.error.querySelector('.error__message');
    var errorButton = window.error.querySelector('.error__button');

    errorText.textContent = errorMessage;
    body.appendChild(window.error);
    errorButton.focus();

    errorButton.addEventListener('click', onErrorButton);
    errorButton.addEventListener('keydown', onErrorButtonEscPress, {once: true});
  };
})();

