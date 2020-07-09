"use strict";
(function(){
  //Модуль занимается валидацией хэштегов и комментариев в форме для редактирования фото

var inputHashtag = document.querySelector('.text__hashtags'),
inputDescription = document.querySelector('.text__description'),
buttonUpload = document.querySelector('#upload-submit'),
editForm = document.querySelector('.img-upload__form'),
editWindow = document.querySelector('.img-upload__overlay');



var checkFormValidity = function(evt){
  
  //Дробим строку на элементы массива
  let hashtagArr = inputHashtag.value.split(' ');

  //Приводим все хэши к нижнему регистру, чтобы находить дубли с разным регистром
  for(let i = 0; i < hashtagArr.length; i++){
    hashtagArr[i] = hashtagArr[i].toLowerCase();
  } 

  inputHashtag.setCustomValidity('');

  if(inputHashtag.value == ""){
    console.log('Строка пустая');
  }
  else{

    for(let i = 0; i < hashtagArr.length; i++){

      for(let j = i + 1; j < hashtagArr.length; j++){
        if( hashtagArr[i] == hashtagArr[j] ) { 
          inputHashtag.setCustomValidity('Твои хэши дублируются!');
        } 
      }
  
      if(hashtagArr[i].match(/^#/) == null) {
      inputHashtag.setCustomValidity('Нет решетки в начале!');
    
      }
      else if( hashtagArr[i] == '#') {
      inputHashtag.setCustomValidity('Хэш не может состоять из одной решетки!');
   
      } 
 
      else if( hashtagArr.length > 5) {
      inputHashtag.setCustomValidity('Хэштегов должно быть 5 или меньше!');
   
      } 
      else if( hashtagArr[i].length > 20) {
      inputHashtag.setCustomValidity('Максимальная длина хэштега - 20 символов');
   
      } 
    
    }
  }

  if (inputHashtag.checkValidity() == false) {
    inputHashtag.style.outline = "2px solid red";
  }
  else{
    inputHashtag.style.outline = "initial";
  }

  inputDescription.setCustomValidity('');
  if(inputDescription.value.length > 140) {
    inputDescription.setCustomValidity('Максимальная длина коммента - 140 символов. Текущая длина: ' + inputDescription.value.length);
    inputDescription.style.outline = "2px solid red";
    console.log('Найден коммент длиннее 140 символов');
  }
  else {
    inputDescription.style.outline = "initial";
  }

  if(inputHashtag.checkValidity() == true && inputDescription.checkValidity() == true){
    var info = new FormData(editForm);
    var successHandler = function(response){
      console.log(response);
      window.resetScaleValue();
      window.resetRangeValue();
      editForm.reset();
      editWindow.classList.add('hidden');
    };
    var errorHandler = function(errorMessage){
      var node = document.createElement('div');
        node.style = "z-index: 100; margin: 0 auto; text-align: center; background-color: red;";
        node.style.position = "absolute";
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';
        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    };

    evt.preventDefault();
    window.backend.save(info, successHandler, errorHandler);
  }
};

buttonUpload.addEventListener('click', function(evt){
  checkFormValidity(evt);
});

})();