import {ApplicationPaths} from '../authorization/ApiAuthorizationConstants'
import accountAuthorization from '../services/AccountAuthorization'

class HeladacExtensionApi {
    constructor() {
        this.rootUrl = ApplicationPaths.RootPath;
    }

    async getHeader() {
        let header = await accountAuthorization.getHeader();
        return header
    }
}

export default HeladacExtensionApi;
