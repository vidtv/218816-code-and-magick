'use strict';

window.form = (function() {
  var MIN_POSITIVE_RATE = 3;
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var reviewForm = document.querySelector('.review-form');
  var formMarkContainer = reviewForm.querySelector('.review-form-group-mark');
  var btnReviewSubmit = reviewForm.querySelector('button');
  var fieldName = reviewForm.querySelector('#review-name');
  var fieldReview = reviewForm.querySelector('#review-text');
  var hintContainer = reviewForm.querySelector('.review-fields');
  var hintName = hintContainer.querySelector('.review-fields-name');
  var hintText = hintContainer.querySelector('.review-fields-text');
  /*
  функция, устанавливающая полю "Описание" атрибут required при оценке меньше 3
  */
  var reviewTextRequirement = function(event) {
    fieldReview.required = Number(event.target.value) < MIN_POSITIVE_RATE;
  };
  // и обработчик события для этой функции
  formMarkContainer.addEventListener('change', reviewTextRequirement);

  /*
   обработчик события input, устанавливающий полю "Имя" атрибут required
  */
  fieldName.addEventListener('input', fieldName.required = true);

  /*
  валидность полей имени и описания
  */
  function textValidity(element) {
    return !element.required || Boolean(element.value.trim());
  }

  /*
  функция, устанавливающая кнопке отправки формы атрибут disabled
  */
  function buttonDisabled() {
    var isNameValid = textValidity(fieldName);
    btnReviewSubmit.disabled = !isNameValid; // кнопка заблочена, если невалидно имя
  }
  // и обработчик события для этой функции
  fieldName.addEventListener('input', buttonDisabled);

/*
  функция, удаляющая элементы блока review-fields и сам блок
*/
  function reviewLabelsRemover() {
    var isNameValid = textValidity(fieldName);
    var isTextValid = textValidity(fieldReview);
    var isFormValid = isNameValid && isTextValid;
    hintName.classList.toggle('invisible', isNameValid);
    hintText.classList.toggle('invisible', isTextValid);
    hintContainer.classList.toggle('invisible', isFormValid);
  }
  // и обработчики события для этой функции
  fieldName.addEventListener('input', reviewLabelsRemover);
  fieldReview.addEventListener('input', reviewLabelsRemover);

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
