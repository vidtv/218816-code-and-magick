'use strict';

define(function() {

  function Gallery(pictures) {
    var self = this;
    this.pictures = pictures;
    this.activePicture = 1;
    this.galleryElement = document.querySelector('.overlay-gallery');
    this.galleryToggleLeft = document.querySelector('.overlay-gallery-control-left');
    this.galleryToggleRight = document.querySelector('.overlay-gallery-control-right');
    this.galleryCurrentNumber = document.querySelector('.preview-number-current');
    this.galleryPicturesCount = document.querySelector('.preview-number-total');
    this.galleryClose = document.querySelector('.overlay-gallery-close');
    this.photoGallery = document.querySelector('.photogallery');

    this.galleryPicturesCount.innerHTML = pictures.length;

    this.galleryClose.onclick = function() {
      self.hide();
    };
  }

  // функция для появления блока фотогалереи
  Gallery.prototype.makeGalleryVisible = function() {
    this.galleryElement.classList.remove('invisible');
  };

  // пролистывание фотогалереи влево
  Gallery.prototype.listGalleryLeft = function() {
    if (this.activePicture > 1) {
      this.setActivePicture(this.activePicture - 1);
    }
  };

  // пролистывание фотогалереи вправо
  Gallery.prototype.listGalleryRight = function() {
    if(this.activePicture < this.pictures.length) {
      this.setActivePicture(this.activePicture + 1);
    }
  };

  // показ фотогалереи
  Gallery.prototype.show = function(pictureNumber) {
    var self = this;

    this.photoGallery.onclick = function(event) {
      self.makeGalleryVisible();
      if(event.target !== 'img') {
        return;
      }
    };

    this.galleryToggleLeft.onclick = function() {
      self.listGalleryLeft();
    };

    this.galleryToggleRight.onclick = function() {
      self.listGalleryRight();
    };

    this.setActivePicture(pictureNumber);
  };

  // спрятать фотогалерею
  Gallery.prototype.hide = function() {
    this.galleryElement.classList.add('invisible');
    this.galleryToggleLeft.onclick = null;
    this.galleryToggleRight.onclick = null;
    this.photoGallery.onclick = null;
  };

  // установка текущей просматриваемой фотографии
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
