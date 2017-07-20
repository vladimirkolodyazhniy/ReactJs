import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleFavorite } from '../actions';

import Contact from './Contact.jsx';

import styles from './ContactsList.less';

@connect(mapStateToProps, { toggleFavorite })
export default class ContactsList extends Component {
    render() {
        const { viewType, contacts } = this.props;

        return (
            <div className={styles[viewType]}>
                {
                    contacts.map(contact =>
                        <Contact
                            key={contact.id}
                            id={contact.id}
                            name={contact.name}
                            email={contact.email}
                            viewType={viewType}
                            favorite={contact.favorite}
                            onFavoriteToggle={this.props.toggleFavorite}
                        />
                    )
                }
            </div>
        );
    }
}

function getVisibleContacts(contacts, filter) {
    switch (filter) {
        case 'SHOW_ALL':
          return contacts;

        case 'SHOW_FAVORITE':
          return contacts.filter(contact => contact.favorite);
    }
}

function mapStateToProps(state) {
    return {
        contacts: getVisibleContacts(state.contacts, state.filter),
        viewType: state.viewType
    };
}
