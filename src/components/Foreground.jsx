import React, { Component } from 'react';
import accountAuthorization from '../services/AccountAuthorization';

const styles = {
    main: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
        fontSize: '80px',
        pointerEvents: 'none',
    },
};

class Foreground extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountAuthorization,
        };
    }

    componentDidMount() {
        this.state.accountAuthorization.getHeader().then((header) => {
            console.log(header);
        });
    }

    render() {
        const retValue = (
            <div style={styles.main}>
                {/* <h1>Chrome Ext - Foreground system comeback</h1> */}
            </div>
        );
        return retValue;
    }
}
export default Foreground;
