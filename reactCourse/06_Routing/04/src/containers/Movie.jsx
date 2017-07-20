import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchMovie } from '../actions';

import MovieInfo from '../components/MovieInfo.jsx';
import BackdropContainer from '../components/BackdropContainer.jsx';
import Loader from '../components/Loader.jsx';
import RaisedButton  from 'material-ui/RaisedButton';

const styles = {
    holder: {
        textAlign: 'center',
        padding: '20px 0'
    }
};

@connect(
    mapStateToProps,
    { fetchMovie }
)
export default class Movie extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        movies: PropTypes.array,
        children: PropTypes.element,
        fetchMovie: PropTypes.func,
        movieId: PropTypes.string
    }

    componentWillMount() {
        const { movieId } = this.props;

        this.props.fetchMovie(movieId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.movieId !== this.props.movieId) {
            this.props.fetchMovie(nextProps.movieId);
        }
    }

    render() {
        const { movie, loading, children, movieId } = this.props;

        return (
            <Loader loading={loading}>
                <BackdropContainer backdropPath={movie.backdropPath}>
                    <MovieInfo {...movie} />
                </BackdropContainer>

                <div style={styles.holder}>
                    <RaisedButton
                        containerElement={<Link to={`/movies/${movieId}/recommendations`} />}
                        label="Recommendations"
                        linkButton={true}
                        primary
                        style={{margin: '0 10px'}}
                    />

                    <RaisedButton
                        containerElement={<Link to={`/movies/${movieId}/similar`} />}
                        label="similar"
                        linkButton={true}
                        secondary
                        style={{margin: '0 10px'}}
                    />
                </div>

                {children}
            </Loader>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        movie: state.movie.info,
        loading: state.movie.isFetching,
        movieId: ownProps.params.id
    };
}
