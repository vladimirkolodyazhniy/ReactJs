/**
 * Form module with validation logic. It includes some logic:
 1. attachToForm to attach input to Form
 2. validate to validate toched input onChange, includes
    additional methods to work with validation rules (convertValidationsToObject, runValidation, runValidationRule)
 3. submit to get form data if values is valid
 4. getCurrentValues to get all atached inputs value
 5. validateForm to validate all form inputs
 6. validateTouchedFields to validate fields whitch was touched and synchronize validation
 7. resetForm to reset form fields
 8. detachFromForm to remove inputs from Form
 9. preventEnterKey to prevent Enter Key submition
 10. submitOnDebounce to allow submition by timeout in sec
 * */

import React, { Component, PropTypes } from 'react';
import Logger from 'js-logger';
import { validationRules, defaultMessages } from './utils/index.jsx';
import { isDefined, isFunction } from '../../utils/valid.types';
import FormBase from './FormBase.jsx';

export default class Form extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onDebounce: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        className: PropTypes.string,
        children: PropTypes.node,
        preventEnterKey: PropTypes.bool
    }

    static childContextTypes = {
        validationForm: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            isValid: true
        };

        this.timeout = {};
        this.inputs = [];
        this.undefinedRulesList = [];
        this.submit = this.submit.bind(this);
        this.getCurrentValues = this.getCurrentValues.bind(this);
        this.validate = this.validate.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateTouchedFields = this.validateTouchedFields.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.attachToForm = this.attachToForm.bind(this);
        this.detachFromForm = this.detachFromForm.bind(this);
        this.enterKeySubmit = this.enterKeySubmit.bind(this);
        this.submitOnDebounce= this.submitOnDebounce.bind(this);
        this.toFormData= this.toFormData.bind(this);
    }

    getChildContext() {
        return {
            validationForm: {
                attachToForm: this.attachToForm,
                detachFromForm: this.detachFromForm,
                validate: this.validate,
                resetForm: this.resetForm,
                validateTouchedFields: this.validateTouchedFields
            }
        };
    }

    componentDidMount() {
        this.validateTouchedFields();
    }

    getCurrentValues() {
        return this.inputs.reduce((data, component) => {
            const value = component.getValue();
            const name = component.props.name;

            data[name] = value;

            return data;
        }, {});
    }

    toFormData(data) {
        return Object.keys(data)
            .reduce((formData, key) => {
                formData.append(key, data[key]);

                return formData;
            }, new FormData());
    }

    submit(e) {
        if (e) {
            e.preventDefault();
        }

        this.validateForm().then(() => {
            if (this.state.isValid) {
                let formData = this.getCurrentValues();

                if (this.props.type && this.props.type==='formData') {
                    formData = this.toFormData(formData);
                }

                this.props.onSubmit(formData, this.resetForm);

            } else {
                Logger.warn(`${this.props.name ? this.props.name : ''} form validation error`);
            }
        });
    }

    runValidation(component) {
        const { validators } = component.props;
        let errors = [];

        if (validators) {
            const validatorsObj = this.convertValidationsToObject(validators);

            Object.keys(validatorsObj).forEach(rule => {
                const resultMsg = this.runValidationRule(rule, validatorsObj[rule], component);

                if (resultMsg) {
                    errors.push(resultMsg);
                }
            });
        }

        return {
            error: !!errors.length && errors[0] || null,
            isValid: !errors.length
        };
    }

    runValidationRule(rule, ruleParam, component) {
        const { validationErrors } = component.props;
        const { _value } = component.state;
        const ruleIsDefined = isDefined(validationRules[rule]);
        const currentValues = this.getCurrentValues();
        let error = '';

        if (ruleIsDefined) {
            const defaultMsg = isFunction(defaultMessages[rule]) ? defaultMessages[rule](ruleParam) : defaultMessages[rule];

            if (!!validationErrors && !!validationErrors[rule]) {
                Object.keys(validationErrors).forEach(() => {
                    error = validationRules[rule](_value, validationErrors[rule], ruleParam, currentValues);
                });
            } else {
                error = validationRules[rule](_value, defaultMsg, ruleParam, currentValues);
            }
        } else {
            const undefinedRule = this.undefinedRulesList.filter(item => item === rule);

            if (undefinedRule.length === 0) {
                this.undefinedRulesList.push(rule);
                Logger.warn(`ValidationForm does not have the validation rule: ${rule}`);
            }
        }

        return error;
    }

    convertValidationsToObject(validations) {
        return validations.replace(/ /g, '').split(',').reduce((validations, validation) => {
            const args = validation.split(':');
            const validateMethod = args.shift();

            validations[validateMethod] = args.length ? args[0] : true;
            return validations;
        }, {});
    }

    validateForm() {
        return new Promise(resolve => {
            Promise.all(this.inputs.map(component => this.validate(component)))
                .then(() => {
                    const allFieldsIsValid = this.inputs.every(component => component.state._isValid);

                    this.setState({ isValid: allFieldsIsValid }, resolve);
                });
        });
    }

    validate(component) {
        return new Promise(resolve => {
            const validation = this.runValidation(component);

            component.setState({
                _isValid: validation.isValid,
                _validationError: validation.error
            }, resolve);
        });
    }

    validateTouchedFields(currentComponent) {
        const inputs = this.inputs.filter(component => {
            return currentComponent ? currentComponent !== component : component;
        });

        inputs.forEach(component => {
            if (!component.state._isPristine) {
                this.validate(component);
            }
        });
    }

    resetForm() {
        const defaultState = {
            _value: '',
            _isValid: true,
            _isPristine: true,
            _validationError: null
        };

        this.inputs.forEach(component => component.setState(defaultState));
    }

    attachToForm(component) {
        if (this.inputs.indexOf(component) === -1) {
            this.inputs.push(component);
        }
    }

    detachFromForm(component) {
        const componentPos = this.inputs.indexOf(component);

        if (componentPos !== -1) {
            this.inputs.splice(componentPos, 1);
        }
    }

    enterKeySubmit(e) {
        if (e.charCode === 13) {
            e.preventDefault();
        }

        if (e.charCode === 13 && !!this.props.enterKeySubmit) {
            this.submit();
        }
    }

    submitOnDebounce() {
        if (!!this.props.onDebounce) {
            const timeout = parseInt(this.props.onDebounce);

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.submit(), timeout);
        }
    }

    render() {
        return (
            <FormBase
                {...this.props}
                disableOnClickOutside={!this.props.onClickOutside}
                onKeyPress={this.enterKeySubmit}
                onKeyUp={this.submitOnDebounce}
                onSubmit={this.submit}
            />
        );
    }
}
