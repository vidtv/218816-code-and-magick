'use strict';

window.form = (function() {
  var MIN_POSITIVE_RATE = 3;
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
