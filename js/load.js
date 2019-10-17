'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000; // 10 sek
  var Status = {
    OK: 200
  };

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.status === Status.OK) {
        onSuccess(xhr.response);
        window.util.addDisabledFildset(window.domRef.filterFormFieldsetList, false);
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
    xhr.timeout = TIMEOUT;
  };
})();
