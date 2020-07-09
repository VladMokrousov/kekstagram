"use strict";
(function(){
  window.filterImg = function(){

  
//В этом модуле мы прописываем логику отрисовки превью фоток в зависимости от фильтров
var lastTimeout;
var defaultFilterBtn = document.querySelector('#filter-default');

defaultFilterBtn.addEventListener('click', function(){
  if(lastTimeout){
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(function(){
    var picture = document.querySelectorAll('.picture');
for(let i = 0; i < picture.length; i++){
  picture[i].remove();
}
var filterBtn = document.querySelectorAll('.img-filters__button');
for(let a = 0; a < filterBtn.length; a++){
  filterBtn[a].classList.remove('img-filters__button--active');
}
defaultFilterBtn.classList.add('img-filters__button--active');


var fragment = document.createDocumentFragment();
for (let i = 0; i < window.renderPreviewPhoto.defaultPhotoList.length; i++) {
  
  fragment.appendChild(window.renderPreviewPhoto.renderPhoto(window.renderPreviewPhoto.defaultPhotoList[i]));
}
var similarListElement = document.querySelector('.pictures');
similarListElement.appendChild(fragment);

console.log('Я удалил все и загрузил заново из массива!');
window.renderBigPhoto();
  }, 500);

});


//Перемешиваем массив
function shuffle(array) {
  
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
var randomFilterBtn = document.querySelector('#filter-random');
var randomPhotoList = window.renderPreviewPhoto.defaultPhotoList.slice();
shuffle(randomPhotoList);

randomFilterBtn.addEventListener('click', function(){
  if(lastTimeout){
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(function(){
    var picture = document.querySelectorAll('.picture');
for(let i = 0; i < picture.length; i++){
  picture[i].remove();
}
var filterBtn = document.querySelectorAll('.img-filters__button');
for(let a = 0; a < filterBtn.length; a++){
  filterBtn[a].classList.remove('img-filters__button--active');
}
randomFilterBtn.classList.add('img-filters__button--active');

var fragment = document.createDocumentFragment();
for (let i = 0; i < 10; i++) {
  
  fragment.appendChild(window.renderPreviewPhoto.renderPhoto(randomPhotoList[i]));
}
var similarListElement = document.querySelector('.pictures');
similarListElement.appendChild(fragment);
console.log('Я удалил все и загрузил заново случайные элементы массива!');
window.renderBigPhoto();
  }, 500);

});


var discussedFilterBtn = document.querySelector('#filter-discussed');
var discussedPhotoList = window.renderPreviewPhoto.defaultPhotoList.slice();
discussedPhotoList.sort(function(first, second){
if(first.comments.length > second.comments.length){
  return -1;
} else if(first.comments.length < second.comments.length){
  return 1;
} else {
  return 0;
}
});

discussedFilterBtn.addEventListener('click', function(){
  if(lastTimeout){
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(function(){
    var picture = document.querySelectorAll('.picture');
  for(let i = 0; i < picture.length; i++){
    picture[i].remove();
  }
  var filterBtn = document.querySelectorAll('.img-filters__button');
  for(let a = 0; a < filterBtn.length; a++){
    filterBtn[a].classList.remove('img-filters__button--active');
  }
  discussedFilterBtn.classList.add('img-filters__button--active');

  var fragment = document.createDocumentFragment();
  for (let i = 0; i < discussedPhotoList.length; i++) {
    
    fragment.appendChild(window.renderPreviewPhoto.renderPhoto(discussedPhotoList[i]));
  }
  var similarListElement = document.querySelector('.pictures');
  similarListElement.appendChild(fragment);
  console.log('Я удалил все и загрузил заново популярные элементы массива!');
  window.renderBigPhoto();
  }, 500);

  });



};
})();