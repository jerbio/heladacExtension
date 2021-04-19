class Utility {
    constructor() {
        this._callBackFunctions = {}
    }
    
    subscription(callBack) {
        if (this.isFunction(callBack)) {
            let retValue = this.generateUUID()
            this._callBackFunctions[retValue] = {
                _function: callBack
            }
            return retValue
        }
        else {
            throw error('callback is not a function')
        }
    }

    getSubscription(callBackId) {
        if(this._callBackFunctions[callBackId]) {
            return this._callBackFunctions[callBackId]._function
        } else {
            throw error('invalid subscription id')
        }

    }

    generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    isFunction(arg) {
        return typeof arg === "function"
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
            
            let domElementId = domId ? domId : this.generateUUID();
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

const utility = new Utility()
export default utility;