import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchMovieSimilar } from '../actions';

import Loader from '../components/Loader.jsx';
import MovieGrid from '../components/MovieGrid.jsx';

const styles = {
    container: {
        padding: '0 16px'
    }
};

@connect(
    mapStateToProps,
    { fetchMovieSimilar }
)
export default class MovieSimilar extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        recommendations: PropTypes.array,
        fetchMovieSimilar: PropTypes.func,
        movieId: PropTypes.string
    }

    componentWillMount() {
        const { movieId, route, fetchMovieSimilar } = this.props;

        fetchMovieSimilar(movieId, route.path);
    }

    render() {
        const { loading, similar } = this.props;

        return (
            <Loader loading={loading}>
                <div style={styles.container}>
                    <h1>Movies Similar</h1>

                    <MovieGrid movies={similar} />
                </div>
            </Loader>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        similar: state.similar.items,
        loading: state.similar.isFetching,
        movieId: ownProps.params.id
    };
}
