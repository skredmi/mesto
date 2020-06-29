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


//управление попапом
function togglePopup (popup) {
    popup.classList.toggle('popup_opened');
}

// открытие попапа профиля
function openProfilePopup() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    togglePopup(popupEdit);
}
buttonEdit.addEventListener ('click', openProfilePopup);

//применение введенных значение в профиле
function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    togglePopup(popupEdit);
}
popupEdit.addEventListener('submit', formSubmitHandler);
popupCloseEdit.addEventListener ('click', () => togglePopup(popupEdit));

//добавление карточки в попапе
function cardFormSubmitHandler (evt) {
    evt.preventDefault();
    const name = placeInput.value;
    const link = linkInput.value;
    addCard ({name, link});
    togglePopup(popupAdd);
}
popupAdd.addEventListener('submit', cardFormSubmitHandler);
popupCloseAdd.addEventListener ('click', () => togglePopup(popupAdd));

//обнуление полей у попапа добавления карточки
function openAddCardPopup() {
    placeInput.value = '';
    linkInput.value = '';
    togglePopup(popupAdd);
}
buttonAdd.addEventListener ('click', openAddCardPopup);

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
    togglePopup(popupPhoto);
}
popupClosePhoto.addEventListener ('click', () => togglePopup(popupPhoto));