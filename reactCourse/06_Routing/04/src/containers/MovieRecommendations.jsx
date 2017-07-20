import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchMovieRecomendation } from '../actions';

import Loader from '../components/Loader.jsx';
import MovieGrid from '../components/MovieGrid.jsx';

const styles = {
    container: {
        padding: '0 16px'
    }
};

@connect(
    mapStateToProps,
    { fetchMovieRecomendation }
)
export default class MovieRecommendations extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        recommendations: PropTypes.array,
        fetchMovieRecomendation: PropTypes.func,
        movieId: PropTypes.string
    }

    componentWillMount() {
        const { movieId, route, fetchMovieRecomendation } = this.props;

        fetchMovieRecomendation(movieId, route.path);
    }

    render() {
        const { loading, recommendations } = this.props;

        return (
            <Loader loading={loading}>
                <div style={styles.container}>
                    <h1>Movies Recommendations</h1>

                    <MovieGrid movies={recommendations} />
                </div>
            </Loader>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        recommendations: state.recomendations.items,
        loading: state.recomendations.isFetching,
        movieId: ownProps.params.id
    };
}
