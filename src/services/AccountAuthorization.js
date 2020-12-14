import authService from '../authorization/AuthorizeService'

class AccountAuthorization {
    constructor() {
        this.userCredentials = null
    }

    isCredentialPresent() {
        let retValue = (this.userCredentials || false) && true;
        return retValue;
    }

    isCredentialActive() {
        return true
    }

    /**
     * function rtrieves the credentials of the current user
     * 
     */
    async readCredentials() {
        await chrome.storage.sync.get(['login'], (result) => {
            // debugger
            console.log('Value currently is ' + result['login']);
            this.userCredentials = result['login']
          });
    }

    async saveCredentials(signInCredentials) {
        debugger
        await chrome.storage.sync.set({'login': signInCredentials}, () => {
            console.log('Value is set to ' + signInCredentials);
          });
          this.readCredentials()
          
    }

    /**
     * function returns the necessary to make request to back end
     * @return {Promise}
     */
    async getHeader() {
        let retValue = new Promise((resolve, reject) => {
            debugger
            if(this.isCredentialPresent() && this.isCredentialActive()) {
                 this.readCredentials().then((crdentialResult) => {
                    let credentials = this.userCredentials
                    let header = { 'Authorization': `Bearer ${credentials.access_token}` }
                    resolve(header)
                })
                
            } else {
                debugger
                return this.signIn().then((signInSuccess) => {
                    debugger
                    return this.getHeader().then((response) => {
                        resolve(response)
                    }).catch((err) => {
                        reject(err)

                    })
                })
            }
        })
        

        return retValue;
    }

    getLoggedInUser() {

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
                thisAccountAuthorization.saveCredentials(user)
                // console.log("LOG IN IS SUCCESSFUL")
                // let header = { 'Authorization': `Bearer ${user.access_token}` }
                // let url = 'https://localhost:44334/api/mail/usermails'
                // console.log(header)
                // let response = fetch(url,{
                //     headers: header
                // }).then((response) => {
                //     let retValue = response.json().then((processedMail) => {
                //         debugger
                //         console.log(processedMail)
                //     })
                // })
                debugger
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