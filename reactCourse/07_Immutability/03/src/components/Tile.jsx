import React, { Component, PropTypes } from 'react';

import {
    API_PREFIX_URL,
    NOIMAGE_URL
} from '../config';

import styles from './Tile.less';

export default class Tile extends Component {
    static propTypes = {
        id: PropTypes.number,
        imgSrc: PropTypes.string,
        isRevealed: PropTypes.bool,
        onReveal: PropTypes.func
    }

    handleReveal = () => {
        const { id, isRevealed, onReveal } = this.props;

        if (!isRevealed) {
            onReveal(id);
        }
    }

    render() {
        const { isRevealed, imgSrc } = this.props;

        const posterUrl = imgSrc
        ? API_PREFIX_URL + imgSrc
        : NOIMAGE_URL;

        return (
            <div className={isRevealed ? styles.flipped : styles.flip_container} onClick={this.handleReveal}>
                <div className={styles.flipper}>
                    <div className={styles.front} />
                    <div className={styles.back}>
                        {isRevealed ? <img src={posterUrl}/> : null}
                    </div>
                </div>
            </div>
        );
    }
}
