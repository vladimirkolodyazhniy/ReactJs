import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';

import { searchMovies } from '../actions';

import SearchBox from '../components/SearchBox.jsx';
import Loader from '../components/Loader.jsx';
import MovieGrid from '../components/MovieGrid.jsx';
import RaisedButton  from 'material-ui/RaisedButton';

const styles = {
    container: {
        height: '100%',
        maxWidth: 800,
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        margin: '0 auto'
    },
    holder: {
        textAlign: 'center',
        display: 'flex'
    }
};

@withRouter
@connect(
    mapStateToProps,
    { searchMovies }
)
export default class Search extends Component {
    static propTypes = {
        search: PropTypes.string,
        loading: PropTypes.bool,
        movies: PropTypes.array,
        searchMovies: PropTypes.func,
        children: PropTypes.element
    }

    componentWillMount() {
        const { search, searchMovies } = this.props;

        if (search) {
            searchMovies(search);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.search !== this.props.search && nextProps.search) {
            this.props.searchMovies(nextProps.search);
        }
    }

    handleSearch = search => {
        const { location, router } = this.props;

        router.push({
            pathname: '/movies',
            query: { ...location.query, search }
        });
    }

    render() {
        const { search, loading, movies, children } = this.props;

        return (
            <div>
                <SearchBox search={search} onSearch={this.handleSearch} />

                <div style={styles.holder}>
                    <RaisedButton
                        containerElement={<Link to="/movies/popular" />}
                        label="Popular"
                        linkButton={true}
                        primary
                        style={{flex: 'auto'}}
                    />

                    <RaisedButton
                        containerElement={<Link to="/movies/top_rated" />}
                        label="Top Rated"
                        linkButton={true}
                        primary
                        style={{flex: 'auto'}}
                    />

                    <RaisedButton
                        containerElement={<Link to="/movies/now_playing" />}
                        label="Now Playing"
                        linkButton={true}
                        primary
                        style={{flex: 'auto'}}
                    />
                </div>

                <div style={styles.container}>
                    { search ?
                        <Loader loading={loading}>
                            <MovieGrid movies={movies} />
                        </Loader>
                        : children
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        movies: state.movies.items,
        loading: state.movies.isFetching,
        search: ownProps.location.query.search
    };
}
