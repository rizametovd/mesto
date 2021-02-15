import Popup from '../components/Popup.js';

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector, handleDeleteClick) {
        super(popupSelector);
        this._handleDeleteClick = handleDeleteClick;
    }


    open(cardData) {
        super.open();
        this._cardData = cardData;
        return this._card;

    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleDeleteClick(this._cardData);
            this.close();
        });

    }

}