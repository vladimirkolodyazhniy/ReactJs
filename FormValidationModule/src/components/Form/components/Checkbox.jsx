import React from 'react';

import Input from './Input.jsx';

export default class Checkbox extends Input {
    changeValue(e) {
        this.setValue(e.target.checked);
    }

    inputRender() {
        return <input
            checked={this.getValue() ? 'checked' : ''}
            name={this.props.name}
            type="checkbox"
            onChange={this.changeValue}
        />;
    }

    render() {
        const { label, errorComponent } = this.props;

        return (
            <div className={!this.isValid() ? 'custom-input validation-error': 'custom-input'}>
                <label className="checkbox-input">
                    {label ? <span className="label-text"> { label } </span> : null}
                    <div className="input-holder">
                        {this.inputRender()}
                        {errorComponent}
                    </div>
                </label>
            </div>
        );
    }
}
