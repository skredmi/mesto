const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupCloseEdit = popupEdit.querySelector('.popup__button-close');
const popupAdd = document.querySelector('.popup_add');
const popupCloseAdd = popupAdd.querySelector('.popup__button-close');
const popupPhoto = document.querySelector('.popup-photo');
const popupClosePhoto = popupPhoto.querySelector('.popup__button-close');
const popupConatiner = document.querySelector ('.popup__container');
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
const placePhoto = document.querySelector('.popup-photo__place');
const titlePhoto = document.querySelector('.popup-photo__title');
const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }

enableValidation(config);

//удаление ошибок после закрытия попапа
function cleanError (popup, config) {
    const formElement = popup.querySelector(config.formSelector);
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError (formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
    });
};

//закрытие попапа по кнопке esc
function escCloseForm (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        if (openedPopup) {
            openedPopup.classList.remove('popup_opened');
        }
    }
}

//закрытие попапа по клику оверлей
function overlayClosePopup (evt) {
    const openPopup = document.querySelector('.popup_opened');
    if (evt.target !== evt.currentTarget) {
        return;
    }
    openPopup.classList.remove('popup_opened');
};
popupEdit.addEventListener ('click', overlayClosePopup);
popupAdd.addEventListener ('click', overlayClosePopup);
popupPhoto.addEventListener ('click', overlayClosePopup);

//управление попапом
function openForm(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escCloseForm);
    cleanError(popup, config); 
}

function closeForm(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escCloseForm)
}

// добавление лайка
function setLike (evt) {
    evt.target.classList.toggle('elements__like_active');
}

//удаление карточки
function deliteCard (evt) {
    const card = evt.target.closest('.elements__item');
    card.remove();
}

//открытие попапа с фото
function photoFormSubmitHandler (evt) {
    const element = evt.target.closest('.elements__item');
    const placeElement = event.target.closest('.elements__image');
    titlePhoto.textContent = element.textContent;
    placePhoto.src = placeElement.src;
    popupPhoto.classList.add('popup_opened');
    document.addEventListener('keydown', escCloseForm);
}
popupClosePhoto.addEventListener ('click', () => {
    popupPhoto.classList.remove('popup_opened');
});

// действия с карточками
function addCardListener (card) {
    card.querySelector('.elements__button').addEventListener('click', deliteCard);
    card.querySelector('.elements__like').addEventListener('click', setLike);
    card.querySelector('.elements__image').addEventListener('click', photoFormSubmitHandler);
}

// создание карточки
function generateCard (item) {
    const card = templateElement.content.cloneNode(true);
    card.querySelector('.elements__title').textContent = item.name;
    card.querySelector('.elements__image').src = item.link;
    addCardListener (card);
    return card;
}

//добавление карточек в контейнер
function addCard (card) {
    listElement.prepend(generateCard(card));
    
}

// добавление карточек на страницу
initialCards.forEach(item => {
    addCard(item);
});

// открытие попапа профиля
function openProfilePopup() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    openForm(popupEdit);
}
buttonEdit.addEventListener ('click', openProfilePopup);


//применение введенных значение в профиле
function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closeForm(popupEdit);
}
popupEdit.addEventListener('submit', formSubmitHandler);
popupCloseEdit.addEventListener ('click', () => closeForm(popupEdit));

//добавление карточки в попапе
function cardFormSubmitHandler (evt) {
    evt.preventDefault();
    const name = placeInput.value;
    const link = linkInput.value;
    addCard ({name, link});
    closeForm(popupAdd);
}
popupAdd.addEventListener('submit', cardFormSubmitHandler);
popupCloseAdd.addEventListener ('click', () => closeForm(popupAdd));

//обнуление полей у попапа добавления карточки
function openAddCardPopup() {
    placeInput.value = '';
    linkInput.value = '';
    openForm(popupAdd);
}
buttonAdd.addEventListener ('click', openAddCardPopup);