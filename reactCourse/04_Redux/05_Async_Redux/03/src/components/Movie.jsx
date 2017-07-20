import React, { Component } from 'react';

import styles from './Movie.less';

const TEXT_LIMIT = 200;

export default class Movie extends Component {
    render() {
        const {
            id,
            title,
            overview,
            poster,
            date,
            voteAverage
        } = this.props;

        const posterUrl = poster ? `http://image.tmdb.org/t/p/w185/${poster}` : 'https://ticketspin.com/themes/default/img/no-image.jpg';

        const truncatedText = overview.length > TEXT_LIMIT ? (overview.substring(0, TEXT_LIMIT - 3) + '...') : overview;

        return (
            <div className={styles.movie_item}>
                <div className={styles.image_holder}>
                    <a href={`https://www.themoviedb.org/movie/${id}`} target="_blank">
                        <img src={posterUrl} className={styles.image} alt={title}/>
                    </a>
                </div>
                <h3>{title} <span className={styles.vote_average}>{voteAverage} <i className="fa fa-star" aria-hidden="true"/></span></h3>
                <span className={styles.date}><i className="fa fa-calendar" aria-hidden="true" /> {date}</span>
                <p>{truncatedText}</p>
            </div>
        );
    }
}
