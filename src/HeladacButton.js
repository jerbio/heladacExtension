import utility from './utility';

class HeladacButton {
    #user = null

    #heladacIconDom = null

    #id = utility.generateUUID();

    constructor(loggedInUser) {
        this.#user = loggedInUser;
        this.#heladacIconDom = null;
        this.#id = utility.generateUUID();
        this.renderHeladacButton();
    }

    get id() {
        return this.#id;
    }

    get heladacDom() {
        return this.#heladacIconDom.dom;
    }

    renderHeladacButton() {
        this.generateHeladacIcon();
    }

    generateHeladacIcon() {
        this.#heladacIconDom = utility.getDomDrCreateNew(this.id);
        this.heladacDom.innerHTML = 'HHH';
    }
}

export default HeladacButton;
