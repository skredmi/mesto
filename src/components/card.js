export class Card {
    constructor ({data, handleCardClick}, templateElements) {
        this._name = data.name;
        this._link = data.link;
        this._templateElements = templateElements;
        this._handleCardClick = handleCardClick;
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

    _addCardListener() {
        this._element.querySelector('.elements__button').addEventListener('click', this._deleteCard);
        this._element.querySelector('.elements__like').addEventListener('click', this._setLike);
        this._element.querySelector('.elements__image').addEventListener('click', this._handleCardClick);
    }
}