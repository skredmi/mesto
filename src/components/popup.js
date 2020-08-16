export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._element = document.querySelector(popupSelector);
    }

    open() {
        this._element.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _overlayClosePopup = (evt) => {
        if (evt.target !== evt.currentTarget) {
            return;
        }
        this.close();
    }

    setEventListeners() {
        this._element.querySelector('.popup__button-close').addEventListener('click', () => this.close());
        this._element.addEventListener('click', this._overlayClosePopup);
    }
}