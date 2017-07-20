import React, { Component } from 'react';

import './SearchField.scss';

export default class SearchField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });

        this.props.onStudentSearch(e.target.value);
    }

    render() {
        const { name } = this.state;

        return (
            <div className="input-group">
                <i className="icon-search fa fa-search"/>
                <input
                    placeholder="Search student by name"
                    value={name}
                    onChange={this.handleNameChange}
                    className="form-control"
                />
            </div>
        );
    }
}
