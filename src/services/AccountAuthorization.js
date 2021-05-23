import authService from '../authorization/AuthorizeService';

class AccountAuthorization {
    constructor() {
        this.userCredentials = null;
    }

    /**
     * Function checks if credential has alread been set
     */
    // eslint-disable-next-line class-methods-use-this
    isCredentialValid(credentials) {
        let retValue = (credentials || false);
        if (retValue) {
            const expireTimeMs = credentials.expires_at * 1000;
            const currentTime = Date.now();
            retValue = currentTime < expireTimeMs;
        }

        return retValue;
    }

    /**
     * function retrieves the credentials of the current user
     *
     */
    async readCredentials() {
        const retValue = new Promise((resolve) => {
            chrome.storage.sync.get(['loginAuthentication'], (result) => {
                this.userCredentials = result.loginAuthentication;
                resolve(this.userCredentials);
            });
        });
        return retValue;
    }

    // eslint-disable-next-line class-methods-use-this
    async clearCredentials() {
        const retValue = new Promise((resolve, reject) => {
            chrome.storage.sync.set({ loginAuthentication: null }, (result) => {
                try {
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            });
        });
        return retValue;
    }

    /**
     * Function persists the provided credentials to the chrome storage
     * @param {*} signInCredentials crede
     * @returns {Promise} then returns the credentials persisted, and
     * catch gets returned if we cannot verify the persisting of the credentials.
     */
    async saveCredentials(signInCredentials) {
        const retValue = new Promise((resolve, reject) => {
            chrome.storage.sync.set({ loginAuthentication: signInCredentials },
                () => {
                    console.log(`Value is set to ${signInCredentials}`);
                });
            this.readCredentials().then((credential) => {
                resolve(credential);
            }).catch((err) => {
                reject(err);
            });
        });
        return retValue;
    }

    /**
     * function returns the necessary to make request to back end
     * @return {Promise}
     */
    async getHeader() {
        const retValue = new Promise((resolve, reject) => {
            this.readCredentials().then((credentialResult) => {
                if (credentialResult) {
                    if (this.isCredentialValid(credentialResult)) {
                        const credentials = this.userCredentials;
                        const header = { Authorization: `Bearer ${credentials.access_token}` };
                        return resolve(header);
                    }
                }
                // only get to the section if cannot authenticate user
                return this.signIn().then(() => {
                    // eslint-disable-next-line no-shadow
                    this.readCredentials().then((credentialResult) => {
                        if (credentialResult) {
                            if (this.isCredentialValid(credentialResult)) {
                                const credentials = this.userCredentials;
                                const header = { Authorization: `Bearer ${credentials.access_token}` };
                                return resolve(header);
                            }
                            return reject(Error('invalid credentials'));
                        }
                        return reject(Error('credentials not found'));
                    });
                }).catch((err) => {
                    reject(err);
                });
            });
        });

        return retValue;
    }

    /**
     * Function performs a sign in to heladac servers, and returns the necessary
     * user authorization credentials
     * @return {Promise}
     */
    async signIn() {
        const thisAccountAuthorization = this;
        return authService.ensureUserManagerInitialized().then(() => authService.userManager
            .signinSilent()
            .then((user) => thisAccountAuthorization.saveCredentials(user))
            .catch(() => authService.userManager.signinPopup()));
    }
}
const accountAuthorization = new AccountAuthorization();
export default accountAuthorization;
