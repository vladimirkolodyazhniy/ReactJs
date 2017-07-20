import React, { Component } from 'react';

import classNames from 'classnames';

import styles from './ControlsPanel.css';

export default class ControlsPanel extends Component {
    constructor(props) {
        super(props);

        this.handleModalType = this.handleModalType.bind(this);
    }

    handleModalType(event) {
        this.props.onModalShow(event.target.dataset.category);
    }

    render() {
        const { totalAmount } = this.props;

        return (
            <div className={styles.controls_panel} >
                <span
                    className={classNames(styles.btn, styles.btn_minus, 'fa', ' fa-minus-circle' )}
                    data-category="expense"
                    onClick={this.handleModalType}
                />

                <div className={styles.total}>
                    {totalAmount}
                    <small>&nbsp;&#8372;</small>
                </div>

                <span
                    className={classNames(styles.btn, styles.btn_plus, 'fa', 'fa-plus-circle')}
                    data-category="income"
                    onClick={this.handleModalType}
                />
            </div>
        );
    }
}
