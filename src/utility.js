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

    getDomDrCreateNew(domId, type='div') {
        let domObj = null;
        let isNew = false;
        if (domId) {
            domObj = document.getElementById(domId);
        }
        
        if (!domObj) {
            isNew = true;
            if (type !== 'svg') {
                domObj= document.createElement (type);
            } else {
                domObj= document.createElementNS('http://www.w3.org/2000/svg', 'svg'); 
            }
            
            let domElementId = domId ? domId : 'heladac-dom-' + this.generateUUID();
            if (domElementId) {
                domObj.setAttribute('id', domElementId);
            }
        }

        const retValue = {
            dom: domObj,
            isNew: isNew,
        };

        return retValue;
    }
}

const utility = new Utility();
export default utility;
