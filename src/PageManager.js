import utility from "./utility"
import CredentialApi from './services/CredentialApi.js';

class PageManager {
    constructor(emailDom, passwordDom, confirmPasswordDom) {
        this.credential = null;
        this.credentialApi = new CredentialApi();
        this.emailInput = (emailDom && new InputFieldManager({inputDom: emailDom})) || null
        this.passwordInput = (passwordDom && new InputFieldManager({inputDom: passwordDom})) || null
        this.confirmPasswordInput = (confirmPasswordDom && new InputFieldManager({inputDom: confirmPassword})) || null
        this.heladacButtons = [this.emailInput, this.passwordInput, this.confirmPasswordInput].filter(inputButton => inputButton!=null).map((inputButton) => inputButton.heladacButton.heladacDom)
        this.heladacDialog = new HeladacDialog()
        this.initialize()
    }

    initialize() {
        if(this.heladacButtons.length > 0) {
            this.heladacButtons.forEach((heladacButton) => {
                this.bindClickOfHeladacButton(heladacButton)
            })
        }
    }

    bindClickOfHeladacButton(heladacButton) {
        heladacButton.addEventListener('click', renderHeladacDialog)
    }

    renderHeladacDialog() {
        this.heladacDialog.renderDialog(inputButton)
    }

    retrieveCredential() {
        this.credentialApi.getServiceCredential().then((retrievedCredential) => {
            if(retrievedCredential) {
                this.credential = retrievedCredential
            } else {
                this.createCredetial()
            }
        })
    }

    createCredetial() {
        this.credentialApi.createCredential().then((heladacCredentials) => {
            this.credential = heladacCredentials;
        })
    }
}

/**
 * Class handles the rendering of the he;adac page that shows the auto generated users username, password and Name
 */
class HeladacDialog {
    constructor(pageManager) {

    }

    renderDialog(inputButton) {

    }
}

class InputFieldManager {
    #id = utility.generateUUID()
    #heladacButton = new HeladacButton()
    constructor({inputDom}) {
        this.inputDom = null
        
        if(inputDom) {
            this.inputDom = inputDom
        } else {
            throw Error('need to provide dom for entry')
        }
        this.inputValue = this.inputDom.value;
        this.initialize()
    }

    get id() {
        return this.#id
    }

    get heladacButton() {
        return this.#heladacButton
    }
    
    set value(value) {
        this.inputValue = value
        this.inputDom.value = this.inputValue
    }

    get value() {
        return this.inputDom.value;
    }

    initialize() {
        this.inputDom.addEventListener('change', this.onInputChange.bind(this))
        this.positionHeladacButton()
    }


    positionHeladacButton() {
        debugger
        let parentNode = this.inputDom.parentNode
        parentNode.appendChild(this.heladacButton.heladacDom)
    }

    onInputChange(e) {
        this.inputValue = e.target.value
    }
}


class HeladacButton {
    #user = null
    #heladacIconDom = null
    #id = utility.generateUUID();
    constructor(loggedInUser) {
        this.#user = loggedInUser
        this.#heladacIconDom = null
        this.#id = utility.generateUUID();
        this.renderHeladacButton()
    }

    get id() {
        return this.#id
    }

    get heladacDom() {
        return this.#heladacIconDom.dom
    }

    createCredentials() {
        
    }

    renderHeladacButton() {
        this.generateHeladacIcon();
    }

    generateHeladacIcon() {
        this.#heladacIconDom = utility.getDomDrCreateNew(this.id);
        this.heladacDom.innerHTML = "HHH"
    }
}


function isEmailPageDetected(emailInputDoms) {
    let retValue = emailInputDoms.length > 0
    return retValue
}

function isCredentialPageDetected(emailInputDoms, passwordDoms) {
    let retValue = isEmailPageDetected(emailInputDoms) && passwordDoms.length > 0
    return retValue
}



function main() {
    debugger
    let usernameInputs =  document.querySelectorAll('input[type="username"]');
    if(usernameInputs.length < 1) {
        usernameInputs =  document.querySelectorAll('input[type="userName"]');
    }
    debugger
    let emailInputs =  document.querySelectorAll('input[type="email"]');
    let passwordInputs =  document.querySelectorAll('input[type="password"]');
    let nameInputs =  document.querySelectorAll('input[type="password"]');
    if (isCredentialPageDetected(emailInputs, passwordInputs)) {
        let pageManager = new PageManager(emailInputs[0], passwordInputs[0])
    } else if(isEmailPageDetected(emailInputs)) {
        let pageManager = new PageManager(emailInputs[0])
    }
}

main()



debugger

console.log('Background injected back again');

