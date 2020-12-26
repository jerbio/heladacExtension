import React, { Component } from 'react';
import MailApi from '../services/MailApi.js'
import Constants from '../Constants.js'

class MailList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            api: {
                mail: new MailApi()
            },
            mails: [],
            listConfig: {
                index: 0,
                pageSize: 20
            },
            dataLoad: {
                status: Constants.loadStatus.notInitialized,
                data: {}
            }
        }
    }

    componentDidMount() {
        this.setState({
            dataLoad: {
              status: Constants.loadStatus.loading,
              data: Object.assign(this.state.dataLoad.data)
            }
          })
          this.state.api.mail.getMails()
            .then((response) => {
              debugger
              this.setState({
                dataLoad: {
                  status: Constants.loadStatus.finished,
                  data: response
                }
              })
            })
            .catch(() => {
              this.setState({
                dataLoad: {
                  status: Constants.loadStatus.error,
                  data: Object.assign(this.state.dataLoad.data)
                }
              })
            })
    }

    render() {
        let status = null
        if (this.state.dataLoad.status === Constants.loadStatus.loading) {
        status = (<div>
            "Loading emails"
        </div>)
        } else if (this.state.dataLoad.status === Constants.loadStatus.error) {
        status = (<div>
            "Failed to load emails"
        </div>)
        }

        
        let mailRows = []

        if (this.state.dataLoad.status === Constants.loadStatus.finished) {
            const mails = this.state.dataLoad.data || []
            mailRows = mails.map((mail) => {
                return <MailRow key = {'mail-row-'+mail.id} mail={mail} ></MailRow>
            })
            
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

class MailRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {sender, subject, receiver} = this.props.mail
        let receiverLabelString = ''
        if (receiver) {
            receiverLabelString = receiver.name || receiver.address
        }

        return (
            <div>
                <div>
                    {sender}
                </div>
                <div>
                    {subject}
                </div>
                <div>
                    {receiverLabelString}
                </div>
            </div>
        )
    }
}


export default MailList;
