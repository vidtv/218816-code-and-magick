'use strict';

window.form = (function() {
  var MIN_POSITIVE_RATE = 3;
  var buttonReview = document.querySelector('button');
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var radioButtons = document.getElementsByClassName('review-form-group review-form-group-mark');
  var reviewAuthor = document.querySelector('#review-name');
  var reviewDescription = document.querySelector('#review-text');
  var reviewFields = document.getElementsByClassName('review-form-control review-fields');
  var reviewRequiredName = document.getElementsByClassName('review-fields-label review-fields-name');
  var reviewRequiredText = document.getElementsByClassName('review-fields-label review-fields-text');

  /*
  функция, устанавливающая полю "Описание" атрибут required при оценке меньше 3
  */
  var reviewTextRequirement = function(event) {
    reviewDescription.required = Number(event.target.value) < MIN_POSITIVE_RATE;
  };
  // и обработчик события для этой функции
  radioButtons[0].addEventListener('click', reviewTextRequirement);

  /*
  обработчик события input, устанавливающий полю "Имя" атрибут required
  */
  reviewAuthor.addEventListener('input', reviewAuthor.required = true);

  // валидность поля описания и поля имени
  var isNameValid = Boolean(reviewAuthor.value);
  var isTextValid = reviewDescription.required && reviewDescription.value || !reviewDescription.required;

  /*
  функция, устанавливающая кнопке отправки формы атрибут disabled
  */
  function buttonDisabled() {
    buttonReview.disabled = !(isNameValid && isTextValid); // кнопка заблочена, если невалиден либо текст, либо имя
  }
  // и обработчик события для этой функции
  reviewAuthor.addEventListener('input', buttonDisabled);
  reviewDescription.addEventListener('input', buttonDisabled);

/*
  функция, удаляющая элементы блока review-fields и сам блок
*/
  function reviewFieldsRemover() {
    reviewRequiredName[0].classList.toggle('invisible', isNameValid);
    reviewRequiredText[0].classList.toggle('invisible', isTextValid);
    reviewFields[0].classList.toggle('invisible', isTextValid && isNameValid);
  }
  // и обработчики события для этой функции
  reviewAuthor.addEventListener('input', reviewFieldsRemover);
  reviewDescription.addEventListener('input', reviewFieldsRemover);

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
