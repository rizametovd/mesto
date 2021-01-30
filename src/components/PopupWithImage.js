import Popup from '../components/Popup.js';


export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
    }

    open(item) {
        super.open();
        this._popupImage.src = item.link;
        this._popupImageCaption.textContent = item.name;
        this._popupImage.alt = `Фото ${item.name}`;
    }
}