export class Card {
    constructor({ data, handleCardClick, handleCardDelete, handleLikeDelete, handleLikeAdd, userId }, templateElements) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleLikeDelete = handleLikeDelete;
        this._handleLikeAdd = handleLikeAdd;
        this._userId = userId;
        this._templateElements = templateElements;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateElements)
            .content.querySelector('.elements__item')
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
        if (this._ownerId !== this._userId) {
            this._element.querySelector('.elements__button').style.display = 'none';
        };
        this._element.querySelector('.elements__like-count').textContent = this._likes.length;
        if (this._likes.find(item => item._id === this._userId)) {
            this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active')
        }
        return this._element;
    }

    _handleLikeCard() {
        this._like = this._element.querySelector('.elements__like-button');
        if (this._like.classList.contains('elements__like-button_active')) {
            this._element.querySelector('.elements__like-count').textContent = this._likes.length -= 1;
            this._like.classList.remove('elements__like-button_active');
            this._handleLikeDelete(this._cardId);
        } else {
            this._like.classList.add('elements__like-button_active');
            this._element.querySelector('.elements__like-count').textContent = this._likes.length += 1;
            this._handleLikeAdd(this._cardId);
        }
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _addCardListener() {
        this._element.querySelector('.elements__button').addEventListener('click', () => this._handleCardDelete());
        this._element.querySelector('.elements__like-button').addEventListener('click', () => this._handleLikeCard());
        this._element.querySelector('.elements__image').addEventListener('click', () => this._handleCardClick());
    }
}