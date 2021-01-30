export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._cardSelector)
            .content.querySelector('.cards__item')
            .cloneNode(true);
        return cardTemplate;
    }

    _like(evt) {
        evt.target.classList.toggle('cards__item-like-icon-button_active');
    }

    _removeCard() {
        this._card.remove();
        this._card = null;
    }

    generateCard() {
        this._card = this._getTemplate();
        const cardPhoto = this._card.querySelector('.cards__item-photo');
        const cardTitle = this._card.querySelector('.cards__item-title').textContent = this._name;
        cardPhoto.src = this._link;
        cardPhoto.alt = `Фото ${cardTitle}`;
        this._setEventListeners();
        return this._card;
    }

    _setEventListeners() {
        this._card.querySelector('.cards__item-like-icon-button').addEventListener('click', (evt) => {
            this._like(evt);
        });

        this._card.querySelector('.cards__item-delete-button').addEventListener('click', () => {
            this._removeCard();
        });

        this._card.querySelector('.cards__item-photo').addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
        });
    }
}





