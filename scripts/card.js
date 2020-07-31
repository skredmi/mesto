import {openPopup, closePopup} from './utils.js';

export class Card {
    constructor (name, link, templateElements) {
        this._name = name;
        this._link = link;
        this._templateElements = templateElements;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateElements)
        .content
        .querySelector('.elements__item')
        .cloneNode(true);
        
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._placePhoto = this._element.querySelector('.elements__image');
        this._titlePhoto = this._element.querySelector('.elements__title');
        this._placePhoto.src = this._link;
        this._titlePhoto.textContent = this._name;
        this._placePhoto.alt = this._name;
        this._addCardListener();

        return this._element;
    }

    _setLike (evt) {
        evt.target.classList.toggle('elements__like_active');
    }
        
    _deleteCard (evt) {
        evt.target.closest('.elements__item').remove();
    }

    _openPopupPhoto (evt) {
        this._element = evt.target.closest('.elements__item');
        this._placeElement = event.target.closest('.elements__image');
        this._placePhoto = document.querySelector('.popup-photo__place');
        this._titlePhoto = document.querySelector('.popup-photo__title');
        const popupPhoto = document.querySelector('.popup-photo');
        this._titlePhoto.textContent = this._element.textContent;
        this._placePhoto.src = this._placeElement.src;
        this._placePhoto.alt = this._element.textContent;
        openPopup(popupPhoto);
    }

    _addCardListener() {
        this._element.querySelector('.elements__button').addEventListener('click', this._deleteCard);
        this._element.querySelector('.elements__like').addEventListener('click', this._setLike);
        this._element.querySelector('.elements__image').addEventListener('click', this._openPopupPhoto);
    }
}
