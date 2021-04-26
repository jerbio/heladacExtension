import React, { Component } from 'react';
import MailPage from '../pages/MailPage';
import CredentialApi from '../services/CredentialApi';

const styles = {
    main: {
        width: '300px',
        height: '600px',
    },
};

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: {
                credential: new CredentialApi(),
            },
        };
    }

    onClickCreateCredentials() {
        this.state.api.credential
            .createCredential().then((response) => {
                console.log();
                return response.json().then((data) => data);
            }).catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div style={styles.main}>
                <h1>Chrome Ext - Popups again</h1>
                <MailPage />
                <button
                  type="button"
                  onClick={
                        this.onClickCreateCredentials.bind(this)
                    }
                >
                    Create Credentials
                </button>
            </div>
        );
    }
}
export default Popup;
