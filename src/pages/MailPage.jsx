import React, { Component } from 'react';
import MailList from '../components/MailList';

class MailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const retValue = (
            <div>
                <MailList />
            </div>
        );

        return retValue;
    }
}

export default MailPage;
