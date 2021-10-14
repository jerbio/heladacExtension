/* eslint-disable no-param-reassign */
import utility from './utility';
import CredentialApi from './services/CredentialApi';

class HeladacDialog {
    #credential = null;

    #pageManager = null;

    constructor(pageManager) {
        const genereatedHeladacDom = HeladacDialog.getHeladacContainer();
        this.heladacInFocus = false;
        if (genereatedHeladacDom.isNew) {
            this.UiDialogDom = genereatedHeladacDom.dom;
            this.credentialApi = new CredentialApi();
            this.#credential = null;
            if (pageManager) {
                this.#pageManager = pageManager;
            }
            this.initialize();
        }
    }

    subscribToeBubble(dom) {
        if (dom) {
            if (dom.childNodes && dom.childNodes.length > 0) {
                // eslint-disable-next-line no-restricted-syntax
                for (const childNode of dom.childNodes) {
                    this.subscribToeBubble(childNode);
                }
            }

            if (dom.setAttribute) {
                dom.setAttribute('tabindex', '0');
                dom.addEventListener('focus', () => {
                    if (document.activeElement === dom) {
                        this.heladacInFocus = true;
                    }
                });
                dom.addEventListener('blur', () => {
                    this.heladacInFocus = false;
                    this.delayedClose();
                });
            }
        }
    }

    get pageManager() {
        return this.#pageManager;
    }

    get credential() {
        return this.#credential;
    }

    setHeladacAsStillVisible() {
        this.heladacInFocus = true;
    }

