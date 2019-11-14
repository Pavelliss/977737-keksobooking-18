'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_URL_AVATAR = 'img/muffin-grey.svg';

  var avatarImage = window.domRef.adForm.querySelector('.ad-form-header__preview img');
  var photoImage = window.domRef.adForm.querySelector('.ad-form__photo');
  var avatarInput = window.domRef.adForm.querySelector('#avatar');
  var photoInput = window.domRef.adForm.querySelector('#images');

  var isFileExtension = function (file) {
    return FILE_TYPES.some(function (type) {
      return file.name.endsWith(type);
    });
  };

  var onInputFileChange = function (evt) {
    var fileInput = evt.target;
    var file = fileInput.files[0];

    if (isFileExtension(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var result = reader.result;
        switch (fileInput) {
          case avatarInput:
            avatarImage.src = result;
            break;
          case photoInput:
            photoImage.style.backgroundImage = 'url(' + result + ')';
            photoImage.style.backgroundSize = 'cover';
            break;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  var resetFileInput = function () {
    avatarImage.src = DEFAULT_URL_AVATAR;
    photoImage.removeAttribute('style');
  };

  avatarInput.addEventListener('change', onInputFileChange);
  photoInput.addEventListener('change', onInputFileChange);

  window.avatarPhotos = {
    resetFileInput: resetFileInput,
  };
})();
