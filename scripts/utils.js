//управление попапом
export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escCloseForm);
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escCloseForm);
}

//закрытие попапа по кнопке esc
function escCloseForm (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        if (openedPopup) {
            openedPopup.classList.remove('popup_opened');
        }
    }
}