import React from 'react';

import MovieCard from './MovieCard.jsx';

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    }
};

export default props => (
    <div style={styles.container}>
        {
            props.movies.length !== 0
            ? props.movies.map(movie => <MovieCard key={movie.id} {...movie} />)
            : <p>No movies to display</p>
        }
    </div>
);
