import { Popup } from './popup.js';

export class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._element.querySelector('.popup__container');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true);
            this._handleFormSubmit(this._getInputValues());
        });
    }

    reset() {
        this._form = this._element.querySelector('.popup__container');
        this._form.reset();
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._form.querySelector('.popup__button-save').textContent = 'Сохранение...';
        } else {
            this._form.querySelector('.popup__button-save').textContent = 'Сохранить';
        }
    }
}