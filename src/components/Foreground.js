 import React, { Component } from 'react';
//  import authService from '../authorization/AuthorizeService'

 class Foreground extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authService: null
        }
    }
    render(){ 
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