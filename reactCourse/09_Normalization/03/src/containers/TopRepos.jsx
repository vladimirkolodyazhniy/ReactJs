import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { loadTopRepos } from '../actions';

import { getTopRepos, getTopReposPagination } from '../selectors/repos';

import Repo from '../components/Repo.jsx';
import Heading from '../components/Heading.jsx';
import List from '../components/List.jsx';

function mapStateToProps(state) {
    return {
        repos: getTopRepos(state),
        pagination: getTopReposPagination(state),
    };
}

@connect(mapStateToProps, { loadTopRepos })
export default class UserPage extends Component {
    static propsTypes = {
        repos: PropTypes.func.isRequired,
        loadTopRepos: ImmutablePropTypes.list.isRequired,
    }

    componentWillMount() {
        this.props.loadTopRepos();
    }

    loadMoreRepos = () => {
        this.props.loadTopRepos(true);
    }

    renderItem = (repo) => {
        return <Repo key={repo.get('fullName')} repo={repo} />;
    }

    render() {
        const { repos, pagination } = this.props;

        return (
            <div>
                <Heading>Top Repos</Heading>
                <List
                    isFetching={pagination.get('isFetching')}
                    nextPageUrl={pagination.get('nextPageUrl')}
                    pageCount={pagination.get('pageCount')}
                    items={repos}
                    renderItem={this.renderItem}
                    onLoadMoreClick={this.loadMoreRepos}
                />
            </div>
        );
    }
}
