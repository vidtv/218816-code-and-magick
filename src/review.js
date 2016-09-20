'use strict';

define(function() {

  var RATING_STAR_WIDTH = 40;
  var IMAGE_SIZE = 124;
  var reviewTemplate = document.querySelector('template');
  var elementToClone = (reviewTemplate.content || reviewTemplate).querySelector('.review');

  function Review(data) {
    this.data = data;
    this.element = elementToClone.cloneNode(true);
    this.yes = this.element.querySelector('.review-quiz-answer-yes');
    this.no = this.element.querySelector('.review-quiz-answer-no');
    this.reviewAuthor = this.element.querySelector('.review-author');
    this.reviewMark = this.element.querySelector('.review-rating');
    this.reviewDescription = this.element.querySelector('.review-text');

    this.reviewImage = new Image(IMAGE_SIZE, IMAGE_SIZE);

    this.yes.addEventListener('click', this.makeReviewAnswerActive.bind(this));
    this.no.addEventListener('click', this.makeReviewAnswerActive.bind(this));

    this.addClassesToReviewImage = this.addClassesToReviewImage.bind(this);
  }

  Review.prototype.makeReviewAnswerActive = function(event) {
    var answerActive = this.element.querySelector('.review-quiz-answer-active');
    if(answerActive) {
      answerActive.classList.remove('review-quiz-answer-active');
    }
    if(event.target !== answerActive) {
      event.target.classList.add('review-quiz-answer-active');
    }
  };

  // добавляем отзывы
  Review.prototype.addNewReview = function() {
    this.reviewsContainer = document.querySelector('.reviews-list');

    this.reviewDescription.textContent = this.data.description;
    this.reviewMark.style.width = RATING_STAR_WIDTH * this.data.rating + 'px';
    //var self = this;

    this.addClassesToReviewImage();
    //this.addClassesToReviewImage.bind(this);
    this.reviewsContainer.appendChild(this.element);
  };

  Review.prototype.addClassesToReviewImage = function() {
    function LoadOrNot(notFail) {
      if(notFail) {
        this.reviewImage.title = this.data.author.name;
      } else {
        this.reviewImage.src = '';
        this.element.classList.add('review-load-failure');
      }
    }
    this.funcCheckLoad(this.data.author.picture, LoadOrNot.bind(this));
  };

  Review.prototype.funcCheckLoad = function(src, callBack) {
    this.element.replaceChild(this.reviewImage, this.reviewAuthor);
    this.reviewImage.classList.add('review-author');
    this.reviewImage.onload = function() {
      callBack(true);
    };
    this.reviewImage.onerror = function() {
      callBack(false);
    };
    this.reviewImage.src = src;
  };

  return Review;
});
