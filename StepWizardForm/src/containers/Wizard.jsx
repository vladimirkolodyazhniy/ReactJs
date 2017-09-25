import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import Success from '../components/Success.jsx';

export default class MultiStep extends Component {
    static propTypes = {
        children: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
            isCompleted: false,
            completeState: 0,
            navState: this.getNavStates(0, this.props.children.length)
        };

        this.hidden = {
            display: 'none'
        };

        this.nextHandler = this.nextHandler.bind(this);
        this.previousHandler = this.previousHandler.bind(this);
        this.isFinalStep = this.isFinalStep.bind(this);
    }

    getNavStates(indx, length) {
        let styles = [];

        for (let i = 0; i < length; i++) {
            if (i < indx) {
                styles.push('done');
            } else if (i === indx) {
                styles.push('doing');
            }
        }
        return {
            styles,
            current: indx
        };
    }

    setNavState(next) {
        const { children } = this.props;

        this.setState({ navState: this.getNavStates(next, children.length) });

        if (next < children.length) {
            this.setState({ completeState: next });
        }
    }

    previousHandler() {
        if (this.state.completeState > 0) {
            this.setNavState(this.state.completeState - 1);
        }
    }

    isFinalStep() {
        return this.state.completeState + 1 === this.props.children.length;
    }

    nextHandler() {
        const { activeComponent } = this.refs;

        if (activeComponent instanceof Component) {
            activeComponent.validateForm().then(() => {
                if (activeComponent.state.isValid) {
                    let formData = activeComponent.getCurrentValues();

                    if (this.isFinalStep()) {
                        activeComponent.props.onSubmit(formData, true);

                        this.setState({ isCompleted: true });
                    } else {
                        activeComponent.props.onSubmit(formData);
                    }

                    this.setNavState(this.state.completeState + 1);
                }
            });
        } else {
            console.warn('Component in view is not an instanceof origin React Component');
        }
    }

    renderStepsNav() {
        return Children.map(this.props.children, (step, i) => (
            <li className={this.state.navState.styles[i]} key={i}>
                <span>{step.props.name}</span>
            </li>
        ));
    }

    render() {
        const stepComponent = Children.map(this.props.children, item => item);

        const componentToRender = React.cloneElement(
            stepComponent[this.state.completeState],
            {
                ref: 'activeComponent'
            }
        );

        const isFinalStep = this.isFinalStep();

        const { isCompleted } = this.state;

        return (
            <div>
                {isCompleted ? (
                    <Success />
                ) : (
                    <div className="step-form-holder">
                        <ul className="step-progress">
                            {this.renderStepsNav()}
                        </ul>

                        {componentToRender}

                        <div className="btn-holder">
                            <button
                                className="btn"
                                style={
                                    this.state.navState.current === 0
                                        ? this.hidden
                                        : null
                                }
                                onClick={this.previousHandler}
                            >
                                Previous
                            </button>

                            <button
                                className={'btn'}
                                onClick={this.nextHandler}
                            >
                                {isFinalStep ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
