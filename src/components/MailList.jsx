import React, { Component } from 'react';
import MailApi from '../services/MailApi';
import Constants from '../Constants';
import MailRow from './MailRow';

class MailList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: {
                mail: new MailApi(),
            },
            dataLoad: {
                status: Constants.loadStatus.notInitialized,
                data: {},
            },
        };
    }

    componentDidMount() {
        this.setState((prevState) => ({
            dataLoad: {
                status: Constants.loadStatus.loading,
                data: Object.assign(prevState.dataLoad.data),
            },
        }));
        this.state.api.mail.getMails()
            .then((response) => {
                this.setState({
                    dataLoad: {
                        status: Constants.loadStatus.finished,
                        data: response,
                    },
                });
            })
            .catch(() => {
                this.setState((prevState) => ({
                    dataLoad: {
                        status: Constants.loadStatus.error,
                        data: Object.assign(prevState.dataLoad.data),
                    },
                }));
            });
    }

    render() {
        let status = null;
        if (this.state.dataLoad.status === Constants.loadStatus.loading) {
            status = (
                <div>
                    Loading emails
                </div>
            );
        } else if (this.state.dataLoad.status === Constants.loadStatus.error) {
            status = (
                <div>
                    Failed to load emails
                </div>
            );
        }

        let mailRows = [];

        if (this.state.dataLoad.status === Constants.loadStatus.finished) {
            const mails = this.state.dataLoad.data || [];
            mailRows = mails.map((mail) => <MailRow key={`mail-row-${mail.id}`} mail={mail} />);
        }

        return (
            <div>
                <div>{status}</div>
                <div>
                    {mailRows}
                </div>
            </div>
        );
    }
}

export default MailList;
