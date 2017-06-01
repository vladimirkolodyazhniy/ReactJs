import React, { Component } from 'react';
import Form,
    {
        Input,
        Checkbox,
        RadioGroup,
        Textarea,
        Password,
        Email,
        Select,
        FormProvider,
        Submit,
        Reset
    } from './Form/index.jsx';

class CustomFormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        this.setState({
            data: e.currentTarget.value
        });
    }

    getData() {
        return this.state;
    }

    render() {
        return (
            <div className="custom-input">
                <label className="text-input">
                    <span className="label-text">External component</span>
                    <div className="input-holder">
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.data}
                            onChange={this.onInputChange}
                        />
                    </div>
                </label>
            </div>
        );
    }
}

export default class ValidationExample extends Component {
    constructor(props) {
        super(props);

        this.customMessage = {
            required: 'Custom required error message',
            email: 'Custom email error message'
        };
    }

    render() {
        return <div>
            <div>
                <Form
                    name="Login"
                    onSubmit={(data) => console.log(data)}
                >
                    <h2>Simple</h2>
                    <Input
                        errorComponent
                        label="Simple input"
                        name="input"
                        validators="required, emptyString"
                    />
                    <Checkbox
                        label="Simple checkbox"
                        name="checkbox"
                    />
                    <Input
                        errorComponent
                        label="Username"
                        name="username"
                        validators="minLength: 5, maxLength:15, undefinedRule"
                    />
                    <Password
                        errorComponent
                        label="Password"
                        name="password"
                        validationErrors={{ required: this.customMessage.required }}
                        validators="required"
                    />
                    <Password
                        errorComponent
                        label="Retype password"
                        name="password1"
                        validators="required, equalsField:password"
                    />
                    <Email
                        errorComponent
                        label="Email"
                        name="email"
                        validationErrors={this.customMessage}
                        validators="required, email"
                    />
                    <Input
                        errorComponent
                        label="Pattern(alphanumeric)"
                        name="pattern"
                        validators="format:^[a-zA-Z0-9]+$"
                    />
                    <Input
                        errorComponent
                        label="Zipcode"
                        name="zipcode"
                        validators="zipcode"
                    />
                    <div className="btn-holder">
                        <Submit />
                        <Reset />
                    </div>
                </Form>
            </div>
            <div>
                <Form
                    name="external"
                    type="formData"
                    onSubmit={(data) => console.log(data)}
                >
                    <h2>Simple form with external component data(Form data type)</h2>
                    <Input
                        errorComponent
                        label="Zipcode"
                        name="zipcode"
                        validators="zipcode"
                    />
                    <FormProvider name="tagInput">
                        <CustomFormComponent />
                    </FormProvider>
                    <div className="btn-holder">
                        <Submit />
                    </div>
                </Form>
            </div>
            <div>
                <Form
                    enterKeySubmit
                    name="Login1"
                    onSubmit={(data) => console.log(data)}
                >
                    <h2>Simple (Submit + Enter)</h2>
                    <Input
                        errorComponent
                        label="required text"
                        name="text"
                        validators="required"
                    />
                    <Textarea
                        errorComponent
                        label="Simple textarea"
                        name="textarea"
                        validators="required"
                    />
                    <Select
                        defaultValue="mm"
                        label="Simple Select"
                        name="units"
                        options={[
                            { value: 'inch', text: 'Inch' },
                            { value: 'px', text: 'Pixels' },
                            { value: 'mm', text: 'Millimeter' }
                        ]}
                    />
                    <RadioGroup
                        defaultValue="option1"
                        name="options"
                        options={[
                            { value: 'option1', label: 'Radio option1' },
                            { value: 'option2', label: 'Radio option1' },
                            { value: 'option3', label: 'Radio option2' }
                        ]}
                    />
                    <div className="btn-holder">
                        <Submit />
                    </div>
                </Form>
            </div>
            <div>
                <Form
                    name="clickOutsideForm"
                    onClickOutside
                    onSubmit={(data) => console.log(data)}
                >
                    <h2>Simple ClickOutside form</h2>
                    <Input
                        errorComponent
                        label="required text"
                        name="text"
                        validators="required"
                    />
                    <div className="btn-holder">
                        <Submit />
                    </div>
                </Form>
            </div>
            <div>
                <Form
                    name="Search"
                    onDebounce={1000}
                    onSubmit={(data) => console.log(data)}
                >
                    <h2>Search form</h2>
                    <Input
                        errorComponent
                        label="Search input"
                        name="search"
                        validationErrors={{ minLength: 'search request should at least contain 1 letter' }}
                        validators="minLength: 1, emptyString"
                    />
                </Form>
            </div>
        </div>;
    }
}
