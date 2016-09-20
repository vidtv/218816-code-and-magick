'use strict';

var HTTP_REQUEST_URL = 'http://localhost:1506/api/reviews';

define([
  './load',
  './make-review'
], function(load, renderReview) {
  var PAGE_SIZE = 3;
  var pageNumber = 0;
  var activeFilter;
  var allReviews = document.querySelector('.reviews-list');
  var reviewFilter = document.querySelector('.reviews-filter');
  var moreReviewsButton = document.querySelector('.reviews-controls-more');
  var reviewFilterVariants = reviewFilter.elements.namedItem('reviews');

  function renderingReview(data) {
    var reviews = data;
    if(reviews.length !== PAGE_SIZE) {
      moreReviewsButton.classList.add('invisible');
    }
    data.forEach(renderReview);
  }

  function loadReviews(currentPageNumber, filter) {
    load(HTTP_REQUEST_URL, {
      from: currentPageNumber * PAGE_SIZE,
      to: currentPageNumber * PAGE_SIZE + PAGE_SIZE,
      filter: filter
    }, renderingReview);
    moreReviewsButton.classList.remove('invisible');
  }

  function changeFilter(filterID) {
    allReviews.innerHTML = '';
    activeFilter = filterID;
    pageNumber = 0;
    loadReviews(pageNumber, activeFilter);
  }

  function loadReviewsAfterRefresh() {
    activeFilter = localStorage.getItem('filter') || 'reviews-all';
    reviewFilterVariants.value = activeFilter;
    loadReviews(pageNumber, activeFilter);
  }

  loadReviewsAfterRefresh();

  moreReviewsButton.addEventListener('click', function() {
    loadReviews(++pageNumber, activeFilter);
  });

  reviewFilter.addEventListener('change', function(evt) {
    if(evt.target.name === 'reviews') {
      changeFilter(evt.target.id);
      localStorage.setItem('filter', evt.target.id);
    }
  });
});
