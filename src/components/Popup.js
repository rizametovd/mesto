export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }


    open() {
        this._popup.classList.add('popup_opened');

        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handleOverlayClose);
    }


    close() {
        this._popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._handleOverlayClose);

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
        const closePopupButton = this._popup.querySelector('.popup__close-button');
        closePopupButton.addEventListener('click', () => this.close());

    }
}
