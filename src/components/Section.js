export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems(arr) {
        arr.forEach(item => this._renderer(item));
    }

    addItem(card) {
        this._container.append(card);
    }

    addOneItem(card) {
        this._container.prepend(card);
    }
}