import HeladacExtensionApi from './Api';

class CredentialApi extends HeladacExtensionApi {
    constructor() {
        super();
        const url = `${this.rootUrl}/api/credential/`;
        this.url = url;
    }

    async createCredential(credentialArgs) {
        let pageUrl = window.location.href;
        let domain = window.location.host;
        const { url } = this;// +'credGet'
        const header = await this.getHeader();

        let processRequest = (postData) => {
            header['Content-Type'] = 'application/json'
            return fetch(url,
                {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify(postData),
                });
        };

        if (credentialArgs != null) {
            pageUrl = credentialArgs.url;
            domain = credentialArgs.domain;
            const postData = {
                domain,
                fullUri: pageUrl
            }
            return processRequest(postData)
        } else if(chrome && chrome.tabs) {
            let retValue = new Promise((resolve, reject) => {
                chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                    
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
        } else {
            debugger
            let postData = {
                domain,
                fullUri: pageUrl
            }
            return processRequest(postData)
        }

        
        
    }

    async getServiceCredential (credentialArgs) {
        debugger
        let pageUrl = window.location.href
        let domain = window.location.host
        let url = this.url;//+'credGet'
        let header = await this.getHeader()
        
        let processRequest = (postData) => {
            debugger
            let query = Object.keys(postData)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(postData[k]))
             .join('&');
            header['Content-Type'] = 'application/json'
            let requestUrl = url
            requestUrl = requestUrl.substring(0, requestUrl.length -1) +'?'+query
            
            return fetch(requestUrl,
                {
                    method: 'GET',
                    headers: header
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
        } else if(chrome && chrome.tabs) {
            debugger
            let retValue = new Promise((resolve, reject) => {
                debugger
                chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                    
                    try {
                        if(tabs.length > 0) {
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
                        } else {
                            let postData = {
                                domain,
                                fullUri: pageUrl
                            }
                            return processRequest(postData)
                        }
                    }
                    catch(err) {
                        reject(err)
                    }
                });
            })

            return retValue;
        }
        else {
            debugger
            let postData = {
                domain,
                fullUri: pageUrl
            }
            return processRequest(postData)
        }
        
    }
}

export default CredentialApi;
