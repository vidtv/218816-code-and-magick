'use strict';

define(function() {

  function Review(data) {
    this.data = data;

    var reviewTemplate = document.querySelector('template');
    var elementToClone;
    if('content' in reviewTemplate) {
      elementToClone = reviewTemplate.content.querySelector('.review');
    } else {
      elementToClone = reviewTemplate.querySelector('.review');
    }
    this.element = elementToClone.cloneNode(true);
  }

  var reviewQuiz = document.querySelectorAll('.review-quiz-answer');

  Review.prototype.addReviewAnswerActive = function() {
    reviewQuiz.classList.add('.review-quiz-answer-active');
  };

  Array.prototype.forEach.call(reviewQuiz, function(quiz) {
    quiz.addEventListener('click', this.addReviewAnswerActive);
  });

  Review.prototype.remove = function() {
    for(var i = 0; i < reviewQuiz.length; i++) {
      reviewQuiz[i].removeEventListener('click', this.addReviewAnswerActive);
    }
  };

  return Review;
});
