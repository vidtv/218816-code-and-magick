'use strict';

define(['./review'], function(Review) {
  return function(data) {
    // прячем блок с фильтром отзывов
    var reviewFilter = document.querySelector('.reviews-filter');
    reviewFilter.classList.add('invisible');

    var newReview = new Review(data);
    var reviewMark = newReview.element.querySelector('.review-rating');
    var reviewDescription = newReview.element.querySelector('.review-text');
    var RATING_STAR_WIDTH = 40;
    reviewDescription.textContent = data.description;
    reviewMark.style.width = RATING_STAR_WIDTH * data.rating + 'px';

    reviewFilter.classList.remove('invisible');
  };
});
