import React, { Component } from 'react';

export default class Success extends Component {
    render() {
        return (
            <div className="success-holder">
                <div className="img-holder">
                    <img alt="Success icon" src="https://static.mytaxi.com/images/layout-1/icons/success.svg" />
                </div>
                <h1>All steps were successfully completed!</h1>
            </div>
        );
    }
}
