import '../pages/index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
    editButton,
    addButton,
    popupNameField,
    popupAboutField,
    editForm,
    addForm,
    cardContainer,
    validationConfig,
    name,
    about,
    avatar,
    avatarButton,
    avatarForm
} from '../utils/constants.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20/',
    headers: {
        authorization: '31d51008-4859-4d5b-b87f-d3d5e1b6e481',
        'Content-Type': 'application/json'
    }
});


let userId = null;


const userInfo = new UserInfo({
    name: name,
    about: about,
    avatar: avatar
})


api.getUserInfo()
    .then(userData => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
    })
    .catch(err => {
        console.log(err);
    })


const updateAvatar = new PopupWithForm('.popup-update-avatar', (formData) => {
    updateAvatar.renderLoading(true)
    api.updateAvatar(formData)
        .then(formData => {
            userInfo.setUserInfo(formData);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            updateAvatar.renderLoading(false);
        })
})
updateAvatar.setEventListeners();


avatarButton.addEventListener('click', () => {
    updateAvatar.open();
    avatarFormValidator.clearSpanError();
    avatarFormValidator.clearTypeError();
    avatarFormValidator.setButtonState(false);
})


const editPopup = new PopupWithForm('.popup-edit', (formData) => {
    editPopup.renderLoading(true);
    api.updateUserInfo(formData)
        .then(formData => {
            userInfo.setUserInfo(formData);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            editPopup.renderLoading(false);
        })
});
editPopup.setEventListeners();


const cardsSection = new Section({
    renderer: (item) => {
        cardsSection.addItem(createCard(item));
    },
},
    cardContainer
);


api.getInitialCards()
    .then(cards => {
        cardsSection.renderItems(cards);
    }
    )
    .catch(err => {
        console.log(err);
    });


const addPopup = new PopupWithForm('.popup-add', (formData) => {
    addPopup.renderLoading(true);
    api.createCard(formData)
        .then(formData => {
            cardsSection.addOneItem(createCard(formData));
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            addPopup.renderLoading(false);
        })
});
addPopup.setEventListeners();


function createCard(cardData) {
    const cardInstance = new Card(
        { ...cardData, userId },
        '.card__template',
        (formData) => {
            imagePopup.open(formData);
        },
        (cardData) => {
            popupDeleteCard.open(cardData);
        },
        api);
    const card = cardInstance.generateCard();
    return card;
}


const popupDeleteCard = new PopupDeleteCard('.popup-delete', (cardData) => {
    api.removeCard(cardData.cardId)
        .then(() => {
            cardData.card.remove();
        })
        .catch(err => {
            console.log(err);
        })
});
popupDeleteCard.setEventListeners();


const imagePopup = new PopupWithImage('.popup-img');
imagePopup.setEventListeners();


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


const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();
