import React, { Component } from 'react';

import styles from './Contact.less';

export default class Contact extends Component {
    constructor(props) {
        super(props);

        this.handleFavoriteToggle = this.handleFavoriteToggle.bind(this);
    }

    handleFavoriteToggle() {
        this.props.onFavoriteToggle(this.props.id)
    }

    render() {
        const {
            name,
            email,
            favorite,
            viewType
        } = this.props;

        return (
            <div className={styles[viewType]}>
                <span onClick={this.handleFavoriteToggle} className={favorite ? styles.active : styles.icon_favorite}>
                    {
                        favorite ?
                        <i className="fa fa-star" aria-hidden="true"/> :
                        <i className="fa fa-star-o" aria-hidden="true"/>
                    }
                </span>

                <h2 className={styles.name}>{name}</h2>

                <div className="flex-container">
                    <div className="flex-column">
                        <span className={styles.email}>{email}</span>
                    </div>
                    <div className="flex-column">
                        <a href={`mailto:${email}`} className={styles.write_btn}>Написать</a>
                    </div>
                </div>
            </div>
        );
    }
}
