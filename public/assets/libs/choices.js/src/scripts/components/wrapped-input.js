import WrappedElement from './wrapped-element';
export default class WrappedInput extends WrappedElement {
    constructor({ element, classNames, delimiter, }) {
        super({ element, classNames });
        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "delimiter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.delimiter = delimiter;
    }
    get value() {
        return this.element.value;
    }
    set value(value) {
        this.element.setAttribute('value', value);
        this.element.value = value;
    }
}
