'use strict';

window.form = (function() {
  var MIN_POSITIVE_RATE = 3;
  var buttonReview = document.querySelector('review-form-control review submit');
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var marksRate = document.getElementsByName('review-mark');
  var reviewAuthor = document.querySelector('#review-name');
  var reviewDescription = document.querySelector('#review-text');

  /*
  функция, устанавливающая полю "Описание" атрибут required при оценке меньше 3
   */
  function replyRequirement() {
    marksRate.forEach(function(markRate) {
      if(Number(markRate.value) < MIN_POSITIVE_RATE) {
        reviewDescription.required = true;
      }
    });
  }
  // и обработчик события для этой функции
  marksRate.forEach(function(markRate) {
    markRate.addEventListener('change', replyRequirement);
  });

  /*
  обработчик события input, устанавливающий полю "Имя" атрибут required
  */
  reviewAuthor.addEventListener('input', reviewAuthor.required = true);

  /*
функция, устанавливающая кнопке отправки формы атрибут disabled
  */
  function buttonDisabled() {
    if(!reviewAuthor.value && reviewDescription.required === true && !reviewDescription.value) {
      buttonReview.disabled = true;
    }
  }
  // и обработчик события для этой функции
  reviewAuthor.addEventListener('input', buttonDisabled);
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
