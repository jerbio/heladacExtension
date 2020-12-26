import React, { Component } from 'react';
import MailList from '../components/MailList.js'

class MailPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        let retValue = (<div>
            <MailList></MailList>
        </div>)

        return retValue;
    }
}

export default MailPage;
