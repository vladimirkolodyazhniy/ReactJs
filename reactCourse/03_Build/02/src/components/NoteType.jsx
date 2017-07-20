import React, { Component } from 'react';

import styles from './NoteType.css';

export default class NoteType extends Component {
    render() {
        const { onSubcategoryChange } = this.props;

        return (
            <div className={styles.noteType}>
                <div className={styles.ctm_select}>
                    <select name="noteTypes" onChange={onSubcategoryChange} defaultValue="default">
                        <option disabled value="default">Select expenses</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="food">Food</option>
                        <option value="purchase">Purchase</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
        );
    }
}
