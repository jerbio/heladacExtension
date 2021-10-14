import utility from './utility';
import CredentialApi from './services/CredentialApi';
import InputFieldManager from './InputFieldManager';
import HeladacDialog from './HeladacDialog';

class PageManager {
    constructor(params) {
        const {
            emailDom, usernameDom, passwordDom, confirmPasswordDom, firstNameDom, lastNameDom,
            creditCardDom, postalCodeDom, securityCodeDom, expirationDom,
        } = params;
        this.credential = null;
        this.credentialApi = new CredentialApi();
        this.emailInput = new Set();
        this.passwordInput = new Set();
        this.confirmPasswordInput = new Set();
        this.firstNameInput = new Set();
        this.usernameInput = new Set();
        this.lastNameInput = new Set();
        this.creditCardInput = new Set();
        this.postalCodeInput = new Set();
        this.securityCodeInput = new Set();
        this.expirationInput = new Set();

        this.populateInputs({
            emailDom,
            usernameDom,
            passwordDom,
            confirmPasswordDom,
            firstNameDom,
            lastNameDom,
            creditCardDom,
            postalCodeDom,
            securityCodeDom,
            expirationDom,
        });
        this.bindPageChanges();
    }

    initialize() {
        if (this.heladacButtons.length > 0) {
            this.heladacButtons.forEach((heladacButton) => {
                this.bindClickOfHeladacButton(heladacButton);
            });
        }
    }

