import React from 'react';

import Input from './Input.jsx';

export default class Email extends Input {
    inputRender() {
        return <input
            className="form-control"
            name={this.props.name}
            type="email"
            value={this.getValue()}
            onChange={this.changeValue}
        />;
    }
}
