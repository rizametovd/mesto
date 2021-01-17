export default class Card {
    constructor(data, cardSelector, openImagePopup) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._openImagePopup = openImagePopup;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._cardSelector)
            .content.querySelector('.cards__item')
            .cloneNode(true);
        return cardTemplate;
    }

    _like() {
        this._card.querySelector('.cards__item-like-icon-button').classList.toggle('cards__item-like-icon-button_active');
    }

    _removeCard() {
        this._card.remove();
        this._card = null;
    }

    generateCard() {
        this._card = this._getTemplate();
        const cardTitle = this._card.querySelector('.cards__item-title').textContent = this._name;
        this._card.querySelector('.cards__item-photo').src = this._link;
        this._card.querySelector('.cards__item-photo').alt = `Фото ${cardTitle}`;
        this._setEventListeners();
        return this._card;
    }

    _setEventListeners() {
        this._card.querySelector('.cards__item-like-icon-button').addEventListener('click', () => {
            this._like();
        });

        this._card.querySelector('.cards__item-delete-button').addEventListener('click', () => {
            this._removeCard()
        });

        this._card.querySelector('.cards__item-photo').addEventListener('click', () => {
            this._openImagePopup({ name: this._name, link: this._link })
        });
    }
}





