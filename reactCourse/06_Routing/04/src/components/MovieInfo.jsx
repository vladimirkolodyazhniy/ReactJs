import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';

const styles = {
    container: {
        width: '100%',
        maxWidth: 800,
        margin: '0 auto',
        display: 'flex',
    },
    img: {
        height: 450,
    },
    info: {
        marginLeft: 36,
        padding: 16
    },
    title: {
        fontWeight: 500
    },
    subtitle: {
        fontWeight: 500
    }
};

const MovieInfo = props => {
    return (
        <Paper style={styles.container} zDepth={3} >
            {
                props.posterPath
                && <img src={`https://image.tmdb.org/t/p/w500${props.posterPath}`} style={styles.img}  />
            }
            <div style={styles.info}>
                <h1 style={styles.title}>{props.title}</h1>

                <p>{props.overview}</p>
            </div>
        </Paper>
    );
};

MovieInfo.propTypes = {
    posterPath: PropTypes.string,
    title: PropTypes.string,
    overview: PropTypes.string
};

export default MovieInfo;
