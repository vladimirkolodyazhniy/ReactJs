import React, { Component } from 'react';

import Wizard from './Wizard.jsx';
import Input from '../components/Input.jsx';
import Checkbox from '../components/Checkbox.jsx';
import ZipInput from '../components/ZipInput.jsx';
import Password from '../components/Password.jsx';
import Email from '../components/Email.jsx';
import Form from './Form.jsx';
import { getLocation } from '../api';

export default class StepForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {},
            errorMessage: null
        };

        this.updateStoreData = this.updateStoreData.bind(this);
        this.getLocationDataByPostal = this.getLocationDataByPostal.bind(this);
    }

    getLocationDataByPostal(postalCode) {
        const locationData = getLocation(postalCode);

        locationData
            .then(data => {
                const city = data.data.city;
                const state = data.data.state;

                this.setState({
                    formData: {
                        ...this.state.formData,
                        city,
                        state
                    }
                });
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        errorMessage: error.response.data.error_msg
                    });
                }
            });
    }

    updateStoreData(formData, isComplete) {
        this.setState(
            {
                formData: { ...this.state.formData, ...formData }
            },
            () => {
                if (isComplete) {
                    console.log(this.state.formData);
                }
            }
        );
    }

    render() {
        const { formData, errorMessage } = this.state;

        return (
            <div className="container">
                <Wizard>
                    <Form name="step1" onSubmit={this.updateStoreData}>
                        <Input
                            defaultValue={formData.firstName}
                            errorComponent
                            label="First Name *"
                            name="firstName"
                            validators="required, minLength: 3, emptyString"
                        />
                        <Input
                            defaultValue={formData.lastName}
                            errorComponent
                            label="Last Name *"
                            name="lastName"
                            validators="required, minLength: 3, emptyString"
                        />
                        <Email
                            defaultValue={formData.email}
                            errorComponent
                            label="Email *"
                            name="email"
                            validators="required, email"
                        />
                        <Password
                            defaultValue={formData.password}
                            errorComponent
                            label="Password *"
                            name="password"
                            validators="required, minLength: 5"
                        />
                        <Password
                            defaultValue={formData.confirmPassword}
                            errorComponent
                            label="Confirm password *"
                            name="confirmPassword"
                            validators="required, minLength: 5, equalsField:password"
                        />
                    </Form>
                    <Form name="step2" onSubmit={this.updateStoreData}>
                        <Input
                            defaultValue={formData.state}
                            label="State"
                            name="state"
                        />
                        <Input
                            defaultValue={formData.city}
                            label="City"
                            name="city"
                        />
                        <ZipInput
                            customErrorMessage={errorMessage}
                            defaultValue={formData.zipcode}
                            errorComponent
                            label="Postal Code *"
                            name="zipcode"
                            onPostalCodeData={this.getLocationDataByPostal}
                        />
                    </Form>
                    <Form name="step3" onSubmit={this.updateStoreData}>
                        <Checkbox
                            defaultValue={true}
                            label="Subscribe"
                            name="subscribe"
                        />
                        <Checkbox label="terms and conditions" name="terms" />
                    </Form>
                </Wizard>
            </div>
        );
    }
}
