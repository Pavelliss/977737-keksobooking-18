'use strict';
(function () {
  window.getFilterTypes = function (listOption, typeValue) {
    return listOption.filter(function (option) {
      return option.offer['type'] === typeValue;
    });
  };
})();
