'use strict';
(function(){
//Этот модуль позволяет менять масштаб изображения в форме редактирования фото
var STEP_VALUE = 25;
var ORIGINAL_VALUE = '100%';
var MIN_VALUE = '25%';
var MAX_VALUE = '100%';
var btnDecrease = document.querySelector('.scale__control--smaller');
var btnIncrease = document.querySelector('.scale__control--bigger');
var inputScale = document.querySelector('.scale__control--value');
var photo = document.querySelector('.img-upload__preview img');

window.resetScaleValue = function(){
  inputScale.setAttribute('value', ORIGINAL_VALUE);
  photo.style.transform = 'scale(1)';
};
window.resetScaleValue();

btnDecrease.addEventListener('click', function(){
if(inputScale.value == MIN_VALUE) {
console.log('Ниже ты не упадешь!');
} else {
  inputScale.value = inputScale.value.match(/\d/g).join('') - STEP_VALUE + '%';

  var newNum = '0.' + inputScale.value.match(/\d/g).join('');
  console.log(newNum);
  photo.style.transform = 'scale(' + newNum + ')';
 
}

});

btnIncrease.addEventListener('click', function(){
  if(inputScale.value == MAX_VALUE){
    console.log('Выше ты не поднимешься!');
  } else {
    inputScale.value = Number(inputScale.value.match(/\d/g).join('')) + STEP_VALUE + '%';

    var newNum = (inputScale.value == MAX_VALUE) ? '1' : '0.' + inputScale.value.match(/\d/g).join('');
    console.log(newNum);
    photo.style.transform = 'scale(' + newNum + ')';
  }
});

})();