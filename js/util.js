'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;

  var KeyboardKey = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    ESCAPE_IE: 'Esc'
  };

  var addDisabledFildset = function (elements, flag) {
    elements.forEach(function (fildset) {
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
    var reduceValues = function (template, value) {
      template += generator(value);
      return template;
    };

    return function getTemplate(values) {
      return values.reduce(reduceValues, '');
    };
  };

  var removeBlock = function (block, onEscPress) {
    block.remove();
    block = null;
    window.removeEventListener('keydown', onEscPress);
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

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
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
    debounce: debounce,
  };
}());
