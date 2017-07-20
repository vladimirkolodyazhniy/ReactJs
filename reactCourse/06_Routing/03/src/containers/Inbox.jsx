import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';

import Message from '../components/Message.jsx';

import messages from '../mocks/messages.json';

import styles from './Inbox.less';

@withRouter
export default class Inbox extends Component {
    render() {
        const message = messages.find(message => message.id === this.props.params.id);

        const messagesTitles = messages.map((message, index) =>
            <span className={styles.title} key={message.id}>
                <Link activeClassName={styles.active} to={`/inbox/${message.id}`}>Message {index + 1}</Link>
            </span>
        );

        return (
            <div className={styles.root}>
                <div className={styles.titles_list}>
                    {messagesTitles}
                </div>

                {message ?
                    <Message
                        body={message.body}
                        id={message.id}
                        key={message.id}
                        senderEmail={message.senderEmail}
                        senderName={message.senderName}
                        subject={message.subject}
                    />
                    : null
                }
            </div>
        );
    }
}
