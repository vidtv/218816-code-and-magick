'use strict';

module.exports = function(list, filterID) {

  var filters = {
    ALL: 'reviews-all',
    RECENT: 'reviews-recent',
    GOOD: 'reviews-good',
    BAD: 'reviews-bad',
    POPULAR: 'reviews-popular'
  };

  var MS_IN_THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

  switch(filterID) {
    case filters.ALL:
      return list;

    case filters.RECENT:
      return list.filter(function(review) {
        return Date.now() - review.created < MS_IN_THREE_DAYS;
      }).sort(function(a, b) {
        return b.created - a.created;
      });

    case filters.GOOD:
      return list.filter(function(review) {
        return review.rating >= 3;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });

    case filters.BAD:
      return list.filter(function(review) {
        return review.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });

    case filters.POPULAR:
      return list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
  }

  return list;
};
