import HeladacExtensionApi from './Api';
import Constants from '../Constants';

class MailApi extends HeladacExtensionApi {
    async getMails(params) {
        const { pageCount = Constants.pageCount, pageIndex = 0 } = params || {};
        const header = await this.getHeader();
        const url = `${this.rootUrl}/api/mail/usermails`;
        const getParams = { pageCount, pageIndex };

        let requestUrl = url;

        const query = Object.keys(getParams)
            .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(getParams[k])}`)
            .join('&');

        requestUrl = `${requestUrl}?${query}`;
        const retValue = fetch(requestUrl, {
            headers: header,
        }).then((response) => {
            const mailResults = response.json().then((processedMail) => {
                console.log(processedMail);
                return processedMail;
            });

            return mailResults;
        });

        return retValue;
    }
}

export default MailApi;
