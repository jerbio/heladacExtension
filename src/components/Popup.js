import React from 'react';
import MailPage from '../pages/MailPage.js'
function Popup() {
    return (
        <div style={styles.main}>
            <h1>Chrome Ext - Popups again</h1>
            <MailPage></MailPage>
        </div>
    )
}
const styles = {
    main: {
        width: '300px',
        height: '600px'
    }
}
export default Popup;