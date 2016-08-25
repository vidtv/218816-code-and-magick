'use strict';

var HTTP_REQUEST_URL = 'http://localhost:1506/api/reviews';

define([
  'load',
  'get-review-element',
], function(load, getReviewElement) {

  load(HTTP_REQUEST_URL, function(data) {
    data.forEach(getReviewElement());
  });
});
