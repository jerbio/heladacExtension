import React, { Component } from 'react';
import authService from '../authorization/AuthorizeService'
import accountAuthorization from '../services/AccountAuthorization'
import {ApplicationPaths} from '../authorization/ApiAuthorizationConstants'

 class Foreground extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accountAuthorization: accountAuthorization
        }
    }

    componentDidMount() {
        debugger
        this.state.accountAuthorization.getHeader().then((header) => {
            debugger
            // let header = { 'Authorization': `Bearer ${user.access_token}` }
            // debugger
            // let url = ApplicationPaths.RootPath + '/api/mail/usermails'
            console.log(header)
            // let response = fetch(url,{
            //     headers: header
            // }).then((response) => {
            //     let retValue = response.json().then((processedMail) => {
            //         debugger
            //         console.log(processedMail)
            //     })
            // })
        });
        
    }

    render() {
        let retValue = (<div style={styles.main}>
            <h1>Chrome Ext - Foreground system comeback</h1>
        </div>)
        return retValue
    }
}
const styles = {
    main: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
        fontSize: '80px',
        pointerEvents: 'none'
    }
}
export default Foreground;