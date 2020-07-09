'use strict';
(function(){
//Этот модуль позволяет загружать фото с компа и редактировать эту фотографию
var fileChooser = document.querySelector('.img-upload__start input[type=file]');
var preview = document.querySelector('.img-upload__preview img');
var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];

fileChooser.addEventListener('change', function(){
  var file = fileChooser.files[0];
  var fileName = file.name.toLowerCase();

  var matches = FILE_TYPES.some(function(it){
    return fileName.endsWith(it);
  });

  if(matches){
    var reader = new FileReader();
    reader.addEventListener('load', function(){
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

})();