export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._array = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    renderItems(result) {
        this._result = result;
        this._result.forEach(item => this._renderer(item))
    }

    addItem(element) {
        this._container.prepend(element);
    }
}