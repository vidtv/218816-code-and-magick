'use strict';

define([
  './form',
  './game',
  './draw-reviews-list',
  './gallery'
], function(form, Game, Gallery) {
  var game = new Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(Game.Verdict.INTRO);

  var formOpenButton = document.querySelector('.reviews-controls-new');

  /** @param {MouseEvent} evt */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();

    form.open(function() {
      game.setGameStatus(Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };

  form.onClose = function() {
    game.setDeactivated(false);
  };

  var photoGallery = document.querySelector('.photogallery');

  // заполняем массив pictures ссылками на изображения в галерее
  var photos = photoGallery.querySelectorAll('a > img');
  var pictures = [];

  for(var i = 0; i < photos.length; i++) {
    pictures.push(photos[i].src);
  }

  // создаем новый объект галереи
  var gallery = new Gallery(pictures);

  // коллекция ссылок на фото
  var linksGallery = photoGallery.querySelectorAll('a');

  // коллекция, преобразованная в массив
  var linksGalleryArray = Array.prototype.slice.call(linksGallery);

  // обработчик клика по изображению(?) в галерее
  var galleryOnClick = function(evt) {
    for (i = 0; i < linksGalleryArray.length; i++) {
      if(evt.target.src === pictures[i]) {
        gallery.show(i + 1);
      }
    }
  };

  // применяем этот обработчик при клике на изображение (?)
  linksGalleryArray.forEach(function(galleryImg) {
    galleryImg.addEventListener('click', galleryOnClick);
  });

});
