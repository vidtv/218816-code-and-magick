'use strict';

var HTTP_REQUEST_URL = 'http://localhost:1506/api/reviews';

define([
  './load',
  './make-review'
], function(load, renderReview) {
  load(HTTP_REQUEST_URL, function(data) {
    data.forEach(renderReview);
  });
});
