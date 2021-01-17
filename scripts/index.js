import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards } from './initialcards.js'


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupNameField = document.querySelector('[name="username"]');
const popupAboutField = document.querySelector('[name="about"]');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const editForm = document.querySelector('[name="editform"]');
const addForm = document.querySelector('[name="addform"]');
const closeAddButton = document.querySelector('.popup__close-button_add');
const closeEditButton = document.querySelector('.popup__close-button_edit');
const closeImagePopup = document.querySelector('.popup__close-button_img');
const cardsList = document.querySelector('.cards__list');
const popupAdd = document.querySelector('.popup-add');
const popupImg = document.querySelector('.popup-img');
const popupEdit = document.querySelector('.popup-edit');


// Функция Открыть попап
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEsc);
    closePopupOnOverlay();
}

// Функция закрыть попап
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnEsc);
    clearSpanError();
    clearTypeError();
}

// Функция добавления карточки в форме Добавить
function addNewCard(evt) {
    const imageName = document.querySelector('.popup__image-name');
    const imageLink = document.querySelector('.popup__image-link');

    const item = {
        name: imageName.value,
        link: imageLink.value
    }

    const newCard = new Card(item, '.card__template', openImagePopup);
    addCard(cardsList, newCard.generateCard());
    closePopup(popupAdd);
    addForm.reset();
}

// Функция, которая присвает профиль в инпуты
function addBio(evt) {
    profileName.textContent = popupNameField.value;
    profileAbout.textContent = popupAboutField.value;

    closePopup(popupEdit);
}

// Функция рендинга новой карточки на странице
function addCard(location, cardElement) {
    location.prepend(cardElement);
}


// Открытие попапа с картинкой
function openImagePopup(item) {
    const popupImage = document.querySelector('.popup__image');
    const popupImageCaption = document.querySelector('.popup__image-caption');
    popupImage.src = item.link;
    popupImage.alt = `Фото ${item.name}`;
    popupImageCaption.textContent = item.name;
    openPopup(popupImg);
}


function renderCards() {
    initialCards.map((item) => {
        const card = new Card(item, '.card__template', openImagePopup);
        const cards = card.generateCard();
        cardsList.append(cards);
    })
}

// Функция закрыть попап Escape
function closePopupOnEsc(e) {
    const activePopup = document.querySelector('.popup_opened');
    if (e.key === 'Escape' && activePopup) {
        closePopup(activePopup);
    }
}

// Функция закрыть попап на оверлее
function closePopupOnOverlay() {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
        activePopup.addEventListener('click', function (e) {
            if (e.target === activePopup) {
                closePopup(e.currentTarget);
            }
        });
    }
}

// Функция которая скрывает ошибку в спане
function clearSpanError() {
    const errorSpan = document.querySelectorAll('.popup__error_visible');
    errorSpan.forEach(span => {
        if (span) {
            span.textContent = '';

            const submitButton = editForm.querySelector('.popup__button');
            editFormValidator.setButtonState(submitButton, true);
        }
    });
}

// Функция, которая убирает красное поддчеркивание
function clearTypeError() {
    const errorType = document.querySelectorAll('.popup__input_type_error');
    errorType.forEach(type => {
        if (type) {
            type.classList.remove('popup__input_type_error');
        }
    });
}


// Слушатели

// Слушатель на кнопке Добавить
addButton.addEventListener('click', function (e) {
    openPopup(popupAdd);

    const submitButton = addForm.querySelector('.popup__button');
    addFormValidator.setButtonState(submitButton, false);

    addForm.reset();
})

// Слушатель на кнопке Редактировать
editButton.addEventListener('click', function (e) {
    popupNameField.value = profileName.textContent;
    popupAboutField.value = profileAbout.textContent;
    openPopup(popupEdit);
})

// Слушатель на кнопке закрыть попап
closeAddButton.addEventListener('click', function (e) {
    closePopup(popupAdd);
});

// Слушатель на кнопке закрыть попап
closeEditButton.addEventListener('click', function (e) {
    closePopup(popupEdit);
});

// Слушатель на кнопке закрыть попап
closeImagePopup.addEventListener('click', function (e) {
    closePopup(popupImg);
})

// Слушатель рендинга новой карточки
addForm.addEventListener('submit', addNewCard);

// Слушатель формы Редактировать профиль
editForm.addEventListener('submit', addBio);

// Вызов функции рендинга 6 карточке
renderCards()

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


const addFormValidator = new FormValidator(validationConfig, addForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();










