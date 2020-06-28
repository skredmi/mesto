let popup = document.querySelector('.popup');
let popupEdit = document.querySelector('.popup_edit');
let popupCloseEdit = popupEdit.querySelector('.popup__button-close');
let popupAdd = document.querySelector('.popup_add');
let popupCloseAdd = popupAdd.querySelector('.popup__button-close');
let popupPhoto = document.querySelector('.popup-photo');
let popupClosePhoto = popupPhoto.querySelector('.popup__button-close');
let popupConatiner = document.querySelector ('.popup__container');
let buttonEdit = document.querySelector('.profile__button-edit');
let buttonAdd = document.querySelector('.profile__button-add');
let name = document.querySelector ('.profile__title');
let job = document.querySelector ('.profile__subtitle');
let nameInput = document.querySelector ('.popup__name');
let jobInput = document.querySelector ('.popup__about');
let placeInput = document.querySelector('.popup__place');
let linkInput = document.querySelector('.popup__link');
let placePhoto = document.querySelector('.popup-photo__place');
let titlePhoto = document.querySelector('.popup-photo__title');

const initialCards = [
    {   
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//загрузка массива карточек на страницу
const listElement = document.querySelector('.elements__list');
const templateElement = document.querySelector('.elements-template');

function addCard(item) {
    const card = templateElement.content.cloneNode(true);

    card.querySelector('.elements__title').textContent = item.name;
    card.querySelector('.elements__image').src = item.link;
    card.querySelector('.elements__button').addEventListener('click', deliteCard);
    card.querySelector('.elements__like').addEventListener('click', setLike);
    card.querySelector('.elements__image').addEventListener('click', photoFormSubmitHandler);

    listElement.prepend(card);
}

initialCards.forEach(item => {
    addCard(item);
});

//открытие попапа редактирования
function togglePopup (popup) {
    popup.classList.toggle('popup_opened');
    nameInput.value = name.textContent;
    jobInput.value = job.textContent; 
    placeInput.value = '';
    linkInput.value = '';
}

buttonEdit.addEventListener ('click', () => togglePopup(popupEdit));

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
    let name = placeInput.value;
    let link = linkInput.value;
    addCard ({name, link});
    togglePopup(popupAdd);
}
buttonAdd.addEventListener ('click', () => togglePopup(popupAdd));
popupAdd.addEventListener('submit', cardFormSubmitHandler);
popupCloseAdd.addEventListener ('click', () => togglePopup(popupAdd));

// добавление лайка
function setLike (evt) {
    const card = evt.target.classList.toggle('elements__like_active');
}

//удаление карточки
function deliteCard (evt) {
    const card = event.target.closest('.elements__item');
    card.remove();
}

//открытие попапа с фото
function photoFormSubmitHandler (evt) {
    let element = event.target.closest('.elements__item');
    let placeElement = event.target.closest('.elements__image');
    titlePhoto.textContent = element.textContent;
    placePhoto.src = placeElement.src;
    togglePopup(popupPhoto);
}
popupClosePhoto.addEventListener ('click', () => togglePopup(popupPhoto));