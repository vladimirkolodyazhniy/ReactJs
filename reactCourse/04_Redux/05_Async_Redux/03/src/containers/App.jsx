import React, { Component }   from 'react';
import { connect } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroller';

import { fetchMovies, changeQuery, fetchMoreMovies } from '../actions';

import InputSearch from '../components/InputSearch.jsx';
import MovieList from '../components/MovieList.jsx';
import Preloader from '../components/Preloader.jsx';

class AppContainer extends Component {
    constructor() {
        super();

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    handleQueryChange = (query) => {
        const { onQueryChange } = this.props;

        onQueryChange(query);
    }

    handleKeyDown() {
        const { searchQuery, onFetchMovies } = this.props;

        onFetchMovies(searchQuery);
    }

    handleLoadMore(page) {
        const { onFetchMoreMovies, searchQuery } = this.props;

        onFetchMoreMovies(searchQuery, page);
    }

    render() {
        const {
            movies,
            searchQuery,
            isFetching,
            currentPage,
            totalPages,
            isFirstFetch
        } = this.props;

        return (
            <div>
                <InputSearch
                    value={searchQuery}
                    onQueryChange={this.handleQueryChange}
                    onKeyDown={this.handleKeyDown}
                />

                {isFetching ? <Preloader/> : null }

                {isFirstFetch ? null
                    : <InfiniteScroll
                        pageStart={currentPage}
                        loadMore={this.handleLoadMore}
                        initialLoad={false}
                        hasMore={currentPage < totalPages}
                    >
                        <MovieList movies={movies} />
                    </InfiniteScroll>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        movies: state.movies.items,
        isFetching: state.movies.isFetching,
        isFirstFetch: state.movies.isFirstFetch,
        searchQuery: state.searchQuery,
        currentPage: state.movies.currentPage,
        totalPages: state.movies.totalPages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onQueryChange: (query) => dispatch(changeQuery(query)),
        onFetchMovies: (query) => dispatch(fetchMovies(query)),
        onFetchMoreMovies: (query, page) => dispatch(fetchMoreMovies(query, page))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
