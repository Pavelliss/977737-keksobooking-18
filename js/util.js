'use strict';
(function () {
  var KeyboardKey = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    ESCAPE_IE: 'Esc'
  };

  window.util = {
    isEnterKey: function (evt) {
      return evt.key === KeyboardKey.ENTER;
    }
  };
}());
