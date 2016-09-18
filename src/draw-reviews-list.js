'use strict';

var HTTP_REQUEST_URL = 'http://localhost:1506/api/reviews';

define([
  './load',
  './make-review'
], function(load, renderReview) {
  var PAGE_SIZE = 3;
  var pageNumber = 0;
  var activeFilter = 'reviews-all';
  var allReviews = document.querySelector('.reviews-list');
  var reviewFilter = document.querySelector('.reviews-filter');
  var moreReviewsButton = document.querySelector('.reviews-controls-more');

  var renderingReview = function(data) {
    var reviews = data;
    if(reviews.length !== PAGE_SIZE) {
      moreReviewsButton.classList.add('invisible');
    }
    data.forEach(renderReview);
  };

  var loadReviews = function(currentPageNumber, filter) {
    load(HTTP_REQUEST_URL, {
      from: currentPageNumber * PAGE_SIZE,
      to: currentPageNumber * PAGE_SIZE + PAGE_SIZE,
      filter: filter
    }, renderingReview);
    moreReviewsButton.classList.remove('invisible');
  };

  var changeFilter = function(filterID) {
    allReviews.innerHTML = '';
    activeFilter = filterID;
    pageNumber = 0;
    loadReviews(pageNumber, activeFilter);
  };

  loadReviews(pageNumber, activeFilter);

  moreReviewsButton.addEventListener('click', function() {
    loadReviews(++pageNumber, activeFilter);
  });

  reviewFilter.addEventListener('change', function(evt) {
    if(evt.target.name === 'reviews') {
      changeFilter(evt.target.id);
    }
  });
});
