import authService from '../authorization/AuthorizeService'
import utility from '../utility'
import { ApplicationPaths, ApplicationName } from '../authorization//ApiAuthorizationConstants';
import { object } from 'prop-types';
import { reject } from 'async';

class AccountAuthorization {
    constructor() {
        this.userCredentials = null
        this.setupMessageUserSignInListener()
    }

    /**
     * Function checks if credential has alread been set
     */
    isCredentialValid(credentials) {
        let retValue = (credentials || false)
        if(retValue) {
            let expireTimeMs = credentials.expires_at*1000
            let currentTime = Date.now()
            retValue = currentTime < expireTimeMs
        }
        

        return retValue;
    }

    /**
     * function rtrieves the credentials of the current user
     * 
     */
    async readCredentials() {
        let retValue = new Promise((resolve, reject) => {
            chrome.storage.sync.get(['loginAuthentication'], (result) => {
                
                this.userCredentials = result['loginAuthentication']
                resolve(this.userCredentials)
              });
        })
        return retValue
    }

    async clearCredentials() {
        let retValue = new Promise((resolve, reject) => {
            chrome.storage.clear((result) => {
                
                try{
                    resolve(result)
                } 
                catch(err) {
                    reject(err)
                }
              })
        })
        return retValue
    }

    async saveCredentials(signInCredentials) {
        let retValue = new Promise((resolve, reject) => {
            chrome.storage.sync.set({'loginAuthentication': signInCredentials}, 
            () => {
                console.log('Value is set to ' + signInCredentials);
              });
              this.readCredentials().then((credential) => {
                  resolve(credential)
              }).catch((err) => {
                  reject(err)
              })
        })
        return retValue          
    }

    setupMessageUserSignInListener() {
        window.addEventListener("message", (event) => {
            const currentOrigin = window.location.origin
            let heladacChromeStore = event.data
                if (heladacChromeStore && 
                    heladacChromeStore.heladacDataTransfer && 
                    heladacChromeStore.heladacDataTransfer.oidcStoreTransfer && 
                    heladacChromeStore.heladacDataTransfer.oidcStoreTransfer.isUserFound &&
                    heladacChromeStore.heladacDataTransfer.oidcStoreTransfer.callBackId ) {
                        let callBackFunction = utility.getSubscription(heladacChromeStore.heladacDataTransfer.oidcStoreTransfer.callBackId )
                        ;
                        callBackFunction()
                }
        }, false);
    }

    /**
     * function returns the necessary to make request to back end
     * @return {Promise}
     */
    async getHeader() {
        let retValue = new Promise((resolve, reject) => {
            this.readCredentials().then((credentialResult) => {
                if(credentialResult) {
                    if(this.isCredentialValid(credentialResult)) {
                        let credentials = this.userCredentials
                        let header = { 'Authorization': `Bearer ${credentials.access_token}` }
                        return resolve(header)
                    }
                }
                //only get to the section if cannot authenticate user
                this.signIn().then((signInSuccess) => {
                    this.readCredentials().then((credentialResult) => {
                        if(credentialResult) {
                            if(this.isCredentialValid(credentialResult)) {
                                let credentials = this.userCredentials
                                let header = { 'Authorization': `Bearer ${credentials.access_token}` }
                                return resolve(header)
                            } else {
                                reject({
                                    reason: 'invalid credentials'
                                })    
                            }
                        } else {
                            reject({
                                reason: 'credentials not found'
                            })
                        }
                    })
                }).catch((err) => {
                    reject(err)
                })
            })
        })

        return retValue;
    }

    async manageNewChromeCredentialLogIn() {
        

        let retValue = new Promise((resolve, reject) => {
            try{
                let serverPath = ApplicationPaths.RootPath+'/mail'
                let iFrameElement = document.createElement("iframe"); 
                iFrameElement.setAttribute('src', serverPath);
                iFrameElement.style.display = 'none'
                document.body.appendChild(iFrameElement);
                let windowForPost = iFrameElement.contentWindow
                
                const oidcKeyString = 'oidc'
                let oidcObject = {}
                let oidcStore = authService.userManager._userStore._store
                let responseData = null
                Object.keys(oidcStore)
                    .filter((storageKey) => storageKey.includes(oidcKeyString))
                    .forEach((oidcKey) => {
                        oidcObject[oidcKey] = oidcStore[oidcKey]
                    })
                setTimeout(() => {
                    try {
                        let subScriptionId = utility.subscription(() => {
                            resolve(oidcObject)
                        })
                        let data = {
                            heladacChromeStore: {
                                oidcStore: oidcObject,
                                callBackId: subScriptionId
                            }
                        }
                        windowForPost.postMessage(data, ApplicationPaths.RootPath)
                        // windowForPost.postMessage(data, '*')
                        setTimeout(() => {
                            
                            resolve(data)},
                            10000)
                    }
                    catch(error) {
                        reject(error)
                    }
                }
                , 10000)
            }
            catch(error) {
                reject(error)
            }
        })
        
        return retValue
    }


    async signIn() {
        let thisAccountAuthorization = this;
        return authService.ensureUserManagerInitialized().then(() => {
            return authService.userManager
            .signinSilent()
            .then((user) => {
                
                return thisAccountAuthorization.saveCredentials(user)
            })
            .catch((err) =>{
                
                console.error(err)
                return authService.userManager.clearStaleState().then(() => {
                    return authService.ensureUserManagerInitialized().then(() => {
                        
                        return this.manageNewChromeCredentialLogIn().then((chromeStoreData) => {
                            
                            return authService.userManager.signinPopup().then((user) => {
                                
                                return thisAccountAuthorization.saveCredentials(user)
                            })
                            .catch((err) =>{
                                
                                console.error(err)
                                return authService.userManager.signinPopup();
                            })
                        })
                    })
                })
            })
        })
    }
}
const accountAuthorization = new AccountAuthorization()
export default accountAuthorization;