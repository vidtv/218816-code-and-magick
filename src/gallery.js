'use strict';

define(function() {

  function Gallery(pictures) {
    this.pictures = pictures;
    this.activePicture = 1;
    this.galleryElement = document.querySelector('.overlay-gallery');
    this.galleryToggleLeft = document.querySelector('.overlay-gallery-control-left');
    this.galleryToggleRight = document.querySelector('.overlay-gallery-control-right');
    this.galleryCurrentNumber = document.querySelector('.preview-number-current');
    this.galleryPicturesCount = document.querySelector('.preview-number-total');
    this.galleryClose = document.querySelector('.overlay-gallery-close');
    this.galleryPicturesCount.innerHTML = pictures.length;

    this.galleryToggleLeft.addEventListener('click', this.listGalleryLeft.bind(this));
    this.galleryToggleRight.addEventListener('click', this.listGalleryRight.bind(this));
    this.galleryClose.addEventListener('click', this.hide.bind(this));
  }

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
    this.setActivePicture(pictureNumber);
    this.galleryElement.classList.remove('invisible');
  };

  // спрятать фотогалерею
  Gallery.prototype.hide = function() {
    this.galleryElement.classList.add('invisible');
    this.galleryToggleLeft.removeEventListener('click', this.listGalleryLeft);
    this.galleryToggleRight.removeEventListener('click', this.listGalleryRight);
    this.galleryClose.removeEventListener('click', this.hide);
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
