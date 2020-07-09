"use strict";
(function(){
//Этот модель открывает форму редактирования при изменении uploadFile

var imgUploadFormClose = document.querySelector('#upload-cancel'),
    imgUploadForm = document.querySelector('.img-upload__overlay'),
    editForm = document.querySelector('.img-upload__form'),
    uploadFile = document.querySelector('#upload-file'),
    inputHashtag = document.querySelector('.text__hashtags'),
    inputDescription = document.querySelector('.text__description'),
    onImgUploadFormClosePress = function() {
      window.resetScaleValue();
      window.resetRangeValue();
      editForm.reset();
      imgUploadForm.classList.add('hidden');
      uploadFile.value = '';
    },
    ESCAPE = 27;

uploadFile.addEventListener('change', function() {
  imgUploadForm.classList.remove('hidden');
  
  document.addEventListener('keydown', function(evt) {
    if(evt.keyCode === ESCAPE && inputHashtag != document.activeElement && inputDescription != document.activeElement) {
      onImgUploadFormClosePress();
      
    }
  });
});
imgUploadFormClose.addEventListener('click', function(evt){
  evt.preventDefault();
  onImgUploadFormClosePress();
});
})();