import { Popup } from './popup.js';
export class PopupDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setSubmitHandler(handler) {
        this._handleFormSubmit = handler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._element.querySelector('.popup__container').addEventListener('submit', (event) => {
            event.preventDefault();
            if (this._handleFormSubmit) {
                this._handleFormSubmit();
            }
        });
    }
}