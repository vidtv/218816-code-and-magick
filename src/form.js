'use strict';

window.form = (function() {
  var MIN_POSITIVE_RATE = 3;
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var btnCallSubmitForm = document.querySelector('.reviews-controls');
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
  функция для валидности поля описания
  */
  function textValidity(element) {
    return !element.required || Boolean(element.value.trim());
  }

/*
  функция, блокирующая кнопку и удаляющая элементы блока review-fields и сам блок
*/
  function reviewLabelsRemover() {
    var isNameValid = Boolean(fieldName.value);
    var isTextValid = textValidity(fieldReview);
    var isFormValid = isNameValid && isTextValid;
    btnReviewSubmit.disabled = !isFormValid; // установка у кнопки атрибута disabled в зависимости от валидности формы
    hintName.classList.toggle('invisible', isNameValid);
    hintText.classList.toggle('invisible', isTextValid);
    hintContainer.classList.toggle('invisible', isFormValid);
  }
  // и обработчики события для этой функции
  formMarkContainer.addEventListener('change', reviewLabelsRemover);
  fieldName.addEventListener('input', reviewLabelsRemover);
  fieldReview.addEventListener('input', reviewLabelsRemover);
  btnCallSubmitForm.addEventListener('click', reviewLabelsRemover);

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
