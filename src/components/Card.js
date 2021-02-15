export default class Card {
    constructor(data, cardSelector, handleCardClick, popupDelete, api) {
        this._api = api;
        this._name = data.name;
        this._link = data.link;
        this._likesId = data.likes;
        this._likes = data.likes.length;
        this._usersId = data.owner._id;
        this._myId = data.userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._popupDelete = popupDelete;
        this._cardId = data._id;
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

    _isLiked() {
        return Boolean(this._likesId.find(obj => obj._id == this._myId));
    }

    _likedCards(isLiked) {
        if (isLiked) {
            this._card.querySelector('.cards__item-like-icon-button').classList.add('cards__item-like-icon-button_active');
        }
    }


    _likeCard() {
        this._api.likeCard(this._cardId)
            .then(() => {
                this._likes = this._likes + 1;
                this._cardLikes.textContent = this._likes;
            })
            .catch(err => {
                console.log(err);
            })
    }

    _unlikeCard() {
        this._api.unLikeCard(this._cardId)
            .then(() => {
                this._likes = this._likes - 1;
                this._cardLikes.textContent = this._likes;
            })
            .catch(err => {
                console.log(err);
            })
    }

    generateCard() {
        this._card = this._getTemplate();
        const cardPhoto = this._card.querySelector('.cards__item-photo');
        const cardTitle = this._card.querySelector('.cards__item-title').textContent = this._name;
        this._cardLikes = this._card.querySelector('.cards__item-likes');
        this._cardLikes.textContent = this._likes;
        cardPhoto.src = this._link;
        cardPhoto.alt = `Фото ${cardTitle}`;
        this._setEventListeners();
        this._removeDeleteButton();
        this._likedCards(this._isLiked());

        return this._card;
    }

    _removeDeleteButton() {
        if (this._usersId !== this._myId) {
            this._card.querySelector('.cards__item-delete-button').remove();
        }
    }

    _setEventListeners() {
        this._card.querySelector('.cards__item-like-icon-button').addEventListener('click', (evt) => {
            const likeButtonActive = this._card.querySelector('.cards__item-like-icon-button').classList.contains('cards__item-like-icon-button_active');
            likeButtonActive ? this._unlikeCard() : this._likeCard();
            this._like(evt);
        });

        this._card.querySelector('.cards__item-delete-button').addEventListener('click', () => {
            this._popupDelete({ cardId: this._cardId, card: this._card });
        });

        this._card.querySelector('.cards__item-photo').addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
        });
    }
}