    bindPageChanges() {
        // eslint-disable-next-line no-unused-vars
        function onPageMutation(mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            let newInputFound = false;
            mutationsList.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    if (mutation.target
                        && mutation.target.childNodes
                        && mutation.target.childNodes.length > 0) {
                        mutation.target.childNodes.forEach((childNode) => {
                            if (childNode.nodeName === 'INPUT') {
                                newInputFound = true;
                            }
                        });
                    }
                }
            });

            if (newInputFound) {
                // eslint-disable-next-line max-len
                observer.disconnect();// TODO: WE need to deal with pages which do DOM reloads reload e.g facebook.com, the clicking "create new Account"
                const usernameInputs = utility.getUsernameDoms();
                const emailInputs = utility.getEmailDoms();
                const passwordInputs = utility.getPasswordDoms();
                const firstNameInputs = utility.getfirstNameDoms();
                const lastNameInputs = utility.getLastNameDoms();
                const creditCardInputs = utility.getCreditCardDoms();
                const confirmPasswordInputs = utility.getConfirmPasswordDoms();
                const postalCodeInputs = utility.getPostalCodeDoms();
                const creditCardSecurityCodeInputs = utility.getSecurityCodeDoms();
                const expiryInputs = utility.getExpiryDoms();
                this.populateInputs({
                    emailDom: emailInputs,
                    usernameDom: usernameInputs,
                    passwordDom: passwordInputs,
                    confirmPasswordDom: confirmPasswordInputs,
                    firstNameDom: firstNameInputs,
                    lastNameDom: lastNameInputs,
                    creditCardDom: creditCardInputs,
                    postalCodeDom: postalCodeInputs,
                    securityCodeDom: creditCardSecurityCodeInputs,
                    expirationDom: expiryInputs,
                });
            }
        }
        // eslint-disable-next-line no-undef
        const observer = new MutationObserver(onPageMutation.bind(this));
        const config = { attributes: true, childList: true, subtree: true };
        observer.observe(document, config);
    }

    populateInputs(doms) {
        const {
            emailDom, usernameDom, passwordDom, confirmPasswordDom, firstNameDom, lastNameDom,
            creditCardDom, postalCodeDom, securityCodeDom, expirationDom,
        } = doms;
        if (firstNameDom && Array.isArray(firstNameDom)) {
            new Set(firstNameDom).forEach((eachFirstNameDom) => {
                if (!InputFieldManager.isInputFieldAlreadyEnlisted(eachFirstNameDom)) {
                    const inputField = new InputFieldManager({ inputDom: eachFirstNameDom });
                    this.firstNameInput.add(inputField);
                }
            });
        }
        if (emailDom && Array.isArray(emailDom)) {
            new Set(emailDom).forEach((eachEmailDom) => {
                if (!InputFieldManager.isInputFieldAlreadyEnlisted(eachEmailDom)) {
                    const inputField = new InputFieldManager({ inputDom: eachEmailDom });
                    this.emailInput.add(inputField);
                }
            });
        }
        if (passwordDom && Array.isArray(passwordDom)) {
            new Set(passwordDom).forEach((eachPasswordDom) => {
                if (!InputFieldManager.isInputFieldAlreadyEnlisted(eachPasswordDom)) {
                    const inputField = new InputFieldManager({ inputDom: eachPasswordDom });
                    this.passwordInput.add(inputField);
                }
            });
        }
        if (confirmPasswordDom && Array.isArray(confirmPasswordDom)) {
            new Set(confirmPasswordDom).forEach((eachConfirmPasswordDom) => {
                if (!InputFieldManager.isInputFieldAlreadyEnlisted(eachConfirmPasswordDom)) {
                    const inputField = new InputFieldManager({ inputDom: eachConfirmPasswordDom });
                    this.confirmPasswordInput.add(inputField);
                }
            });
        }
        if (lastNameDom && Array.isArray(lastNameDom)) {
            new Set(lastNameDom).forEach((eachLastNameDom) => {
                if (!InputFieldManager.isInputFieldAlreadyEnlisted(eachLastNameDom)) {
                    const inputField = new InputFieldManager({ inputDom: eachLastNameDom });
                    this.lastNameInput.add(inputField);
                }
            });
        }
        if (usernameDom && Array.isArray(usernameDom)) {
            new Set(usernameDom).forEach((eachUsernameDom) => {
                if (!InputFieldManager.isInputFieldAlreadyEnlisted(eachUsernameDom)) {
                    const inputField = new InputFieldManager({ inputDom: eachUsernameDom });
                    this.usernameInput.add(inputField);
                }
            });
        }
        if (creditCardDom && Array.isArray(creditCardDom)) {
            new Set(creditCardDom).forEach((eachCreditCardDom) => {
                if (!InputFieldManager.isInputFieldAlreadyEnlisted(eachCreditCardDom)) {
                    const inputField = new InputFieldManager({ inputDom: eachCreditCardDom });
                    this.creditCardInput.add(inputField);
                }
            });
        }
        if (postalCodeDom && Array.isArray(postalCodeDom)) {
            new Set(postalCodeDom).forEach((eachPostalCodeDom) => {
                if (!InputFieldManager.isInputFieldAlreadyEnlisted(eachPostalCodeDom)) {
                    const inputField = new InputFieldManager({ inputDom: eachPostalCodeDom });
                    this.postalCodeInput.add(inputField);
                }
            });
        }
        if (securityCodeDom && Array.isArray(securityCodeDom)) {
            new Set(securityCodeDom).forEach((eachSecurityCodeDom) => {
                if (!InputFieldManager.isInputFieldAlreadyEnlisted(eachSecurityCodeDom)) {
                    const inputField = new InputFieldManager({ inputDom: eachSecurityCodeDom });
                    this.securityCodeInput.add(inputField);
                }
            });
        }
        if (expirationDom && Array.isArray(expirationDom)) {
            new Set(expirationDom).forEach((eachExpirationDom) => {
                if (!InputFieldManager.isInputFieldAlreadyEnlisted(eachExpirationDom)) {
                    const inputField = new InputFieldManager({ inputDom: eachExpirationDom });
                    this.expirationInput.add(inputField);
                }
            });
        }
        const pageInputs = [...new Set([]
            .concat(...this.emailInput)
            .concat(...this.passwordInput)
            .concat(...this.confirmPasswordInput)
            .concat(...this.firstNameInput)
            .concat(...this.lastNameInput)
            .concat(...this.usernameInput)
            .concat(...this.creditCardInput)
            .concat(...this.postalCodeInput)
            .concat(...this.securityCodeInput)
            .concat(...this.expirationInput))].filter((inputButton) => inputButton != null);
        this.heladacButtons = pageInputs
            .map((inputButton) => inputButton.heladacButton.heladacDom);
        this.heladacDialog = new HeladacDialog(this);
        pageInputs.forEach((pageInput) => {
            pageInput.inputDom.addEventListener('focus', () => { this.heladacDialog.setHeladacAsStillVisible(); });
        });
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
    const creditCardInputs = utility.getCreditCardDoms();
    const confirmPasswordInputs = utility.getConfirmPasswordDoms();
    const postalCodeInputs = utility.getPostalCodeDoms();
    const securityCodeInputs = utility.getSecurityCodeDoms();
    const expiryInputs = utility.getExpiryDoms();
    const allHeladacInputs = [].concat(usernameInputs).concat(emailInputs).concat(passwordInputs)
        .concat(firstNameInputs)
        .concat(lastNameInputs)
        .concat(creditCardInputs)
        .concat(confirmPasswordInputs)
        .concat(postalCodeInputs)
        .concat(securityCodeInputs)
        .concat(expiryInputs);

    HeladacDialog.closeAllDialogs();
    if (allHeladacInputs.length > 0) {
        const isAlreadyEnliseted = allHeladacInputs
            .some((input) => InputFieldManager.isInputFieldAlreadyEnlisted(input));
        if (!isAlreadyEnliseted) {
            const pageManager = new PageManager(
                {
                    emailDom: emailInputs.length > 0 ? emailInputs : null,
                    usernameDom: usernameInputs.length > 0 ? usernameInputs : null,
                    passwordDom: passwordInputs.length > 0 ? passwordInputs : null,
                    confirmPasswordDom: confirmPasswordInputs.length > 0
                        ? confirmPasswordInputs : null,
                    firstNameDom: firstNameInputs.length > 0 ? firstNameInputs : null,
                    lastNameDom: lastNameInputs.length > 0 ? lastNameInputs : null,
                    creditCardDom: creditCardInputs.length > 0 ? creditCardInputs : null,
                    postalCodeDom: postalCodeInputs.length > 0 ? postalCodeInputs : null,
                    securityCodeDom: securityCodeInputs.length > 0 ? securityCodeInputs : null,
                    expirationDom: expiryInputs.length > 0 ? expiryInputs : null,
                },
            );
            pageManager.initialize();
        }
    } else if (emailInputs.length > 0) {
        const pageManager = new PageManager({ emailDom: emailInputs });
        pageManager.initialize();
    }
}

setTimeout(() => {
    main();
}, 1000);

console.log('Background injected back again');
