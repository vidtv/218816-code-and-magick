'use strict';

define(function() {
  var reviewTemplate = document.querySelector('template');
  var elementToClone = (reviewTemplate || reviewTemplate.content).querySelector('.review');

  function Review(data) {
    this.data = data;
    this.element = elementToClone.cloneNode(true);
  }

  var reviewQuiz = document.querySelectorAll('.review-quiz-answer');

  Review.prototype.addReviewAnswerActive = function() {
    reviewQuiz.classList.add('.review-quiz-answer-active');
  };

  Review.prototype.makeReviewAnswerActive = function() {
    var self = this;
    reviewQuiz.onclick = function() {
      self.addReviewAnswerActive();
    };
  };

  Review.prototype.removeReviewAnswerActive = function() {
    reviewQuiz.classList.remove('.review-quiz-answer-active');
  };

  Review.prototype.makeReviewAnswerActive = function() {
    var self = this;
    reviewQuiz.onclick = function() {
      self.removeReviewAnswerActive();
    };
  };

  return Review;
});
