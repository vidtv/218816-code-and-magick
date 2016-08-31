'use strict';

define(function() {

  function Gallery(pictures) {
    var self = this;
    this.activePicture = 0;
    this.galleryElement = document.querySelector('.overlay-gallery');
    this.galleryToggleLeft = document.querySelector('.overlay-gallery-control-left');
    this.galleryToggleRight = document.querySelector('.overlay-gallery-control-right');
    this.galleryCurrentNumber = document.querySelector('.preview-number-current');
    this.galleryPicturesCount = document.querySelector('.preview-number-total');
    this.galleryClose = document.querySelector('.overlay-gallery-close');

    this.galleryPicturesCount.innerHTML = pictures.length;

    this.galleryClose.onclick = function() {
      self.onCloseClick();
    };
  }

  var photoGallery = document.querySelector('.photogallery');

  // функция для появления блока фотогалереи
  var makeGalleryVisible = function() {
    this.galleryElement.classList.remove('invisible');
  };

  // пролистывание фотогалереи влево
  var listGalleryLeft = function() {
    this.setActivePicture(this.activePicture - 1);
  };

  // пролистывание фотогалереи вправо
  var listGalleryRight = function() {
    this.setActivePicture(this.activePicture + 1);
  };

  // показ фотогалереи
  Gallery.prototype.show = function(pictureNumber) {
    photoGallery.addEventListener('click', makeGalleryVisible);
    this.galleryToggleLeft.addEventListener('click', listGalleryLeft);
    this.galleryToggleRight.addEventListener('click', listGalleryRight);
    this.setActivePicture(pictureNumber);
  };

  // спрятать фотогалерею
  Gallery.prototype.hide = function() {
    this.galleryElement.classList.add('invisible');
    this.galleryToggleLeft.removeEventListener('click', listGalleryLeft);
    this.galleryToggleRight.removeEventListener('click', listGalleryRight);
    this.galleryClose.onclick = null;
    photoGallery.removeEventListener('click', makeGalleryVisible);
  };

  Gallery.prototype.setActivePicture = function(pictureNumber) {
    this.activePicture = pictureNumber;
    var currentPicture = new Image();
    currentPicture.src = this.pictures[pictureNumber - 1];
    var galleryPicturePreview = document.querySelector('.overlay-gallery-preview');
    var oldPicture = galleryPicturePreview.querySelector('img');
    if (oldPicture) {
      galleryPicturePreview.replaceChild(currentPicture, oldPicture);
    }
    galleryPicturePreview.appendChild(currentPicture);
    this.galleryCurrentNumber.innerHTML = pictureNumber;
  };

  return Gallery;
});
