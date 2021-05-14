/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
class Utility {
    #callBackFunctions = {};

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
}

const utility = new Utility();
export default utility;
