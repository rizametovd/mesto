import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/initialСards.js';
import {
    editButton,
    addButton,
    popupNameField,
    popupAboutField,
    editForm,
    addForm,
    cardList,
    validationConfig
} from '../utils/constants.js';


const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__about' });


const imagePopup = new PopupWithImage('.popup-img');
imagePopup.setEventListeners();


const editPopup = new PopupWithForm('.popup-edit', (formData) => {
    userInfo.setUserInfo(formData);
});
editPopup.setEventListeners();


const addPopup = new PopupWithForm('.popup-add', (item) => {
    const cardInstance = new Card(item, '.card__template', (item) => { imagePopup.open(item) });
    const card = cardInstance.generateCard();
    cardsList.addOneItem(card);
});
addPopup.setEventListeners();


const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardInstance = new Card(item, '.card__template', (item) => { imagePopup.open(item) });
        const card = cardInstance.generateCard();

        cardsList.addItem(card);
    },
},
    cardList
);
cardsList.renderItems();


addButton.addEventListener('click', () => {
    addPopup.open();
    addFormValidator.clearSpanError();
    addFormValidator.clearTypeError();
    addFormValidator.setButtonState(false);
});


editButton.addEventListener('click', () => {
    popupNameField.value = userInfo.getUserInfo().name;
    popupAboutField.value = userInfo.getUserInfo().about;
    editPopup.open();
    editFormValidator.clearSpanError();
    editFormValidator.clearTypeError();
    editFormValidator.setButtonState(true);
});


const addFormValidator = new FormValidator(validationConfig, addForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();
