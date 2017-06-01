import React from 'react';

import Input from './Input.jsx';

export default class RadioGroup extends Input {
    inputRender() {
        const { options, name } = this.props;

        const radioList = options.map(option => {
            return (
                <label className="radio-input" key={option.value}>
                    {option.label ? <span className="label-text"> { option.label } </span> : null}
                    <div className="input-holder">
                        <input
                            checked={option.value === this.getValue()}
                            key={option.value}
                            name={name}
                            type="radio"
                            value={option.value}
                            onChange={this.changeValue}
                        />
                    </div>
                </label>
            );
        });

        return <div className="radio-list">{radioList}</div>;
    }

    render() {
        const { errorComponent } = this.props;

        return (
            <div className={!this.isValid() ? 'custom-input validation-error': 'custom-input'}>
                {this.inputRender()}
                {errorComponent}
            </div>
        );
    }
}
