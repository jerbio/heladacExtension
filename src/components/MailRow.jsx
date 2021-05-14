import React, { Component } from 'react';

class MailRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sender, subject, receiver } = this.props.mail;
        let receiverLabelString = '';
        if (receiver) {
            receiverLabelString = receiver.name || receiver.address;
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
        );
    }
}

export default MailRow;
