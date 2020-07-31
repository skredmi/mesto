import {initialCards} from './initial-сards.js';
import {openPopup, closePopup} from './utils.js';
import {Card} from './card.js';
import {FormValidator} from './formValidator.js';

const popupEdit = document.querySelector('.popup_edit');
const popupCloseEdit = popupEdit.querySelector('.popup__button-close');
const popupAdd = document.querySelector('.popup_add');
const popupCloseAdd = popupAdd.querySelector('.popup__button-close');
const popupPhoto = document.querySelector('.popup-photo');
const popupClosePhoto = popupPhoto.querySelector('.popup__button-close');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const listElement = document.querySelector('.elements__list');
const templateElement = document.querySelector('.elements-template');
const name = document.querySelector ('.profile__title');
const job = document.querySelector ('.profile__subtitle');
const nameInput = document.querySelector ('.popup__name');
const jobInput = document.querySelector ('.popup__about');
const placeInput = document.querySelector('.popup__place');
const linkInput = document.querySelector('.popup__link');
const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const formValidatorProfile = new FormValidator(config, popupEdit);
const formValidatorAdd = new FormValidator(config, popupAdd);
formValidatorProfile.enableValidation();
formValidatorAdd.enableValidation();


//закрытие попапа по клику оверлей
function overlayClosePopup (evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.target !== evt.currentTarget) {
        return;
    }
    openedPopup.classList.remove('popup_opened');
}

popupEdit.addEventListener ('click', overlayClosePopup);
popupAdd.addEventListener ('click', overlayClosePopup);
popupPhoto.addEventListener ('click', overlayClosePopup);

// закрытие попапа с фото
popupClosePhoto.addEventListener ('click', () => closePopup(popupPhoto));

//добавление карточек в контейнер
function addCard ({name, link}) {
    const card = new Card(name, link, '.elements-template');
    const cardElement = card.generateCard();
    document.querySelector('.elements__list').prepend(cardElement);
}

// добавление карточек на страницу
initialCards.forEach( item => {
    addCard(item);
});

// открытие формы редактирования профиля
function profilePopup() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    openPopup(popupEdit);
    formValidatorProfile.cleanError();
}
buttonEdit.addEventListener ('click', profilePopup);

//применение введенных значение в профиле
function profileFormSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupEdit);
}
popupEdit.addEventListener('submit', profileFormSubmitHandler);
popupCloseEdit.addEventListener ('click', () => closePopup(popupEdit));

//добавление карточки в попапе
function cardFormSubmitHandler (evt) {
    evt.preventDefault();
    const name = placeInput.value;
    const link = linkInput.value;
    addCard ({name, link});
    closePopup(popupAdd);
}
popupAdd.addEventListener('submit', cardFormSubmitHandler);
popupCloseAdd.addEventListener ('click', () => closePopup(popupAdd));

//открытие формы добавления карточек
function openAddCardPopup() {
    placeInput.value = '';
    linkInput.value = '';
    openPopup(popupAdd);
    formValidatorAdd.cleanError();    
}
buttonAdd.addEventListener ('click', openAddCardPopup);
