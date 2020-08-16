import { initialCards, config } from '../utils/constants.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import { Card } from '../components/card.js';
import { FormValidator } from '../components/formValidator.js';
import { Section } from '../components/section.js';
import { UserInfo } from '../components/userInfo.js';
import '../pages/index.css';

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__about');
const templateElement = '.elements-template';

// валидация
const formValidatorProfile = new FormValidator(config, popupEdit);
const formValidatorAdd = new FormValidator(config, popupAdd);
formValidatorProfile.enableValidation();
formValidatorAdd.enableValidation();

//добавление карточек на страницу
const containerSelector = '.elements__list';
const popupImage = new PopupWithImage('.popup-photo');
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: () => {
                popupImage.open(item.name, item.link)
            }
        },
            templateElement);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    },
},
    containerSelector
);
cardList.renderItems();
popupImage.setEventListeners();

// попап редактирования профиля
const popupEditSelector = '.popup_edit';
const userProfile = new UserInfo(name, job);

const popupEditForm = new PopupWithForm({
    popupSelector: popupEditSelector,
    handleFormSubmit: (inputValues) => {
        userProfile.setUserInfo(inputValues.name, inputValues.job);
    },
});
buttonEdit.addEventListener('click', () => {
    const profileInfo = userProfile.getUserInfo();
    nameInput.value = profileInfo.name;
    jobInput.value = profileInfo.job;
    popupEditForm.open();
    formValidatorProfile.cleanError();
});
popupEditForm.setEventListeners();

//попап добавления карточек
const popupAddSelector = '.popup_add';
const popupAddForm = new PopupWithForm({
    popupSelector: popupAddSelector,
    handleFormSubmit: item => {
        const card = new Card({
            data: item,
            handleCardClick: () => {
                popupImage.open(item.name, item.link)
            }
        },
            templateElement);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
});

buttonAdd.addEventListener('click', () => {
    popupAddForm.reset();
    popupAddForm.open();
    formValidatorAdd.cleanError();
});
popupAddForm.setEventListeners();