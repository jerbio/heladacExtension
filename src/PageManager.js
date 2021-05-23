import utility from './utility';
import CredentialApi from './services/CredentialApi';
import InputFieldManager from './InputFieldManager';
import HeladacDialog from './HeladacDialog';

class PageManager {
    constructor(params) {
        const {
            emailDom, passwordDom, confirmPasswordDom, firstNameDom, lastNameDom,
        } = params;
        this.credential = null;
        this.credentialApi = new CredentialApi();
        this.emailInput = (emailDom && new InputFieldManager({ inputDom: emailDom })) || null;
        this.passwordInput = (passwordDom
            && new InputFieldManager({ inputDom: passwordDom })) || null;
        this.confirmPasswordInput = (confirmPasswordDom
            && new InputFieldManager({ inputDom: confirmPasswordDom })) || null;
        this.firstNameInput = (firstNameDom
            && new InputFieldManager({ inputDom: firstNameDom })) || null;
        this.lastNameInput = (lastNameDom
            && new InputFieldManager({ inputDom: lastNameDom })) || null;
        this.heladacButtons = [
            this.emailInput, this.passwordInput,
            this.confirmPasswordInput, this.firstNameInput,
            this.lastNameInput]
            .filter((inputButton) => inputButton != null)
            .map((inputButton) => inputButton.heladacButton.heladacDom);
        this.heladacDialog = new HeladacDialog(this);
    }

    initialize() {
        if (this.heladacButtons.length > 0) {
            this.heladacButtons.forEach((heladacButton) => {
                this.bindClickOfHeladacButton(heladacButton);
            });
        }
    }

    bindClickOfHeladacButton(heladacButton) {
        heladacButton.addEventListener('click', this.renderHeladacDialog.bind(this));
    }

    renderHeladacDialog(e) {
        this.heladacDialog.renderDialog(e.target);
    }

    retrieveCredential() {
        this.credentialApi.getServiceCredential().then((retrievedCredential) => {
            if (retrievedCredential) {
                this.credential = retrievedCredential;
            } else {
                this.createCredetial();
            }
        });
    }

    createCredetial() {
        this.credentialApi.createCredential().then((heladacCredentials) => {
            this.credential = heladacCredentials;
        });
    }
}

function main() {
    const usernameInputs = utility.getUsernameDoms();

    const emailInputs = utility.getEmailDoms();
    const passwordInputs = utility.getPasswordDoms();
    const firstNameInputs = utility.getfirstNameDoms();
    const lastNameInputs = utility.getLastNameDoms();
    const allHeladacInputs = [].concat(usernameInputs).concat(emailInputs).concat(passwordInputs)
        .concat(firstNameInputs)
        .concat(lastNameInputs);
    if (allHeladacInputs.length > 0) {
        const pageManager = new PageManager(
            {
                emailDom: emailInputs.length > 0 ? emailInputs[0] : null,
                passwordDom: passwordInputs.length > 0 ? passwordInputs[0] : null,
                firstNameDom: firstNameInputs.length > 0 ? firstNameInputs[0] : null,
                lastNameDom: lastNameInputs.length > 0 ? lastNameInputs[0] : null,
            },
        );
        pageManager.initialize();
    } else if (emailInputs.length > 0) {
        const pageManager = new PageManager({ emailDom: emailInputs[0] });
        pageManager.initialize();
    }
}

main();

console.log('Background injected back again');
