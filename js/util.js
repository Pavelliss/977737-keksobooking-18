'use strict';
(function () {
  var KeyboardKey = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    ESCAPE_IE: 'Esc'
  };

  var addDisabledFildset = function (listElements, flag) {
    listElements.forEach(function (fildset) {
      fildset.disabled = flag;
    });
  };

  window.util = {
    isEnterKey: function (evt) {
      return evt.key === KeyboardKey.ENTER;
    },
    isEscKey: function (evt) {
      return evt.key === KeyboardKey.ESCAPE
      || evt.key === KeyboardKey.ESCAPE_IE;
    },
    addDisabledFildset: addDisabledFildset
  };
}());
