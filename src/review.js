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

  function Review(data) {
    this.data = data;
    this.element = elementToClone.cloneNode(true);
    this.Yes = this.element.querySelector('.review-quiz-answer-yes');
    this.No = this.element.querySelector('.review-quiz-answer-no');

    this.Yes.addEventListener('click', this.makeReviewAnswerActive);
    this.No.addEventListener('click', this.makeReviewAnswerActive);
    //this.reviewQuiz = this.element.querySelector('.review-quiz');
  }

  Review.prototype.makeReviewAnswerActive = function(event) {
    var AnswerActive = this.element.querySelector('.review-quiz-answer-active');
    if(event.target.classList.contains('review-quiz-answer')) {
      if(AnswerActive) {
        AnswerActive.classList.remove('review-quiz-answer-active');
      }
      event.target.classList.add('review-quiz-answer-active');
    }
  };

  var IMAGE_SIZE = 124;
  var IMAGE_LOAD_TIMER = 4000;

  // добавляем контейнер с отзывами
  var reviewsContainer = document.querySelector('.reviews-list');

  var reviewAuthor = this.element.querySelector('.review-author');
  var reviewAuthorImage = new Image(IMAGE_SIZE, IMAGE_SIZE);
  this.element.replaceChild(reviewAuthorImage, reviewAuthor);
  reviewAuthorImage.classList.add('review-author');
  var reviewImageLoadTimeout;

  reviewAuthorImage.onload = function() {
    clearTimeout(reviewImageLoadTimeout);
    reviewAuthorImage.src = this.data.author.picture;
    reviewAuthorImage.title = this.data.author.name;
  };

  reviewAuthorImage.onerror = function() {
    this.element.classList.add('review-load-failure');
  };

  reviewAuthorImage.src = this.data.author.picture;

  reviewImageLoadTimeout = setTimeout(function() {
    reviewAuthorImage.removeAttribute('src');
    this.element.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMER);

  reviewsContainer.appendChild(this.element);

  return Review;
});
