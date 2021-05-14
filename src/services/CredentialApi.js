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
        }

        const retValue = new Promise((resolve, reject) => {
            // eslint-disable-next-line no-undef
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
}

export default CredentialApi;
