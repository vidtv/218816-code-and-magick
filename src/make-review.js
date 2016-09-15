'use strict';

define(['./review'], function(Review) {
  return function(data) {
    // прячем блок с фильтром отзывов
    var reviewFilter = document.querySelector('.reviews-filter');
    reviewFilter.classList.add('invisible');

    var newReview = new Review(data);

    newReview.addNewReview();

    reviewFilter.classList.remove('invisible');
  };
});
