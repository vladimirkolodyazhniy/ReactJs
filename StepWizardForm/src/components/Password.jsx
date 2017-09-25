import React from 'react';

import Input from './Input.jsx';

export default class Password extends Input {
    inputRender() {
        return (
            <input
                className="form-control"
                name={this.props.name}
                type="password"
                value={this.getValue()}
                onChange={this.changeValue}
            />
        );
    }
}
