import '../pages/index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
    editButton,
    addButton,
    popupNameField,
    popupAboutField,
    editForm,
    addForm,
    cardList,
    validationConfig,
    initialCards
} from '../utils/constants.js';


const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__about' });


const imagePopup = new PopupWithImage('.popup-img');
imagePopup.setEventListeners();


const editPopup = new PopupWithForm('.popup-edit', (formData) => {
    userInfo.setUserInfo(formData);
});
editPopup.setEventListeners();


const addPopup = new PopupWithForm('.popup-add', (item) => {
    cardsList.addOneItem(createCard(item, '.card__template', (item) => {
        imagePopup.open(item);
    }));
});
addPopup.setEventListeners();


const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardsList.addItem(createCard(item, '.card__template', (item) => {
            imagePopup.open(item);
        }));
    },
},
    cardList
);
cardsList.renderItems();

function createCard(item, cardSelector, openImagePopup) {
    const cardInstance = new Card(item, cardSelector, openImagePopup);
    const card = cardInstance.generateCard();
    return card;
}


addButton.addEventListener('click', () => {
    addPopup.open();
    addFormValidator.clearSpanError();
    addFormValidator.clearTypeError();
    addFormValidator.setButtonState(false);
});


editButton.addEventListener('click', () => {
    const personInfo = userInfo.getUserInfo();
    popupNameField.value = personInfo.name;
    popupAboutField.value = personInfo.about;
    editPopup.open();
    editFormValidator.clearSpanError();
    editFormValidator.clearTypeError();
    editFormValidator.setButtonState(true);
});


const addFormValidator = new FormValidator(validationConfig, addForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();
