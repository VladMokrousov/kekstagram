"use strict";
(function(){
//В этом модуле мы создаем и отрисовываем фото на главной сайта
var similarListElement = document.querySelector('.pictures'),//В конец этой секции вставляем похожие изображения
similarPhotoTemplate = document.querySelector('#picture')
.content
.querySelector('.picture'),
commentsArr = ["Всё отлично!", "В целом всё неплохо. Но не всё.", "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
"Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
"Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
"Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"],
descriptionArr = ["Тестим новую камеру!", "Затусили с друзьями на море", "Как же круто тут кормят", "Отдыхаем...", "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......",
        "Вот это тачка!"],
MIN_NUM_PHOTO = 1,
MAX_NUM_PHOTO = 25,
MIN_COUNT_LIKES = 15,
    MAX_COUNT_LIKES = 200,
    MIN_COUNT_COMMENTS = 10,
    MAX_COUNT_COMMENTS = 100,
PHOTO_COUNT = 25;


//Возвращает перемешаный массив
function generateArrayRandomNumber (min, max) {
	var totalNumbers 		= max - min + 1,
		arrayTotalNumbers 	= [],
		arrayRandomNumbers 	= [],
		tempRandomNumber;

	while (totalNumbers--) {
		arrayTotalNumbers.push(totalNumbers + min);
	}

	while (arrayTotalNumbers.length) {
		tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
		arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
		arrayTotalNumbers.splice(tempRandomNumber, 1);
	}

	return arrayRandomNumbers;
}

var mixedNumPhoto = generateArrayRandomNumber(MIN_NUM_PHOTO, MAX_NUM_PHOTO);

//Возвращает рандомное число из диапазона
function getRandomNumFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Получение n рандомных уникальных элементов из массива
function getRandomElements(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandomElements: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}

//Получение случайного элемента массива
var getRandomElement = function (arrName) {
    return arrName[Math.floor(Math.random() * arrName.length)];
};


 //Генерация списка комментов
var getCommentsList = function(l) {
    var choiceArr,
    comment,
    commentsList = [];
    for (let i = 0; i < l; i++) {
        choiceArr = [getRandomElement(commentsArr), getRandomElement(commentsArr) + " " + getRandomElement(commentsArr)];
        comment = getRandomElement(choiceArr);
        commentsList.push(comment);
    }
    return commentsList;
};


var photoList = [];

for (let i = 0; i < PHOTO_COUNT; i++) {
   // Записываем каждый объект в массив
    photoList.push({
    url: "photos/" + mixedNumPhoto[i] + ".jpg",
	likes: getRandomNumFromRange(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
    comments: getCommentsList(getRandomNumFromRange(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS)),
	description: getRandomElement(descriptionArr)
    });
    
}

console.log(photoList);

var renderPhoto = function (photo) {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector(".picture__img").src = photo.url;
    photoElement.querySelector(".picture__likes").textContent = photo.likes;
    photoElement.querySelector(".picture__comments").textContent = photo.comments.length;
    return photoElement;
};

var defaultPhotoList = [];

var successHandler = function(photos){
 console.log(photos);
  var fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    defaultPhotoList.push(photos[i]);
      fragment.appendChild(renderPhoto(photos[i]));
  }
  similarListElement.appendChild(fragment);
  
  window.renderPreviewPhoto = {
    photoList: photoList,
    defaultPhotoList: defaultPhotoList,
    getRandomNumFromRange: getRandomNumFromRange,
    renderPhoto: renderPhoto,
    getRandomElements: getRandomElements
  };
  var imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');
  window.filterImg();
  window.renderBigPhoto();
};
console.log(defaultPhotoList);


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


window.backend.load(successHandler, errorHandler);


})();