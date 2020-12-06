const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupNameField = document.querySelector('[name="username"]');
const popupAboutField = document.querySelector('[name="about"]');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formElement = document.querySelector('.popup__container');
const editForm = document.querySelector('[name="editform"]');
const addForm = document.querySelector('[name="addform"]');
const imagePopup = document.querySelector('.popup__container-image');
const closeAddButton = document.querySelector('.popup__close-button_add');
const closeEditButton = document.querySelector('.popup__close-button_edit');
const closeImagePopup = document.querySelector('.popup__close-button_img');
const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.card__template');


// Открыть Попапы
addButton.addEventListener('click', function (e) {
    openPopup(addForm);
})

editButton.addEventListener('click', function (e) {
    openPopup(editForm);
})

function openPopup(form) {
    form.closest('.popup').classList.add('popup_opened');
}


// Закрыть попап
function closePopup(e) {
    if (e.target.closest('.popup')) {
        e.target.closest('.popup').classList.remove('popup_opened');
    }
}
closeAddButton.addEventListener('click', closePopup);
closeEditButton.addEventListener('click', closePopup);
closeImagePopup.addEventListener('click', closePopup);


// Добавить картинку и закрыть попап
function addImage(evt) {
    evt.preventDefault();

    const imageName = document.querySelector('[name="imagename"]');
    const imageLink = document.querySelector('[name="imagelink"]');

    item = {
        name: imageName.value,
        link: imageLink.value
    }

    addCard(item)
    closePopup(evt);
}
addForm.addEventListener('submit', addImage);


// Заполнить поля попапа из HTML
popupNameField.value = profileName.textContent;
popupAboutField.value = profileAbout.textContent;


//Изменить профиль и закрыть попап
function formSubmitHandler(evt) {
    evt.preventDefault();

    let nameInput = popupNameField.value;
    profileName.textContent = nameInput;
    let jobInput = popupAboutField.value;
    profileAbout.textContent = jobInput;

    closePopup(evt);
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


// Добавить новую карточку
function addCard(item) {
    const newCard = cardTemplate.content.cloneNode(true);
    const cardTitle = newCard.querySelector('.cards__item-title');
    const cardImage = newCard.querySelector('.cards__item-photo');
    const likeButton = newCard.querySelector('.cards__item-like-icon-button');
    const removeCardButton = newCard.querySelector('.cards__item-delete-button');
    const imageLink = newCard.querySelector('.cards__item-photo-link');

    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = 'Фото' + ' ' + item.name;
    cardsList.prepend(newCard);

    likeButton.addEventListener('click', like);
    removeCardButton.addEventListener('click', removeCard);
    imageLink.addEventListener('click', () => OpenImagePopup(item));

    return newCard;  
}

// Открытие попапа с картинкой
function OpenImagePopup(item) {
    const popupImage = document.querySelector('.popup__image');
    const popupImageCaption = document.querySelector('.popup__image-caption');
    popupImage.src = item.link;
    popupImage.alt = 'Фото' + ' ' + item.name;
    popupImageCaption.textContent = item.name;
    openPopup(imagePopup);
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
    const cards = initialCards.map(addCard);
}
renderCards()
