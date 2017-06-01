import React from 'react';

import Input from './Input.jsx';

export default class Textarea extends Input {
    inputRender() {
        return <textarea
            className="form-control"
            name={this.props.name}
            value={this.getValue()}
            onChange={this.changeValue}
        />;
    }
}
