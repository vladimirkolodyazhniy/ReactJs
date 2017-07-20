import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './Modal.css';

export default class Modal extends Component {
    render() {
        const {
            showModal,
            children
        } = this.props;

        return (
            <div>
                { showModal ?
                    <div className={styles.modal_overlay}>
                        <div className={styles.modal_wrapper}>
                            <div className={styles.modal_content}>
                                {children}
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>

        );
    }
}
