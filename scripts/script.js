const editButton = document.querySelector('.profile__edit-button');
const сlosePopupButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popupField = document.querySelectorAll('.popup__field');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formElement = document.querySelector('.popup__container');


//Открыть попап
function openPopup() {
    popup.classList.add('popup_opened');
}
editButton.addEventListener('click', openPopup);


// Закрыть попап
function closePopup() {
    popup.classList.remove('popup_opened');
}
сlosePopupButton.addEventListener('click', closePopup);


// Заполнить поля попапа из HTML
popupField[0].value = profileName.textContent;
popupField[1].value = profileAbout.textContent;


//Кнопка Сохранить
function formSubmitHandler(evt) {
    evt.preventDefault();

    let nameInput = popupField[0].value;
    profileName.textContent = nameInput;
    let jobInput = popupField[1].value;
    profileAbout.textContent = jobInput;

    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);