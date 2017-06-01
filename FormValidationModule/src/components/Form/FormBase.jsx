import React, { Component, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';

@onClickOutside
export default class FormBase extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onKeyPress: PropTypes.func,
        onKeyUp: PropTypes.func,
        children: PropTypes.node
    }

    handleClickOutside() {
        this.props.onSubmit();
    }

    render() {
        const { children, className, onSubmit, onKeyPress, onKeyUp } = this.props;

        return (
            <form className={className ? `form ${className}`: 'form'}
                onKeyPress={onKeyPress}
                onKeyUp={onKeyUp}
                onSubmit={onSubmit}
                >
                {children}
            </form>
        );
    }
}
