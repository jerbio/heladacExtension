import { extend } from 'lodash';
import React, { Component } from 'react';
import MailPage from '../pages/MailPage'
import CredentialApi from '../services/CredentialApi.js';
class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: {
                credential: new CredentialApi()
            }
        }
    }

    onClickCreateCredentials() {
        debugger
        this.state.api.credential
            .getServiceCredential()
            // .createCredential()
            
            .then((response) => {
                console.log()
                return response.json().then((data) => {
                    return data
                })
            }).catch((err) => {
                
                console.log(err)
            })
    }
    

    render () {
        return (
            <div style={styles.main}>
                <h1>Chrome Ext - Popups again</h1>
                <MailPage></MailPage>
                <button onClick={this.onClickCreateCredentials.bind(this)}>{'Create Credentials'}</button>
            </div>
        )
    }
}
const styles = {
    main: {
        width: '300px',
        height: '600px'
    }
}
export default Popup;