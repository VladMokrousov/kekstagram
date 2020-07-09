"use strict";
(function () {
  //Этот модуль описывает взаимодействие с ползунком

  //Связываем логику клика на фильтр и ползунка
  var MAX_VALUE_BLUR_AND_BRIGHTNESS_FILTERS = 3;
  var MAX_VALUE_OTHER_FILTERS = 1;

  var inputValue = document.querySelector('.effect-level__value');
  var sliderDot = document.querySelector('.effect-level__pin'),
    allSlider = document.querySelector('.img-upload__effect-level'),
    effectLevelLine = document.querySelector('.effect-level__depth'),
    rangeLine = document.querySelector('.effect-level__line'),
    spanWithEffect = document.querySelectorAll('.effects__preview'),
    imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img'),
    sliderDotOriginalLeft = '100%',
    effectLevelLineOriginalWidth = '100%';

  window.resetRangeValue = function () {
    allSlider.style.display = 'none';
    inputValue.value = '0';
    imgUploadPreview.style.filter = "none";
    sliderDot.style.left = sliderDotOriginalLeft;
    effectLevelLine.style.width = effectLevelLineOriginalWidth;
    imgUploadPreview.removeAttribute('class');
  };
  window.resetRangeValue();

  //Обрабатываем положение ползунка и насыщенность фильтра, применяемого к фото при переключении фильтра

  for (let i = 0; i < spanWithEffect.length; i++) {
    spanWithEffect[i].addEventListener('click', function () {
      var currentEffectClass = spanWithEffect[i].classList[1];
      imgUploadPreview.className = currentEffectClass;

      if (currentEffectClass == 'effects__preview--none') {
        allSlider.style.display = 'none';
        imgUploadPreview.style.filter = 'none';
        inputValue.value = '0';
      } else {
        allSlider.style.display = 'block';
        sliderDot.style.left = sliderDotOriginalLeft;
        effectLevelLine.style.width = effectLevelLineOriginalWidth;
        /* Более универсальная конструкция. Подейдет при начальнос положении слайдера отличном от 100%
    var replacementNum,
    cssFilter;
  
    if(currentEffectClass == 'effects__preview--phobos' || currentEffectClass == 'effects__preview--heat'){
      replacementNum = String(MAX_VALUE_BLUR_AND_BRIGHTNESS_FILTERS*sliderDotOriginalLeft.replace(/%/, "")/100);
      cssFilter = (getComputedStyle(spanWithEffect[i]).filter).replace(/\d/, replacementNum);

    } 
    else {
      replacementNum = String('0.' + effectLevelLineOriginalWidth.match(/\d/)[0]);
      cssFilter = (getComputedStyle(spanWithEffect[i]).filter).replace(/\d/, replacementNum);
    }
    inputValue.value = replacementNum;
    imgUploadPreview.style.filter = cssFilter;*/
        inputValue.value = imgUploadPreview.style.filter.match(/\d/);
        imgUploadPreview.style.filter = getComputedStyle(spanWithEffect[i]).filter;

      }
    });
  }


  //Перетаскивание ползунка и смена насыщенности фильтра, применяемого к фото

  sliderDot.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var x = evt.clientX;
    var rangeLineWidth = rangeLine.offsetWidth;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = x - moveEvt.clientX;
      x = moveEvt.clientX;

      if (sliderDot.offsetLeft - shiftX < 0) {
        sliderDot.style.left = 0;
        effectLevelLine.style.width = 0;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

      } else if (sliderDot.offsetLeft - shiftX > rangeLineWidth) {

        sliderDot.style.left = rangeLineWidth + 'px';
        effectLevelLine.style.width = rangeLineWidth + 'px';

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

      } else {
        sliderDot.style.left = (sliderDot.offsetLeft - shiftX) + 'px';
        effectLevelLine.style.width = sliderDot.offsetLeft + 'px';

        var newSliderDotLeftPercent = String(sliderDot.offsetLeft * 100 / rangeLineWidth),
          newValueFilter;

        if (/blur/.test(getComputedStyle(imgUploadPreview).filter) || /brightness/.test(getComputedStyle(imgUploadPreview).filter)) {
          newValueFilter = (MAX_VALUE_BLUR_AND_BRIGHTNESS_FILTERS * newSliderDotLeftPercent / 100).toFixed(1);
        } else {
          newValueFilter = (MAX_VALUE_OTHER_FILTERS * newSliderDotLeftPercent / 100).toFixed(1);
        }

        var oldValueFilter = getComputedStyle(imgUploadPreview).filter.match(/\(([0-9.]+).*?\)/)[1];
        console.log(newValueFilter);
        inputValue.value = newValueFilter;
        imgUploadPreview.style.filter = getComputedStyle(imgUploadPreview).filter.replace(oldValueFilter, newValueFilter);

      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });


})();
