import React, { Component } from 'react';
import PropTypes from 'prop-types';

import validationRules from '../utils/validationRules';
import defaultMessages from '../utils/validationMessages';
import { isDefined, isFunction } from '../utils/valid.types';

export default class Form extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node
    };

    static childContextTypes = {
        validationForm: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            isValid: true
        };

        this.timeout = {};
        this.inputs = [];
        this.undefinedRulesList = [];
        this.getCurrentValues = this.getCurrentValues.bind(this);
        this.validate = this.validate.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateTouchedFields = this.validateTouchedFields.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.attachToForm = this.attachToForm.bind(this);
        this.detachFromForm = this.detachFromForm.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    getChildContext() {
        return {
            validationForm: {
                attachToForm: this.attachToForm,
                detachFromForm: this.detachFromForm,
                validate: this.validate,
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

    runValidation(component, validator) {
        const validators = component.props.validators || validator;

        let errors = [];

        if (validators) {
            const validatorsObj = this.convertValidationsToObject(validators);

            Object.keys(validatorsObj).forEach(rule => {
                const resultMsg = this.runValidationRule(
                    rule,
                    validatorsObj[rule],
                    component
                );

                if (resultMsg) {
                    errors.push(resultMsg);
                }
            });
        }

        return {
            error: (!!errors.length && errors[0]) || null,
            isValid: !errors.length
        };
    }

    runValidationRule(rule, ruleParam, component) {
        const { _value } = component.state;
        const ruleIsDefined = isDefined(validationRules[rule]);
        const currentValues = this.getCurrentValues();
        let error = '';

        if (ruleIsDefined) {
            const defaultMsg = isFunction(defaultMessages[rule])
                ? defaultMessages[rule](ruleParam)
                : defaultMessages[rule];

            error = validationRules[rule](
                _value,
                defaultMsg,
                ruleParam,
                currentValues
            );
        } else {
            const undefinedRule = this.undefinedRulesList.filter(
                item => item === rule
            );

            if (undefinedRule.length === 0) {
                this.undefinedRulesList.push(rule);
                console.warn(
                    `ValidationForm does not have the validation rule: ${rule}`
                );
            }
        }

        return error;
    }

    convertValidationsToObject(validations) {
        return validations
            .replace(/ /g, '')
            .split(',')
            .reduce((validations, validation) => {
                const args = validation.split(':');
                const validateMethod = args.shift();

                validations[validateMethod] = args.length ? args[0] : true;
                return validations;
            }, {});
    }

    validateForm() {
        return new Promise(resolve => {
            Promise.all(
                this.inputs.map(component => this.validate(component))
            ).then(() => {
                const allFieldsIsValid = this.inputs.every(
                    component => component.state._isValid
                );

                this.setState({ isValid: allFieldsIsValid }, resolve);
            });
        });
    }

    validate(component, validator) {
        return new Promise(resolve => {
            const validation = this.runValidation(component, validator);

            component.setState(
                {
                    _isValid: validation.isValid,
                    _validationError: validation.error
                },
                resolve
            );
        });
    }

    validateTouchedFields(currentComponent) {
        const inputs = this.inputs.filter(component => {
            return currentComponent
                ? currentComponent !== component
                : component;
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

    isValid() {
        return this.state.isValid;
    }

    render() {
        const { children, className } = this.props;

        return (
            <form className={className ? `form ${className}` : 'form'}>
                {children}
            </form>
        );
    }
}
