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
function getReviewElement(data, container) {
  var reviewElement = elementToClone.cloneNode(true);
  var reviewMark = reviewElement.querySelector('.review-rating');
  var reviewDescription = reviewElement.querySelector('.review-text');
  var reviewAuthor = reviewElement.querySelector('.review-author');
  var IMAGE_SIZE = 124;
  var IMAGE_LOAD_TIMER = 4000;
  var RATING_STAR_WIDTH = 40;

  reviewDescription.textContent = data.description;
  reviewMark.style.width = RATING_STAR_WIDTH * data.rating + 'px';

  var reviewAuthorImage = new Image(IMAGE_SIZE, IMAGE_SIZE);
  reviewElement.replaceChild(reviewAuthorImage, reviewAuthor);
  reviewAuthorImage.classList.add('review-author');
  var reviewImageLoadTimeout;

  reviewAuthorImage.onload = function() {
    clearTimeout(reviewImageLoadTimeout);
    reviewAuthorImage.src = data.author.picture;
    reviewAuthorImage.title = data.author.name;
  };

  reviewAuthorImage.onerror = function() {
    reviewAuthorImage.removeAttribute('src');
    reviewElement.classList.add('review-load-failure');
  };

  reviewAuthorImage.src = data.author.picture;

  reviewImageLoadTimeout = setTimeout(function() {
    reviewAuthorImage.src = '';
    reviewElement.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMER);

  container.appendChild(reviewElement);
}

function render(data) {
  data.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
}

// вызываем функцию отрисовки как коллбек
load(HTTP_REQUEST_URL, render);

// обратно показываем блок с фильтрами отзывов
reviewFilter.classList.remove('invisible');
