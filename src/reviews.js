'use strict';

function load(url, callback) {
  var scriptEl = document.createElement('script');
  var options = url.indexOf('?') !== -1 ? '&' : '?';
  var cbJSONP = 'cb' + String(Math.random()).slice(-6);
  scriptEl.src = url + options + 'callback=' + cbJSONP;
  document.body.appendChild(scriptEl);

  window[cbJSONP] = function(data) {
    callback(data);
    document.body.removeChild(scriptEl);
    delete window[cbJSONP];
  };
}

var HTTP_REQUEST_URL = 'http://localhost:1506/api/reviews';

// прячем блок с фильтром отзывов
var reviewFilter = document.querySelector('.reviews-filter');
reviewFilter.classList.add('invisible');

// добавляем контейнер с отзывами
var reviewsContainer = document.querySelector('.reviews-list');
var reviewTemplate = document.querySelector('template');
var elementToClone;

if('content' in reviewTemplate) {
  elementToClone = reviewTemplate.content.querySelector('.review');
} else {
  elementToClone = reviewTemplate.querySelector('.review');
}

/*
функция отрисовки отзывов
*/
var getReviewElement = function(data, container) {
  var reviewElement = elementToClone.cloneNode(true);
  var reviewAuthor = reviewElement.querySelector('.review-author');
  var reviewMark = reviewElement.querySelector('.review-rating');
  var reviewDescription = reviewElement.querySelector('.review-text');
  var IMAGE_SIZE = 124;
  var RATING_STAR_WIDTH = 40;

  reviewDescription.textContent = data.description;
  reviewAuthor.title = data.author.name;
  reviewMark.style.width = RATING_STAR_WIDTH * data.rating + 'px';

  var reviewAuthorImage = new Image();

  reviewAuthorImage.onload = function() {
    reviewAuthor.src = data.author.image;
    reviewAuthor.style.width = IMAGE_SIZE;
    reviewAuthor.style.height = IMAGE_SIZE;
  };

  reviewAuthorImage.onerror = function() {
    reviewElement.classList.add('.review-load-failure');
  };
  reviewAuthor.src = data.author.picture;

  container.appendChild(reviewElement);
  return reviewElement;
};

function render(data) {
  data.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
}

// вызываем функцию отрисовки как коллбек
load(HTTP_REQUEST_URL, render);

// обратно показываем блок с фильтрами отзывов
reviewFilter.classList.remove('invisible');
