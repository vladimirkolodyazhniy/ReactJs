import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchMoviesByType } from '../actions';

import Loader from '../components/Loader.jsx';
import MovieGrid from '../components/MovieGrid.jsx';


@connect(
    mapStateToProps,
    { fetchMoviesByType }
)
export default class MoviesByType extends Component {
    static propTypes = {
        type: PropTypes.string,
        loading: PropTypes.bool,
        movies: PropTypes.array,
        fetchMoviesByType: PropTypes.func
    }

    componentWillMount() {
        const { type, fetchMoviesByType } = this.props;

        if (type) {
            fetchMoviesByType(type);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { type, fetchMoviesByType } = this.props;

        if (nextProps.type !== type && nextProps.type) {
            fetchMoviesByType(nextProps.type);
        }
    }

    render() {
        const { loading, movies } = this.props;

        return (
            <Loader loading={loading}>
                <MovieGrid movies={movies} />
            </Loader>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        movies: state.movies.items,
        loading: state.movies.isFetching,
        type:  ownProps.route.path,
    };
}
