'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarImage = window.domRef.adForm.querySelector('.ad-form-header__preview img');
  var avatarFile = window.domRef.adForm.querySelector('#avatar');
  var photoFile = window.domRef.adForm.querySelector('#images');
  var photoImage = window.domRef.adForm.querySelector('.ad-form__photo');

  var getUserFile = function (elementFile) {
    var file = elementFile.files[0];
    var fileName = file.name.toLowerCase();

    var checkExtension = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (!checkExtension) {
      return undefined;
    }
    return file;
  };

  var onInputFileChange = function () {
    var file = getUserFile(avatarFile);
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      avatarImage.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  var onInputPhotoChange = function () {
    var file = getUserFile(photoFile);
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      photoImage.style.backgroundImage = 'url(' + reader.result + ')';
      photoImage.style.backgroundSize = 'cover';
    });

    reader.readAsDataURL(file);
  };

  avatarFile.addEventListener('change', onInputFileChange);
  photoFile.addEventListener('change', onInputPhotoChange);
})();
