import React from 'react';

import Input from './Input.jsx';

export default class ZipInput extends Input {
    constructor(props) {
        super(props);

        this.postalDataHandler = this.postalDataHandler.bind(this);
    }

    postalDataHandler() {
        this.context.validationForm.validate(this, 'zipcode').then(() => {
            if (this.isValid()) {
                this.props.onPostalCodeData(this.getValue());
            }
        });
    }

    inputRender() {
        return (
            <div className="input-group">
                <input
                    className="form-control"
                    name={this.props.name}
                    type="email"
                    value={this.getValue()}
                    onChange={this.changeValue}
                />
                <span className="btn" onClick={this.postalDataHandler}>
                    Apply
                </span>
            </div>
        );
    }
}
