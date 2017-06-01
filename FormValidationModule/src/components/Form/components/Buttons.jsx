import React, { Component, PropTypes } from 'react';

export const Submit = () => (
    <button  className="big-btn btn-orange" type="submit">Submit</button>
);

export class Reset extends Component {
    static contextTypes = {
        validationForm: PropTypes.object
    }

    render() {
        return <button className="big-btn btn-orange" type="button" onClick={this.context.validationForm.resetForm}>Reset</button>;
    }
}
