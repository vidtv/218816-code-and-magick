'use strict';

define(function() {
  var reviewTemplate = document.querySelector('template');
  //var elementToClone = (reviewTemplate || reviewTemplate.content).querySelector('.review');
  var elementToClone;
  if('content' in reviewTemplate) {
    elementToClone = reviewTemplate.content.querySelector('.review');
  } else {
    elementToClone = reviewTemplate.querySelector('.review');
  }

  var reviewQuiz = document.querySelector('.review-quiz');

  function Review(data) {
    this.data = data;
    this.element = elementToClone.cloneNode(true);
    reviewQuiz.addEventListener('click', this.makeReviewAnswerActive);
    reviewQuiz.removeEventListener('click', this.makeReviewAnswerActive);
  }

  Review.prototype.makeReviewAnswerActive = function(event) {
    var AnswerActive = reviewQuiz.querySelector('.review-quiz-answer-active');
    if(event.target.classList.contains('.review-quiz-answer')) {
      if(AnswerActive) {
        AnswerActive.classList.remove('.review-quiz-answer-active');
      }
      event.target.classList.add('.review-quiz-answer-active');
    }
  };

  return Review;
});
