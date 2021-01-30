export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems() {
        this._items.forEach(item => this._renderer(item));
    }

    addItem(card) {
        this._container.append(card);
    }

    addOneItem(card) {
        this._container.prepend(card);
    }
}