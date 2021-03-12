import HeladacExtensionApi from './Api.js'
import Constants from '../Constants.js'

class MailApi extends HeladacExtensionApi {
    async getMails (params) {
        let {pageCount = Constants.pageCount, pageIndex = 0} = params || {};
        let header = await this.getHeader();
        let url = this.rootUrl + '/api/mail/usermails'
        console.log(header)
        let retValue = fetch(url,{
            headers: header
        }).then((response) => {
            let retValue = response.json().then((processedMail) => {
                console.log(processedMail)
                return processedMail;
            })

            return retValue
        })

        return retValue;
    }
}

export default MailApi;