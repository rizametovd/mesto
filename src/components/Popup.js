export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }


    open() {
        this._popupSelector.classList.add('popup_opened');

        document.addEventListener('keydown', this._handleEscClose);
        this._popupSelector.addEventListener('click', this._handleOverlayClose);
    }


    close() {
        this._popupSelector.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._handleEscClose);
        this._popupSelector.removeEventListener('click', this._handleOverlayClose);

    }


    _handleEscClose = (e) => {
        if (e.key === 'Escape') {
            this.close();
        }
    }


    _handleOverlayClose = (e) => {
        const activePopup = e.target;
        if (activePopup.classList.contains('popup_opened')) {
            this.close();
        }
    }

    setEventListeners() {
        const closePopupButton = this._popupSelector.querySelector('.popup__close-button');
        closePopupButton.addEventListener('click', () => this.close());

    }
}
