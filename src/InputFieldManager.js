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
        if (!InputFieldManager.isInputFieldAlreadyEnlisted(this.inputDom)) {
            this.initialize();
        } else {
            this.#heladacButton = null;
        }
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
        const inputField = this.inputDom;
        inputField.setAttribute('value', 'My default value');
        // eslint-disable-next-line no-undef
        inputField.dispatchEvent(new Event('change', { bubbles: true }));
        // eslint-disable-next-line no-undef
        inputField.dispatchEvent(new Event('blur', { bubbles: true }));
    }

    get value() {
        return this.inputDom.value;
    }

    initialize() {
        this.enlistInputFields();
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

    enlistInputFields() {
        if (!InputFieldManager.inputFields) {
            InputFieldManager.inputFields = new Set();
        }
        InputFieldManager.inputFields.add(this.inputDom);
    }

    static isInputFieldAlreadyEnlisted(input) {
        if (!InputFieldManager.inputFields) {
            InputFieldManager.inputFields = new Set();
            return false;
        }
        const retValue = InputFieldManager.inputFields.has(input);
        return retValue;
    }
}

export default InputFieldManager;
