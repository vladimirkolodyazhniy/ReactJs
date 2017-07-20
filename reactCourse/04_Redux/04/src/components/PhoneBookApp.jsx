import React, { Component } from 'react';

import ContactsList from './ContactsList.jsx';
import AddContact from './AddContact.jsx';
import FiltersList from './FiltersList.jsx';
import ViewTypesList from './ViewTypesList.jsx';

import styles from './PhoneBookApp.less';

export default class PhoneBookApp extends Component {
    render() {
        return (
            <div className={styles.root}>
                <div className={styles.container}>
                    <h2 className={styles.header}><i className="fa fa-phone-square" aria-hidden="true" /></h2>

                    <div className={styles.app}>
                        <AddContact />

                        <div className="flex-container">
                            <div className="flex-column">
                                <FiltersList />
                            </div>
                            <div className="flex-column">
                                <ViewTypesList />
                            </div>
                        </div>

                        <ContactsList />
                    </div>
                </div>
            </div>
        );
    }
}
