import React from 'react';

import Input from './Input.jsx';

export default class Number extends Input {
    inputRender() {
        return <input
            className="form-control"
            name={this.props.name}
            type="number"
            value={this.getValue()}
            onChange={this.changeValue}
        />;
    }
}
