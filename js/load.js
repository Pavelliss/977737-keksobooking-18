'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking1/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(window.errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText));
      }
    });
    xhr.addEventListener('error', function () {
      onError(window.errorHandler('Произошла ошибка соединения'));
    });
    xhr.addEventListener('timeout', function () {
      onError(window.errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс'));
    });
    xhr.timeout = 10000;
    xhr.send();
  };
})();
