let noScroll = document.querySelector ('.page');
let formOpen = document.querySelector('.popup');
let formElement = document.querySelector ('.popup__container');
let formClose = document.querySelector('.popup__button-close');
let popupEdit = document.querySelector('.profile__button-edit');
let name = document.querySelector ('.profile__title');
let job = document.querySelector ('.profile__subtitle');
let nameInput = document.querySelector ('.popup__name');
let jobInput = document.querySelector ('.popup__about');

function openPopup () {
    formOpen.classList.add ('popup_opened');
    noScroll.style.overflowY='hidden';
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}
popupEdit.addEventListener ('click', openPopup);

function closePopup () {
    formOpen.classList.remove ('popup_opened');
    noScroll.style.overflowY='auto';
}
formClose.addEventListener ('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);