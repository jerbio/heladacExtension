import { ApplicationPaths } from '../authorization/ApiAuthorizationConstants';
import accountAuthorization from './AccountAuthorization';

class HeladacExtensionApi {
    constructor() {
        this.rootUrl = ApplicationPaths.RootPath;
    }

    // eslint-disable-next-line class-methods-use-this
    async getHeader() {
        const header = await accountAuthorization.getHeader();
        return header;
    }
}

export default HeladacExtensionApi;
