const editButton = document.querySelector('.profile__edit-button');
const сlosePopupButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popupNameField = document.querySelector('[name="username"]');
const popupAboutField = document.querySelector('[name="about"]');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formElement = document.querySelector('.popup__container');


//Функция: открыть попап
function openPopup() {
    popup.classList.add('popup_opened');
}
editButton.addEventListener('click', openPopup);


//Функция: закрыть попап
function closePopup() {
    popup.classList.remove('popup_opened');
}
сlosePopupButton.addEventListener('click', closePopup);


// Заполнить поля попапа из HTML
popupNameField.value = profileName.textContent;
popupAboutField.value = profileAbout.textContent;


//Кнопка Сохранить
function formSubmitHandler(evt) {
    evt.preventDefault();

    let nameInput = popupNameField.value;
    profileName.textContent = nameInput;
    let jobInput = popupAboutField.value;
    profileAbout.textContent = jobInput;

    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);