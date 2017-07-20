import React, { Component } from 'react';

import Movie from './Movie.jsx';

import styles from './MovieList.less';

export default class MovieList extends Component {
    render() {
        const { movies } = this.props;

        return (
            <div className={styles.root}>
                {
                    movies.map(movie =>
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            voteAverage={movie.vote_average}
                            overview={movie.overview}
                            poster={movie.poster_path}
                            date={movie.release_date}
                        />
                    )
                }
            </div>
        );
    }
}
