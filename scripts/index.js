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
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.target !== evt.currentTarget) {
        return;
    }
    openedPopup.classList.remove('popup_opened');
}

popupEdit.addEventListener ('click', overlayClosePopup);
popupAdd.addEventListener ('click', overlayClosePopup);
popupPhoto.addEventListener ('click', overlayClosePopup);

//управление попапом
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escCloseForm);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escCloseForm)
}

// добавление лайка
function setLike (evt) {
    evt.target.classList.toggle('elements__like_active');
}

//удаление карточки
function deleteCard (evt) {
    const card = evt.target.closest('.elements__item');
    card.remove();
}

//открытие попапа с фото
function openPopupPhoto (evt) {
    const element = evt.target.closest('.elements__item');
    const placeElement = event.target.closest('.elements__image');
    titlePhoto.textContent = element.textContent;
    placePhoto.src = placeElement.src;
    placePhoto.alt = element.textContent;
    openPopup(popupPhoto);
}

// закрытие попапа с фото
popupClosePhoto.addEventListener ('click', () => closePopup(popupPhoto));

// действия с карточками
function addCardListener (card) {
    card.querySelector('.elements__button').addEventListener('click', deleteCard);
    card.querySelector('.elements__like').addEventListener('click', setLike);
    card.querySelector('.elements__image').addEventListener('click', openPopupPhoto);
}

// создание карточки
function generateCard (item) {
    const card = templateElement.content.cloneNode(true);
    const image = card.querySelector('.elements__image');
    card.querySelector('.elements__title').textContent = item.name;
    image.src = item.link;
    image.alt = item.name;
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

// заполнение инпутов формы значениями из профиля
function ProfilePopup() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

//открытие формы профиля
buttonEdit.addEventListener ('click', () => {
    ProfilePopup();
    openPopup(popupEdit);
    cleanError (popupEdit, config);
    const formElement = popupEdit.querySelector(config.formSelector);
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    toggleButtonState(inputList, buttonElement, config);
});

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

//обнуление полей у попапа добавления карточки
function openAddCardPopup() {
    placeInput.value = '';
    linkInput.value = '';   
}

//открытие попапа добавления карточки
buttonAdd.addEventListener ('click', () => {
    openAddCardPopup();
    openPopup(popupAdd);
    cleanError (popupAdd, config);
    const formElement = popupAdd.querySelector(config.formSelector);
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    toggleButtonState(inputList, buttonElement, config);
});