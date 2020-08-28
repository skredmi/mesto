import { initialCards, config } from '../utils/constants.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import { PopupDeleteCard } from '../components/popupDeleteCard.js';
import { Card } from '../components/card.js';
import { FormValidator } from '../components/formValidator.js';
import { Section } from '../components/section.js';
import { UserInfo } from '../components/userInfo.js';
import { Api } from '../components/api.js';
import '../pages/index.css';

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupAvatar = document.querySelector('.popup_avatar');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const name = document.querySelector('.profile__title');
const about = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__about');
const templateElement = '.elements-template';
const avatar = document.querySelector('.profile__avatar-img');
const editAvatar = document.querySelector('.profile__avatar');
const popupEditSelector = '.popup_edit';
const popupAddSelector = '.popup_add';
const popupAvatarSelector = '.popup_avatar';
const popupPhotoSelector = '.popup-photo';
const popupConfirmDeleteSelector = '.popup_delete';
const containerSelector = '.elements__list';
let userId;
const popupCardDelete = new PopupDeleteCard(popupConfirmDeleteSelector);
popupCardDelete.setEventListeners();
const popupImage = new PopupWithImage(popupPhotoSelector);
popupImage.setEventListeners();

// валидация
const formValidatorProfile = new FormValidator(config, popupEdit);
const formValidatorAdd = new FormValidator(config, popupAdd);
const formValidatorAvatar = new FormValidator(config, popupAvatar);
formValidatorProfile.enableValidation();
formValidatorAdd.enableValidation();
formValidatorAvatar.enableValidation();

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
        authorization: '5f1f213c-66ca-486f-9fed-5e9420f5da01',
        'Content-Type': 'application/json'
    }
})

// загрузка карточек с сервера и загрузка информации о пользователе с сервера
Promise.all([api.getInitialCards(), api.getUserProfile()])
    .then((result) => {
        avatar.src = result[1].avatar;
        name.textContent = result[1].name;
        about.textContent = result[1].about;
        userId = result[1]._id;
        const userProfile = new UserInfo(name, about);
        userProfile.getUserInfo(result[1]);
        cardList.renderItems(result[0]);
    })
    .catch((err) => {
        console.log(err);
    })

//добавление карточек на страницу
const renderer = (item) => {
    const card = new Card({
        data: item,
        handleCardClick: () => {
            popupImage.open(item.name, item.link)
        },
        handleCardDelete: () => {
            popupCardDelete.open();
            popupCardDelete.setSubmitHandler(() => {
                api.deleteCard(item._id)
                    .then(() => {
                        card.deleteCard();
                        popupCardDelete.close();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
        },
        handleLikeAdd: () => {
            api.getLike(item._id)
        },
        handleLikeDelete: () => {
            api.deleteLike(item._id)
        },
        userId: userId,
    },
        templateElement);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
}

const cardList = new Section({
    items: initialCards,
    renderer: renderer
},
    containerSelector
);

// попап редактирования профиля
const userProfile = new UserInfo(name, about);
const popupEditForm = new PopupWithForm({
    popupSelector: popupEditSelector,
    handleFormSubmit: ({ name, about }) => {
        api.changeUserProfile(name, about)
            .then(() => {
                userProfile.setUserInfo(name, about);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => popupEditForm.renderLoading(false));
    }
});
buttonEdit.addEventListener('click', () => {
    nameInput.value = name.textContent;
    jobInput.value = about.textContent;
    popupEditForm.open();
    formValidatorProfile.cleanError();
});
popupEditForm.setEventListeners();

//попап добавления карточек
const popupAddForm = new PopupWithForm({
    popupSelector: popupAddSelector,
    handleFormSubmit: item => {
        api.addCard(item.name, item.link)
            .then(renderer)
            .catch((err) => {
                console.log(err);
            })
            .finally(() => popupAddForm.renderLoading(false));
    }
});

buttonAdd.addEventListener('click', () => {
    popupAddForm.reset();
    popupAddForm.open();
    formValidatorAdd.cleanError();
});
popupAddForm.setEventListeners();

//попап изменения аватара
const popupAvatarForm = new PopupWithForm({
    popupSelector: popupAvatarSelector,
    handleFormSubmit: ({ link }) => {
        api.avatar(link)
            .then(() => {
                avatar.src = link;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => popupAvatarForm.renderLoading(false));
    }
});
editAvatar.addEventListener('click', () => {
    popupAvatarForm.reset();
    popupAvatarForm.open();
    formValidatorAvatar.cleanError();
});
popupAvatarForm.setEventListeners();