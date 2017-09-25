import React, { Component } from 'react';

export default class Error extends Component {
    render() {
        const { errorMessage } = this.props;

        return errorMessage ? (
            <small className="error-text" style={{ color: 'red' }}>
                {errorMessage}
            </small>
        ) : null;
    }
}
