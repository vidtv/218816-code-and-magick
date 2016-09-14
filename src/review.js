'use strict';

define(function() {
  var reviewTemplate = document.querySelector('template');
  var elementToClone = (reviewTemplate.content || reviewTemplate).querySelector('.review');

  function Review(data) {
    this.data = data;
    this.element = elementToClone.cloneNode(true);
    this.Yes = this.element.querySelector('.review-quiz-answer-yes');
    this.No = this.element.querySelector('.review-quiz-answer-no');
    this.reviewAuthor = this.element.querySelector('.review-author');
    this.reviewMark = this.element.querySelector('.review-rating');
    this.reviewDescription = this.element.querySelector('.review-text');

    this.Yes.addEventListener('click', this.makeReviewAnswerActive.bind(this));
    this.No.addEventListener('click', this.makeReviewAnswerActive.bind(this));
  }

  Review.prototype.makeReviewAnswerActive = function(event) {
    var answerActive = this.element.querySelector('.review-quiz-answer-active');
    if(event.target.classList.contains('review-quiz-answer')) {
      if(answerActive) {
        answerActive.classList.remove('review-quiz-answer-active');
      }
      if(event.target !== answerActive) {
        event.target.classList.add('review-quiz-answer-active');
      }
    }
  };

  var RATING_STAR_WIDTH = 40;
  var IMAGE_SIZE = 124;
  var IMAGE_LOAD_TIMER = 4000;

  // добавляем отзывы
  Review.prototype.addNewReview = function() {
    var reviewsContainer = document.querySelector('.reviews-list');

    this.reviewDescription.textContent = this.data.description;
    this.reviewMark.style.width = RATING_STAR_WIDTH * this.data.rating + 'px';

    var reviewAuthorImage = new Image(IMAGE_SIZE, IMAGE_SIZE);
    this.element.replaceChild(reviewAuthorImage, this.reviewAuthor);
    reviewAuthorImage.classList.add('review-author');
    var reviewImageLoadTimeout;

    var self = this;
    reviewAuthorImage.onload = function() {
      clearTimeout(reviewImageLoadTimeout);
      reviewAuthorImage.src = self.data.author.picture;
      reviewAuthorImage.title = self.data.author.name;
    };

    reviewAuthorImage.onerror = function() {
      self.element.classList.add('review-load-failure');
    };

    reviewAuthorImage.src = this.data.author.picture;

    reviewImageLoadTimeout = setTimeout(function() {
      reviewAuthorImage.removeAttribute('src');
      self.element.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMER);

    reviewsContainer.appendChild(this.element);
  };

  return Review;
});
