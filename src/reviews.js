'use strict';

var callbackGetData = function(data) {
  window.reviews = data;
};

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

load(HTTP_REQUEST_URL, callbackGetData);

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
  var element = elementToClone.cloneNode(true);
  var IMAGE_SIZE = 124;

  element.querySelector('.review-author').textContent = data.name;
  element.querySelector('.review-text').textContent = data.description;
  element.querySelector('.review-rating').textContent = data.rating;

  var authorImage = new Image(IMAGE_SIZE, IMAGE_SIZE);

  authorImage.onload = function(evt) {
    authorImage.src = '\'' + evt.target.src + '\'';
  };

  authorImage.onerror = function() {
    authorImage.classList.add('.review-load-failure');
  };
  authorImage.src = data.picture;

  container.appendChild(element);

  return element;

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
