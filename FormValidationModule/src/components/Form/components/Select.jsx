import React, { PropTypes } from 'react';

import Input from './Input.jsx';

export default class Select extends Input {
    static propTypes = {
        defaultValue: PropTypes.string
    }

    inputRender() {
        const options = this.props.options.map(option => {
            return (
                <option key={option.value} value={option.value}>
                    {option.text}
                </option>
            );
        });

        return (
            <select
                className="form-control"
                name={this.props.name}
                value={this.getValue()}
                onChange={this.changeValue}
            >
                {!this.props.defaultValue ? <option></option>: null}
                {options}
            </select>
        );
    }
}
