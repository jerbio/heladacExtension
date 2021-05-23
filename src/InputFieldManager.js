import utility from './utility';
import HeladacButton from './HeladacButton';

class InputFieldManager {
    #id = utility.generateUUID()

    #heladacButton = new HeladacButton()

    constructor({ inputDom }) {
        this.inputDom = null;

        if (inputDom) {
            this.inputDom = inputDom;
        } else {
            throw Error('need to provide dom for entry');
        }
        this.inputValue = this.inputDom.value;
        this.initialize();
    }

    get id() {
        return this.#id;
    }

    get heladacButton() {
        return this.#heladacButton;
    }

    set value(value) {
        this.inputValue = value;
        this.inputDom.value = this.inputValue;
    }

    get value() {
        return this.inputDom.value;
    }

    initialize() {
        this.inputDom.addEventListener('change', this.onInputChange.bind(this));
        this.positionHeladacButton();
    }

    positionHeladacButton() {
        const { parentNode } = this.inputDom;
        parentNode.appendChild(this.heladacButton.heladacDom);
    }

    onInputChange(e) {
        this.inputValue = e.target.value;
    }
}

export default InputFieldManager;
