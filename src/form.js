'use strict';

window.form = (function() {
  var MIN_POSITIVE_RATE = 3;
  var browserCookies = require('browser-cookies');
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var btnCallSubmitForm = document.querySelector('.reviews-controls');
  var reviewForm = document.querySelector('.review-form');
  var formMarkContainer = reviewForm.querySelector('.review-form-group-mark');
  var reviewFormMarks = reviewForm.elements.namedItem('review-mark');
  var btnReviewSubmit = reviewForm.querySelector('button');
  var fieldName = reviewForm.querySelector('#review-name');
  var fieldReview = reviewForm.querySelector('#review-text');
  var hintContainer = reviewForm.querySelector('.review-fields');
  var hintName = hintContainer.querySelector('.review-fields-name');
  var hintText = hintContainer.querySelector('.review-fields-text');

  /*
   установка полю "Имя" атрибута required
  */
  fieldName.required = true;

  /*
  функция для валидности поля описания
  */
  function textValidity(element) {
    return !element.required || Boolean(element.value.trim());
  }

/*
  функция валидности формы
*/
  function formValidity() {
    fieldReview.required = +reviewFormMarks.value < MIN_POSITIVE_RATE;
    var isNameValid = textValidity(fieldName);
    var isTextValid = textValidity(fieldReview);
    var isFormValid = isNameValid && isTextValid;
    btnReviewSubmit.disabled = !isFormValid; // установка у кнопки атрибута disabled в зависимости от валидности формы
    hintName.classList.toggle('invisible', isNameValid);
    hintText.classList.toggle('invisible', isTextValid);
    hintContainer.classList.toggle('invisible', isFormValid);
  }
  // и обработчики события для этой функции
  formMarkContainer.addEventListener('change', formValidity);
  fieldName.addEventListener('input', formValidity);
  fieldReview.addEventListener('input', formValidity);
  btnCallSubmitForm.addEventListener('click', formValidity);

  /*
  функция записи в cookies
  */
  function cookieWriter() {
    /*
    вычисление разницы между ДР Грейс Хоппер и сегодняшним днем
    */
    var MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
    var GRACE_BIRTH_DAY = 9;
    var GRACE_BIRTH_MONTH = 11;
    var now = new Date();
    var graceBirthday = new Date();
    graceBirthday.setDate(GRACE_BIRTH_DAY);
    graceBirthday.setMonth(GRACE_BIRTH_MONTH);

    var isBirthdayWas = (now.getMonth() === GRACE_BIRTH_MONTH) && (now.getDate() >= GRACE_BIRTH_DAY); // успел ли пройти ДР в текущем году
    if (isBirthdayWas) {
      graceBirthday.setFullYear(now.getFullYear());
    } else {
      graceBirthday.setFullYear(now.getFullYear() - 1);
    }

    var diffBetweenNow = Math.ceil((now - graceBirthday) / MILLISECONDS_IN_DAY);
    browserCookies.set('mark', reviewFormMarks.value, {expires: diffBetweenNow});
    browserCookies.set('username', fieldName.value, {expires: diffBetweenNow});
  }
  // и обработчик события для этой функции
  reviewForm.addEventListener('submit', cookieWriter);

  /*
  функция, скармливающая данные из кук при открытии формы
  */
  function formCookieData() {
    reviewFormMarks.value = browserCookies.get('mark');
    fieldName.value = browserCookies.get('username');
    var isFormValid = reviewFormMarks.value >= 3; // проверка формы на валидность после ее открытия
    btnReviewSubmit.disabled = !isFormValid;
    hintContainer.classList.toggle('invisible', isFormValid); // костылек для исчезновения подсказок в случае валидности формы
    hintName.classList.toggle('invisible', reviewFormMarks.value < 3); // костылек для исчезновения подсказки "имя" при оценке меньше 3
    hintText.classList.toggle('invisible', reviewFormMarks.value >= 3); // костылек для появления подсказки "отзыв" при оценке меньше 3
  }
  // и обработчик события для этой функции (если куки не пустые)
  if (document.cookie) {
    btnCallSubmitForm.addEventListener('click', formCookieData);
  }

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
