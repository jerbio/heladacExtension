import authService from '../authorization/AuthorizeService'

class AccountAuthorization {
    constructor() {
        this.userCredentials = null
    }

    /**
     * Function checks if credential has alread been set
     */
    isCredentialValid(credentials) {
        debugger
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
                debugger
                this.userCredentials = result['loginAuthentication']
                resolve(this.userCredentials)
              });
        })
        return retValue
    }

    async clearCredentials() {
        let retValue = new Promise((resolve, reject) => {
            chrome.storage.sync.set({'loginAuthentication': null}, (result) => {
                debugger
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

    /**
     * function returns the necessary to make request to back end
     * @return {Promise}
     */
    async getHeader() {
        let retValue = new Promise((resolve, reject) => {
            this.readCredentials().then((credentialResult) => {
                debugger
                if(credentialResult) {
                    if(this.isCredentialValid(credentialResult)) {
                        let credentials = this.userCredentials
                        let header = { 'Authorization': `Bearer ${credentials.access_token}` }
                        return resolve(header)
                    } else {
                        this.clearCredentials()
                    }
                }
                //only get to the section if cannot authenticate user
                this.signIn().then((signInSuccess) => {
                    debugger
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

    async signIn() {
        let thisAccountAuthorization = this;
        debugger
        return authService.ensureUserManagerInitialized().then(() => {
            // let userManager = authService.userManager
            debugger
            return authService.userManager
            // .signinSilent((userCred) => {
            //     debugger
            // })
            // .signinSilent(window.location.href)
            // .signinPopupCallback(window.location.href)
            // .signinRedirect()
            .signinSilent()
            .then((user) => {
                debugger
                return thisAccountAuthorization.saveCredentials(user)
            })
            .catch((userCred) =>{
                debugger
                return authService.userManager.signinPopup()
                .then((userCred) => {
                    debugger
                })
                .catch((errResponse) => {
                    debugger
                })
            })
            
        })
    }
}
const accountAuthorization = new AccountAuthorization()
export default accountAuthorization;