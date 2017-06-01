import React, { Component, PropTypes } from 'react';

import Error from './Error.jsx';

export default class Input extends Component {
    static propTypes = {
        label: PropTypes.string,
        name: PropTypes.string.isRequired,
        errorComponent: PropTypes.bool,
        validators: PropTypes.string,
        defaultValue: PropTypes.string
    }

    static contextTypes = {
        validationForm: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            _value: this.props.defaultValue || '',
            _isValid: true,
            _isPristine: !this.props.defaultValue,
            _validationError: null
        };

        this.changeValue = this.changeValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.getErrorMessage = this.getErrorMessage.bind(this);
        this.isValid = this.isValid.bind(this);
        this.isPristine = this.isPristine.bind(this);
    }

    componentWillMount() {
        this.context.validationForm.attachToForm(this);
    }

    componentWillReceiveProps(prop) {
        if (prop.validators !== this.props.validators) {
            setTimeout(() => this.context.validationForm.validateTouchedFields(this));
        }
    }

    componentWillUnmount() {
        this.context.validationForm.detachFromForm(this);
    }

    setValue(value) {
        const form = this.context.validationForm;

        this.setState({
            _value: value,
            _isPristine: false
        }, () =>  form.validate(this).then(() => form.validateTouchedFields(this)));
    }

    getValue() {
        return this.state._value;
    }

    getErrorMessage() {
        return this.state._validationError;
    }

    isValid() {
        return this.state._isValid;
    }

    isPristine() {
        return this.state._isPristine;
    }

    changeValue(e) {
        this.setValue(e.target.value);
    }

    inputRender() {
        return <input
            className="form-control"
            name={this.props.name}
            type="text"
            value={this.getValue()}
            onChange={this.changeValue}
        />;
    }

    render() {
        const { label, errorComponent } = this.props;

        return (
            <div className={!this.isValid() ? 'custom-input validation-error': 'custom-input'}>
                <label className="text-input">
                    {label ? <span className="label-text"> { label } </span> : null}
                    <div className="input-holder">
                        {this.inputRender()}
                        {!!errorComponent ? <Error errorMessage={this.getErrorMessage()} /> : null}
                    </div>
                </label>
            </div>
        );
    }
}
