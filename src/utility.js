/* eslint-disable class-methods-use-this */
/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
class Utility {
    #callBackFunctions = {};

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
        document.querySelectorAll('input[name="firstName"]').forEach((item) => { retValue.push(item); });
        document.querySelectorAll('input[name="firstname"]').forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getLastNameDoms() {
        const retValue = [];
        document.querySelectorAll('input[name="lastName"]').forEach((item) => { retValue.push(item); });
        document.querySelectorAll('input[name="lastname"]').forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getEmailDoms() {
        const retValue = [];
        document.querySelectorAll('input[type="email"]').forEach((item) => { retValue.push(item); });
        document.querySelectorAll('input[name="email"]').forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getPasswordDoms() {
        const retValue = [];
        document.querySelectorAll('input[type="password"]').forEach((item) => { retValue.push(item); });
        document.querySelectorAll('input[type="Password"]').forEach((item) => { retValue.push(item); });
        return retValue;
    }

    getUsernameDoms() {
        const retValue = [];
        document.querySelectorAll('input[type="username"]').forEach((item) => { retValue.push(item); });
        document.querySelectorAll('input[name="username"]').forEach((item) => { retValue.push(item); });
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
