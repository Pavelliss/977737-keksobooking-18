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

  var makeFragmentRender = function (render) {
    return function getFragment(values) {
      var fragment = document.createDocumentFragment();
      values.forEach(function (value) {
        fragment.appendChild(render(value));
      });

      return fragment;
    };
  };

  var makeTemplateGenerator = function (generator) {
    return function getTemplate(values) {
      return values.map(generator).join('');
    };
  };

  var removeBlock = function (block, onEscPress) {
    block.remove();
    block = null;
    document.removeEventListener('keydown', onEscPress);
  };

  var pluralize = function (num, one, two, five) {
    var mod100 = Math.abs(num % 100);
    if (mod100 > 10 && mod100 < 20) {
      return five;
    }

    var mod10 = mod100 % 10;
    if (mod10 > 1 && mod10 < 5) {
      return two;
    }

    return mod10 === 1 ? one : five;
  };

  window.util = {
    isEnterKey: function (evt) {
      return evt.key === KeyboardKey.ENTER;
    },
    isEscKey: function (evt) {
      return evt.key === KeyboardKey.ESCAPE
      || evt.key === KeyboardKey.ESCAPE_IE;
    },
    addDisabledFildset: addDisabledFildset,
    makeFragmentRender: makeFragmentRender,
    makeTemplateGenerator: makeTemplateGenerator,
    removeBlock: removeBlock,
    pluralize: pluralize,
  };
}());
