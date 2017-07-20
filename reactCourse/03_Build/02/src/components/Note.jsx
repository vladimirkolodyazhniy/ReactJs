import React, { Component } from 'react';

import classNames from 'classnames';
import moment from 'moment';

import styles from './Note.css';

export default class Note extends Component {
    static defaultProps = {
        styleHash: {
            income: {
                iconClass: 'fa-arrow-up',
                iconColor: '#90D474'
            },
            entertainment: {
                iconClass: 'fa-gift',
                iconColor: '#FEC960'
            },
            food: {
                iconClass: 'fa-cutlery',
                iconColor: '#4184F2'
            },
            purchase: {
                iconClass: 'fa-shopping-bag',
                iconColor: '#EF6A98'
            },
            other: {
                iconClass: 'fa-recycle',
                iconColor: '#87dbd4'
            }
        }
    }

    constructor(props) {
        super(props);

        this.getNoteSubCategory = this.getNoteSubCategory.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    getNoteSubCategory() {
        const {
            subCategory,
            category,
            styleHash
         } = this.props;

        return category === 'income' ? styleHash.income :  styleHash[subCategory];
    }

    handleDelete() {
        this.props.onDelete(this.props.id);
    }

    render() {
        const {
            title,
            date,
            moneyAmount,
            category,
        } = this.props;

        const dateNow = moment();

        const notedateFormated = moment(date).format();

        const noteDateFromNow = moment(notedateFormated).from(dateNow);

        const noteStyles = this.getNoteSubCategory();

        return (
            <div className={classNames(styles.note, styles[category])}>
                <span className={styles.note_delete_icon} onClick={this.handleDelete}> × </span>

                <div className={styles.note_icon} style={{ backgroundColor: noteStyles.iconColor }}>
                    <i className={classNames('fa', noteStyles.iconClass)} aria-hidden="true"></i>
                </div>

                <div className={styles.note_content}>
                    <h3>{title}</h3>
                    <strong className={styles.note_date}>{noteDateFromNow}</strong>
                </div>

                <div className={styles.note_amount}>
                    {moneyAmount > 0 ? `+${moneyAmount}` : moneyAmount}
                    <small>&nbsp;&#8372;</small>
                </div>
            </div>
        );
    }
}
