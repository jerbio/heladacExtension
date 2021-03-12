import HeladacExtensionApi from './Api.js'
import Constants from '../Constants.js'
import { reject } from 'async';

class CredentialApi extends HeladacExtensionApi {
    constructor() {
        super();
        let url = this.rootUrl + '/api/credential/'
        this.url = url
    }


    async createCredential (credentialArgs) {
        debugger
        let pageUrl = window.location.href
        let domain = window.location.host
        let url = this.url;//+'credGet'
        let header = await this.getHeader()

        let processRequest = (postData) => {
            header['Content-Type'] = 'application/json'
            return fetch(url,
                {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify(postData) 
                }
            )
        }



        if (credentialArgs != null) {
            pageUrl = credentialArgs.url
            domain = credentialArgs.domain
            let postData = {
                domain,
                fullUri: pageUrl
            }
            return processRequest(postData)
        }

        let retValue = new Promise((resolve, reject) => {
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                debugger
                try {
                let pageUrl = tabs[0].url;
                let postData = {
                    fullUri: pageUrl
                }

                processRequest(postData)
                    .then((response) => {
                        return resolve(response)
                    })
                    .catch((err) => {
                        return reject(err)
                    })
                } catch(err) {
                    reject(err)
                }
            });
        })


        

        return retValue;
        
    }
}

export default CredentialApi;