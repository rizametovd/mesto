const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupNameField = document.querySelector('[name="username"]');
const popupAboutField = document.querySelector('[name="about"]');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const editForm = document.querySelector('[name="editform"]');
const addForm = document.querySelector('[name="addform"]');
const imagePopup = document.querySelector('.popup__container-image');
const closeAddButton = document.querySelector('.popup__close-button_add');
const closeEditButton = document.querySelector('.popup__close-button_edit');
const closeImagePopup = document.querySelector('.popup__close-button_img');
const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.card__template');
const popupAdd = document.querySelector('.popup-add');
const popupImg = document.querySelector('.popup-img');
const popupEdit = document.querySelector('.popup-edit');


// Функция Открыть попап
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

// Слушатель на кнопке Добавить
addButton.addEventListener('click', function (e) {
    openPopup(popupAdd);
})

// Слушатель на кнопке Редактировать
editButton.addEventListener('click', function (e) {
    popupNameField.value = profileName.textContent;
    popupAboutField.value = profileAbout.textContent;
    openPopup(popupEdit);
})


// Функция закрыть попап
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

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


// Добавить карточку и закрыть попап
function addImage(evt) {
    evt.preventDefault();

    const imageName = document.querySelector('.popup__image-name');
    const imageLink = document.querySelector('.popup__image-link');

    item = {
        name: imageName.value,
        link: imageLink.value
    }

    addCard(cardsList, createCard(item))
    closePopup(popupAdd);
    addForm.reset();
}
addForm.addEventListener('submit', addImage);


//Изменить профиль и закрыть попап
function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = popupNameField.value;
    profileAbout.textContent = popupAboutField.value;

    closePopup(popupEdit);
}
editForm.addEventListener('submit', formSubmitHandler);


// Загрузка 6 карточек из массива
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


// Функция создания карточки
function createCard(item) {
    const newCard = cardTemplate.content.cloneNode(true);
    const cardTitle = newCard.querySelector('.cards__item-title');
    const cardImage = newCard.querySelector('.cards__item-photo');
    const likeButton = newCard.querySelector('.cards__item-like-icon-button');
    const removeCardButton = newCard.querySelector('.cards__item-delete-button');

    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = 'Фото' + ' ' + item.name;

    likeButton.addEventListener('click', like);
    removeCardButton.addEventListener('click', removeCard);
    cardImage.addEventListener('click', () => OpenImagePopup(item));

    return newCard;

}

// Функция рендинга новой карточки на странице
function addCard(location, cardElement) {
    location.prepend(cardElement);
}

// Открытие попапа с картинкой
function OpenImagePopup(item) {
    const popupImage = document.querySelector('.popup__image');
    const popupImageCaption = document.querySelector('.popup__image-caption');
    popupImage.src = item.link;
    popupImage.alt = 'Фото' + ' ' + item.name;
    popupImageCaption.textContent = item.name;
    openPopup(popupImg);
}

// Функция лайков
function like(e) {
    e.target.classList.toggle('cards__item-like-icon-button_active');
}

// Функция удаления карточек
function removeCard(e) {
    e.target.closest('.cards__item').remove();
}

// Функция рендинга 6 карточек из массива
function renderCards() {
    const cards = initialCards.map(createCard);
    cardsList.append(...cards);
}
renderCards()
