'use strict';

define(['./review'], function(Review) {
  return function(data) {
    // прячем блок с фильтром отзывов
    var reviewFilter = document.querySelector('.reviews-filter');
    reviewFilter.classList.add('invisible');
      // добавляем контейнер с отзывами
    var reviewsContainer = document.querySelector('.reviews-list');

    var newReview = new Review(data);
    var reviewMark = newReview.element.querySelector('.review-rating');
    var reviewDescription = newReview.element.querySelector('.review-text');
    var reviewAuthor = newReview.element.querySelector('.review-author');
    var IMAGE_SIZE = 124;
    var IMAGE_LOAD_TIMER = 4000;
    var RATING_STAR_WIDTH = 40;

    reviewDescription.textContent = data.description;
    reviewMark.style.width = RATING_STAR_WIDTH * data.rating + 'px';

    var reviewAuthorImage = new Image(IMAGE_SIZE, IMAGE_SIZE);
    newReview.element.replaceChild(reviewAuthorImage, reviewAuthor);
    reviewAuthorImage.classList.add('review-author');
    var reviewImageLoadTimeout;

    reviewAuthorImage.onload = function() {
      clearTimeout(reviewImageLoadTimeout);
      reviewAuthorImage.src = data.author.picture;
      reviewAuthorImage.title = data.author.name;
    };

    reviewAuthorImage.onerror = function() {
      newReview.element.classList.add('review-load-failure');
    };

    reviewAuthorImage.src = data.author.picture;

    reviewImageLoadTimeout = setTimeout(function() {
      reviewAuthorImage.removeAttribute('src');
      newReview.element.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMER);

    reviewsContainer.appendChild(newReview.element);
    reviewFilter.classList.remove('invisible');
  };
});
