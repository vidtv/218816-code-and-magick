'use strict';

var HTTP_REQUEST_URL = 'http://localhost:1506/api/reviews';

define([
  './load',
  './make-review'
], function(load, renderReview) {
  var REVIEW_COUNT = 3;
  var moreReviewsButton = document.querySelector('.reviews-controls-more');
  var loadReviews = function(currentReview) {
    load(HTTP_REQUEST_URL, {
      from: currentReview,
      to: currentReview + REVIEW_COUNT
    }, renderReview);
  };
  moreReviewsButton.addEventListener('click', function() {
    var currentReviewNumber = 0;
    loadReviews(currentReviewNumber += REVIEW_COUNT);
  });
});
