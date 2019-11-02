'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000; // 10 sec
  var Status = {
    OK: 200
  };

  var addLoadListener = function (xhr, onSuccess, onError) {
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === Status.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  window.loadOffer = function (url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (data !== null) {
      xhr.addEventListener('load', onSuccess);

      xhr.open('POST', url);
      xhr.send(data);
    } else {
      addLoadListener(xhr, onSuccess, onError);

      xhr.open('GET', url);
      xhr.send();
    }
  };

  window.load = {
    urlGet: URL_LOAD,
    urlPost: URL_UPLOAD,
  };
})();
