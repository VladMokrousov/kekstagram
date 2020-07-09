"use strict";
(function () {
  window.renderBigPhoto = function () {
    //В этом модуле мы отрисовываем большое фото при клике на миниатюру
    var similarListElement = document.querySelector('.pictures'), //В конец этой секции вставляем похожие изображения 
      socialComments = document.querySelector('.social__comments'), //В конец этого списка вставляем новые комментарии
      ESCAPE = 27,
      body = document.querySelector('body'),
      similarCommentsTemplate = document.querySelector('.social__comment'),
      previewPictures = similarListElement.querySelectorAll('.picture'),
      selectedPicture,
      pictureIndex,
      currentArr;
 
    var bigPictureCancel = document.querySelector('.big-picture__cancel'),
      onbigPictureCancelClick = function () {
        bigPicture.classList.add('hidden');
        body.classList.remove('modal-open');
        
      };
    bigPictureCancel.addEventListener('click', function () {
      onbigPictureCancelClick();
    });


    var onPreviewPictureClick = function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      selectedPicture = evt.currentTarget;
      pictureIndex = selectedPicture.querySelector('.picture__img').getAttribute('src').match(/\d/g).join(''); //Получаем цифру из src 
      console.log(pictureIndex);

      for (let i = 0; i < window.renderPreviewPhoto.defaultPhotoList.length; i++) {
        if (window.renderPreviewPhoto.defaultPhotoList[i].url == "photos/" + pictureIndex + ".jpg") {

          currentArr = window.renderPreviewPhoto.defaultPhotoList[i];
          console.log(currentArr);
          constructBigPicture(currentArr);

          //Показываем получившийся элемент
          bigPicture.classList.remove("hidden");
          body.classList.add('modal-open');
          //Закрываем по нажатию esc
          document.addEventListener('keydown', function (evt) {
            if (evt.keyCode === ESCAPE) {
              onbigPictureCancelClick();
            }
          });
        }
      }
    };

    //Конструируем большое фото
    var bigPicture = document.querySelector('.big-picture');
  

    var constructBigPicture = function (arr) {
      
      bigPicture.querySelector(".big-picture__img").querySelector("img").src = arr.url;
      bigPicture.querySelector(".likes-count").textContent = arr.likes;
      bigPicture.querySelector(".comments-count").textContent = arr.comments.length;
      bigPicture.querySelector('.social__caption').textContent = arr.description;

      //Удаляем комменты для предыдущей фотки
      var commentElement = similarCommentsTemplate.cloneNode(true);
      var similarCommentsAll = document.querySelectorAll('.social__comment');
      for (let j = 0; j < similarCommentsAll.length; j++) {
        similarCommentsAll[j].remove();
      }
      

//Добавляем все комментарии из объекта на страницу
  for(let a = 0; a < arr.comments.length; a++){
    var commentElementCopy = commentElement.cloneNode(true);
  commentElementCopy.querySelector('.social__picture').src = arr.comments[a].avatar;
  commentElementCopy.querySelector('.social__text').textContent = arr.comments[a].message;
  commentElementCopy.classList.add('mark');
  commentElementCopy.style.display = 'none';
  socialComments.appendChild(commentElementCopy);
  }
  

  var socialCommentItems = document.querySelectorAll('.social__comment');

var addComments = function(i){
  socialCommentItems[i].removeAttribute('style');
};


      var inputCommentCount = document.querySelector('.social__comment-count');
      var showCommentsCount = 5;
      var stepShowCommentsCount = 5;
      var originCommentsLenght = arr.comments.length;
      var commentsLoaderBtn = document.querySelector('.social__comments-loader');
      var regexp = /\d+/g;
      var oldShowCommentsCount = inputCommentCount.textContent.match(regexp)[0];

      if (originCommentsLenght > showCommentsCount) {
        inputCommentCount.innerHTML = inputCommentCount.innerHTML.replace(oldShowCommentsCount, showCommentsCount);
        for (let i = 0; i < showCommentsCount; i++) {
          addComments(i);
        }
        commentsLoaderBtn.classList.remove('visually-hidden');
        
      } else {
          inputCommentCount.innerHTML = inputCommentCount.innerHTML.replace(oldShowCommentsCount, originCommentsLenght);
          for (let i = 0; i < originCommentsLenght; i++) {
            addComments(i);
          }
          commentsLoaderBtn.classList.add('visually-hidden');
          
        }


      var onCommentsLoaderBtnClick = function () {
       
        showCommentsCount += stepShowCommentsCount;
        oldShowCommentsCount = inputCommentCount.textContent.match(regexp)[0];
        if (originCommentsLenght > showCommentsCount) {
         
          inputCommentCount.innerHTML = inputCommentCount.innerHTML.replace(oldShowCommentsCount, showCommentsCount);
          for (let i = showCommentsCount - stepShowCommentsCount; i < showCommentsCount; i++) {
            addComments(i);
          }
          commentsLoaderBtn.classList.remove('visually-hidden');
          
        } else {
         
          inputCommentCount.innerHTML = inputCommentCount.innerHTML.replace(oldShowCommentsCount, originCommentsLenght);
          for (let i = showCommentsCount - stepShowCommentsCount; i < originCommentsLenght; i++) {
            addComments(i);
          }

          commentsLoaderBtn.classList.add('visually-hidden');
          commentsLoaderBtn.removeEventListener('click', onCommentsLoaderBtnClick);
         
        }
      };

      commentsLoaderBtn.addEventListener('click', onCommentsLoaderBtnClick);
     
    };

    for (let i = 0; i < previewPictures.length; i++) {
      
      previewPictures[i].addEventListener('click', onPreviewPictureClick);
    }
  };


})();
