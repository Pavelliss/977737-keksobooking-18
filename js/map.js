'use strict';
(function () {
  window.domRef.mapPinMain.addEventListener('mousedown', window.page.onMainPinMouseDown);
  window.domRef.mapPinMain.addEventListener('keydown', window.page.onMainPinEnterPress);

  window.util.addDisabledFildset(window.domRefAdFormFieldsetList, true);
  window.util.addDisabledFildset(window.domRef.filterFormFieldsetList, true);
}());
