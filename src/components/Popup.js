import { extend } from 'lodash';
import React, { Component } from 'react';
import MailPage from '../pages/MailPage.js'
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
        this.state.api.credential
            .createCredential().then((response) => {
                console.log()
                return response.json().then((data) => {
                    return data
                })
            }).catch((err) => {
                debugger
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