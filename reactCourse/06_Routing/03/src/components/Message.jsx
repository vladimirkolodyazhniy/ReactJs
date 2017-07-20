import React from 'react';

import styles from './Message.less';

const Message = props => (
    <div className={styles.root}>
        <span className={styles.title}>From: {props.senderEmail}</span>
        <span className={styles.title}>To: {props.senderName}</span>
        <span className={styles.title}>Subject: {props.subject}</span>
        <p>{props.body}</p>
    </div>
);

Message.propTypes = {
    id: React.PropTypes.string,
    senderEmail: React.PropTypes.string,
    senderName: React.PropTypes.string,
    subject: React.PropTypes.string,
    body: React.PropTypes.string
};

export default Message;
