import {Popup} from './popup.js';

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
    }

    _setEventListeners () {
        super.setEventListeners();
    }

    open (name, link) {
        super.open();
        this._placePhoto = document.querySelector('.popup-photo__place');
        this._titlePhoto = document.querySelector('.popup-photo__title');
        this._titlePhoto.textContent = name;
        this._placePhoto.src = link;
        this._placePhoto.alt = name;
    }
}