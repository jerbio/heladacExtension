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

        const processRequest = (postData) => {
            header['Content-Type'] = 'application/json';
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
                fullUri: pageUrl,
            };
            return processRequest(postData);
        } if (chrome && chrome.tabs) {
            const retValue = new Promise((resolve, reject) => {
                chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
                    try {
                        pageUrl = tabs[0].url;
                        const postData = {
                            fullUri: pageUrl,
                        };

                        processRequest(postData)
                            .then((response) => resolve(response))
                            .catch((err) => reject(err));
                    } catch (err) {
                        reject(err);
                    }
                });
            });

            return retValue;
        }
        const postData = {
            domain,
            fullUri: pageUrl,
        };
        return processRequest(postData);
    }

    async getServiceCredential(credentialArgs) {
        let pageUrl = window.location.href;
        let domain = window.location.host;
        const { url } = this;// +'credGet'
        const header = await this.getHeader();

        const processRequest = (postData) => {
            const query = Object.keys(postData)
                .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(postData[k])}`)
                .join('&');
            header['Content-Type'] = 'application/json';
            let requestUrl = url;
            requestUrl = `${requestUrl.substring(0, requestUrl.length - 1)}?${query}`;

            return fetch(requestUrl,
                {
                    method: 'GET',
                    headers: header,
                });
        };

        if (credentialArgs != null) {
            pageUrl = credentialArgs.url;
            domain = credentialArgs.domain;
            const postData = {
                domain,
                fullUri: pageUrl,
            };
            return processRequest(postData);
        } if (chrome && chrome.tabs) {
            const retValue = new Promise((resolve, reject) => {
                // eslint-disable-next-line consistent-return
                chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
                    try {
                        if (tabs.length > 0) {
                            pageUrl = tabs[0].url;
                            const postData = {
                                fullUri: pageUrl,
                            };

                            processRequest(postData)
                                .then((response) => resolve(response))
                                .catch((err) => reject(err));
                        } else {
                            const postData = {
                                domain,
                                fullUri: pageUrl,
                            };
                            return processRequest(postData);
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
            });

            return retValue;
        }
        const postData = {
            domain,
            fullUri: pageUrl,
        };
        return processRequest(postData);
    }
}

export default CredentialApi;
