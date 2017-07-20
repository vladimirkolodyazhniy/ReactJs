import React, { Component } from 'react';

import './SearchField.scss';

export default class SearchField extends Component {
    static propTypes = {
        searchQuery: React.PropTypes.string,
        onStudentSearch: React.PropTypes.func
    }

    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onStudentSearch(e.target.value);
    }

    render() {
        const { searchQuery } = this.props;

        return (
            <div className="input-group">
                <i className="icon-search fa fa-search"/>
                <input
                    className="form-control"
                    placeholder="Search student by name"
                    value={searchQuery}
                    onChange={this.handleNameChange}
                />
            </div>
        );
    }
}
