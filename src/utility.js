/* eslint-disable class-methods-use-this */
/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
class Utility {
    #callBackFunctions = {};

    #inputSelector = {
        firstName: ['input[name="firstName"]', 'input[name="firstname"]'].join(','),
        lastName: ['input[name="lastName"]', 'input[name="lastname"]'].join(','),
        email: ['input[type="email"]', 'input[name="email"]'].join(','),
        password: ['input[type="password"]', 'input[type="Password"]'].join(','),
        confirmPassword: ['input[type="ConfirmPasswd"]'].join(','),
        creditCardNumber: ['input[type="creditCardNumber"]', 'input[name="creditCardNumber"]'].join(','),
        expiry: ['input[type="creditExpirationMonth"]', 'input[name="creditExpirationMonth"]'].join(','),
        expiryMonth: ['input[type="creditExpirationMonth"]', 'input[name="creditExpirationMonth"]'].join(','),
        expiryYear: ['input[type="creditExpirationMonth"]', 'input[name="creditExpirationMonth"]'].join(','),
        securityCode: ['input[type="creditCardSecurityCode"]', 'input[name="creditCardSecurityCode"]'].join(','),
        postalCode: ['input[type="creditZipcode"]', 'input[name="creditZipcode"]'].join(','),
        username: ['input[type="username"]', 'input[name="username"]'].join(','),
    }

    sendInputKeyPress(inputDom, word) {
        if (inputDom) {
            inputDom.focus();
            // inputDom.onkeydown = e => alert(e.key);
            if (this.isString(word)) {
                // eslint-disable-next-line no-restricted-syntax
                for (const char of word) {
                    // eslint-disable-next-line no-undef
                    inputDom.dispatchEvent(new KeyboardEvent('keydown', { key: char }));
                }
            }
        }
    }

    subscription(callBack) {
        if (this.isFunction(callBack)) {
            const retValue = this.generateUUID();
            this.#callBackFunctions[retValue] = {
                function: callBack,
            };
            return retValue;
        }

        throw error('callback is not a function');
    }

    getSubscription(callBackId) {
        if (this.#callBackFunctions[callBackId]) {
            return this.#callBackFunctions[callBackId].function;
        }
        throw error('invalid subscription id');
    }

    // eslint-disable-next-line class-methods-use-this
    generateUUID() {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === 'function') {
            const { performance } = window;
            d += performance.now(); // use high-precision timer if available
        }
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            // eslint-disable-next-line no-bitwise
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            // eslint-disable-next-line eqeqeq
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    // eslint-disable-next-line class-methods-use-this
    isFunction(arg) {
        return typeof arg === 'function';
    }

    isString(arg) {
        return typeof arg === 'string';
    }

    getDomDrCreateNew(domId, type = 'div') {
        let domObj = null;
        let isNew = false;
        if (domId) {
            domObj = document.getElementById(domId);
        }

        if (!domObj) {
            isNew = true;
            if (type !== 'svg') {
                domObj = document.createElement(type);
            } else {
                domObj = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            }

            const domElementId = domId || `heladac-dom-${this.generateUUID()}`;
            if (domElementId) {
                domObj.setAttribute('id', domElementId);
            }
        }

        const retValue = {
            dom: domObj,
            isNew,
        };

        return retValue;
    }

    getfirstNameDoms() {
        const retValue = [];
        document.querySelectorAll(this.#inputSelector.firstName)
            .forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getLastNameDoms() {
        const retValue = [];
        document.querySelectorAll(this.#inputSelector.lastName)
            .forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getEmailDoms() {
        const retValue = [];
        document.querySelectorAll(this.#inputSelector.email)
            .forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getCreditCardDoms() {
        const retValue = [];
        document.querySelectorAll(this.#inputSelector.creditCardNumber)
            .forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getExpiryDoms() {
        const retValue = [];
        document.querySelectorAll(this.#inputSelector.expiry)
            .forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getSecurityCodeDoms() {
        const retValue = [];
        document.querySelectorAll(this.#inputSelector.securityCode)
            .forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getPostalCodeDoms() {
        const retValue = [];
        document.querySelectorAll(this.#inputSelector.postalCode)
            .forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getPasswordDoms() {
        const retValue = [];
        document.querySelectorAll(this.#inputSelector.password)
            .forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getConfirmPasswordDoms() {
        const retValue = [];
        document.querySelectorAll(this.#inputSelector.confirmPassword)
            .forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getUsernameDoms() {
        const retValue = [];
        document.querySelectorAll(this.#inputSelector.username)
            .forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getNames() {
        let retValue = [];
        retValue = retValue.concat(this.getfirstNameDoms().concat(this.getLastNameDoms()));
        return retValue;
    }
}

const utility = new Utility();
export default utility;