    bindCredentials() {
        if (this.newCredentialButton) {
            this.newCredentialButton.addEventListener('click', () => {
                this.credentialApi.createCredential().then(async (response) => {
                    let data = null;
                    try {
                        data = await response.json();
                    } catch (err) {
                        console.log(err);
                    }

                    if (data) {
                        this.#credential = data;
                        this.updateCredentialUi(this.#credential);
                    }
                });
            });
        }
    }

    bindPopulate() {
        if (this.pageManager) {
            this.populateButton.addEventListener('click', () => {
                const { pageManager } = this;
                const { credential } = this;
                if (pageManager && credential) {
                    if (pageManager.lastNameInput && pageManager.lastNameInput.size > 0) {
                        pageManager.lastNameInput.forEach((lastNameInput) => {
                            lastNameInput.value = credential.lastName;
                        });
                    }
                    if (pageManager.firstNameInput && pageManager.firstNameInput.size > 0) {
                        pageManager.firstNameInput.forEach((firstNameInput) => {
                            firstNameInput.value = credential.firstName;
                        });
                    }
                    if (pageManager.passwordInput && pageManager.passwordInput.size > 0) {
                        pageManager.passwordInput.forEach((passwordInput) => {
                            passwordInput.value = credential.decryptedPasssword;
                        });
                    }
                    if (pageManager.confirmPasswordInput
                        && pageManager.confirmPasswordInput.size > 0) {
                        pageManager.confirmPasswordInput.forEach((confirmPasswordInput) => {
                            confirmPasswordInput.value = credential.decryptedPasssword;
                        });
                    }
                    if (pageManager.emailInput && pageManager.emailInput.size > 0) {
                        pageManager.emailInput.forEach((emailInput) => {
                            emailInput.value = credential.email;
                        });
                    }

                    if (pageManager.usernameInput && pageManager.usernameInput.size > 0) {
                        pageManager.usernameInput.forEach((usernameInput) => {
                            usernameInput.value = credential.username;
                        });
                    }

                    if (pageManager.creditCardInput && pageManager.creditCardInput.size > 0) {
                        pageManager.creditCardInput.forEach((creditCardInput) => {
                            creditCardInput.value = credential.creditCard.ccNumber;
                        });
                    }

                    if (pageManager.postalCodeInput && pageManager.postalCodeInput.size > 0) {
                        pageManager.postalCodeInput.forEach((postalCodeInput) => {
                            postalCodeInput.value = credential.creditCard.postal;
                        });
                    }

                    if (pageManager.securityCodeInput && pageManager.securityCodeInput.size > 0) {
                        pageManager.securityCodeInput.forEach((securityCodeInput) => {
                            securityCodeInput.value = credential.creditCard.cvvCode;
                        });
                    }

                    if (pageManager.expirationInput && pageManager.expirationInput.size > 0) {
                        pageManager.expirationInput.forEach((expirationInput) => {
                            expirationInput.value = `${credential.creditCard.expiryMonth}/${credential.creditCard.expiryYear}`;
                        });
                    }
                }
            });
        }
    }

    bindCloseButton() {
        if (this.pageManager && this.closeButton) {
            this.closeButton.addEventListener('click', () => { this.closeDialog(); });
        }
        this.UiDialogDom.setAttribute('tabindex', '0');
        this.UiDialogDom.addEventListener('blur', () => {
            this.delayedClose();
        });

        document.onkeydown = (keyEvent) => {
            const evt = keyEvent || window.event;
            let isEscape = false;
            if ('key' in evt) {
                isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
            } else {
                isEscape = (evt.keyCode === 27);
            }
            if (isEscape) {
                this.closeDialog();
            }
        };
    }

    updateCredentialUi(credentialArg) {
        let credential = credentialArg;
        if (!credential) {
            credential = this.#credential;
        }
        if (credential) {
            const {
                username, decryptedPasssword, email,
            } = credential;
            if (username) {
                this.usernameInput.value = username;
            }

            if (decryptedPasssword) {
                this.passwordInput.value = decryptedPasssword;
            }

            if (email) {
                this.emailInput.value = email;
            }
        }
    }

    delayedClose() {
        setTimeout(() => {
            if (!this.heladacInFocus) {
                this.closeDialog();
            }
        }, 500);
    }

    // eslint-disable-next-line class-methods-use-this
    sanitizeCredentials(credential) {
        if (credential && credential.creditCard_DB) {
            const creditCard = credential.creditCard_DB;
            // eslint-disable-next-line no-param-reassign
            credential.creditCard = creditCard;
            // eslint-disable-next-line no-param-reassign
            delete credential.creditCard_DB;
        }

        return credential;
    }

    initialize() {
        this.enlistDialog();
        this.usernameInput = utility.getDomDrCreateNew(`usernameInput${utility.generateUUID()}`, 'input').dom;
        this.usernameInput.setAttribute('placeholder', 'username');
        const usernameContainer = utility.getDomDrCreateNew(`usernameContainer${utility.generateUUID()}`).dom;
        usernameContainer.appendChild(this.usernameInput);
        this.passwordInput = utility.getDomDrCreateNew(`passwordInput${utility.generateUUID()}`, 'input').dom;
        this.passwordInput.setAttribute('placeholder', 'password');
        const passwordContainer = utility.getDomDrCreateNew(`passwordInputContainer${utility.generateUUID()}`).dom;
        passwordContainer.appendChild(this.passwordInput);
        this.emailInput = utility.getDomDrCreateNew(`emailInput${utility.generateUUID()}`, 'input').dom;
        const emailContainer = utility.getDomDrCreateNew(`emailContainer${utility.generateUUID()}`).dom;
        this.emailInput.setAttribute('placeholder', 'email');
        emailContainer.appendChild(this.emailInput);
        this.phoneNumberInput = utility.getDomDrCreateNew(`phoneNumberInput${utility.generateUUID()}`, 'input').dom;
        this.saveButton = utility.getDomDrCreateNew(`saveButton${utility.generateUUID()}`, 'button').dom;
        this.saveButton.innerHTML = 'Save';
        const saveButtonContainer = utility.getDomDrCreateNew(`saveButtonContainer${utility.generateUUID()}`).dom;
        saveButtonContainer.appendChild(this.saveButton);

        this.closeButton = utility.getDomDrCreateNew(`closeButton${utility.generateUUID()}`).dom;
        this.closeButton.innerHTML = 'Close';
        const closeButtonContainer = utility.getDomDrCreateNew(`closeButtonContainer${utility.generateUUID()}`).dom;
        closeButtonContainer.appendChild(this.closeButton);

        this.newCredentialButton = utility.getDomDrCreateNew(`generateCredential${utility.generateUUID()}`, 'button').dom;
        this.newCredentialButton.innerHTML = 'New Credentials';

        this.populateButton = utility.getDomDrCreateNew(`Populate${utility.generateUUID()}`, 'button').dom;
        this.populateButton.innerHTML = 'Populate';

        this.credentialApi.getServiceCredential().then(async (response) => {
            let data = null;
            try {
                data = await response.json();
            } catch (err) {
                console.log(err);
            }
            if (data) {
                this.#credential = this.sanitizeCredentials(data);
                this.updateCredentialUi(this.#credential);
            }
            console.log(data);
        });
        const newCredentialButtonContainer = utility.getDomDrCreateNew(`generateCredentialContainer${utility.generateUUID()}`).dom;
        newCredentialButtonContainer.appendChild(this.newCredentialButton);

        const populateButtonContainer = utility.getDomDrCreateNew(`populateButtonContainer${utility.generateUUID()}`).dom;
        populateButtonContainer.appendChild(this.populateButton);

        this.UiDialogDom.appendChild(usernameContainer);
        this.UiDialogDom.appendChild(emailContainer);
        this.UiDialogDom.appendChild(passwordContainer);
        this.UiDialogDom.appendChild(saveButtonContainer);
        this.UiDialogDom.appendChild(newCredentialButtonContainer);
        this.UiDialogDom.appendChild(populateButtonContainer);
        this.UiDialogDom.appendChild(closeButtonContainer);
        this.subscribToeBubble(this.UiDialogDom);

        this.bindPopulate();
        this.bindCloseButton();
    }

    renderDialog(inputButton) {
        if (inputButton) {
            const bodyRect = document.body.getBoundingClientRect();
            const inputRect = inputButton.getBoundingClientRect();
            const topOffset = inputRect.top - bodyRect.top;
            const leftOffset = inputRect.left - bodyRect.left;
            this.UiDialogDom.style.top = `${topOffset}px`;
            this.UiDialogDom.style.left = `${leftOffset}px`;
            this.UiDialogDom.style.position = 'absolute';

            document.body.appendChild(this.UiDialogDom);
            this.bindCredentials();
            this.UiDialogDom.focus();
        }
    }

    closeDialog() {
        if (this.UiDialogDom.parentNode) {
            this.UiDialogDom.parentNode.removeChild(this.UiDialogDom);
        }
    }

    enlistDialog() {
        if (!HeladacDialog.dialogs) {
            HeladacDialog.dialogs = new Set();
        }
        HeladacDialog.dialogs.add(this);
    }

    static closeAllDialogs() {
        if (!HeladacDialog.dialogs) {
            HeladacDialog.dialogs = new Set();
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const dialog of HeladacDialog.dialogs) {
            dialog.closeDialog();
        }

        const heladacDom = HeladacDialog.getHeladacContainer().dom;
        if (heladacDom.parentNode) {
            heladacDom.parentNode.removeChild(heladacDom);
        }
    }

    static getHeladacContainer() {
        const retValue = utility.getDomDrCreateNew('heladacDialog');
        return retValue;
    }
}

export default HeladacDialog;
