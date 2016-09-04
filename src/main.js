'use strict';

define([
  './form',
  './game',
  './gallery',
  './draw-reviews-list'
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

  // заполняем массив pictures ссылками на изображения в галерее
  var photos = document.querySelectorAll('.photogallery > a > img');
  var pictures = [];

  for(var i = 0; i < photos.length; i++) {
    pictures.push(photos[i].src);
  }

  // создаем новый объект галереи
  var gallery = new Gallery(pictures);
  var linksGallery = document.querySelectorAll('.photogallery-image');

  Array.prototype.forEach.call(linksGallery, function(link, k) {
    link.addEventListener('click', function() {
      gallery.show(k + 1);
    });
  });

});
