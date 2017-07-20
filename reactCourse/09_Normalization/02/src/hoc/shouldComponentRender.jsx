import React, { Component } from 'react';

export default function shouldComponentRender(predicateFn) {
    return Component => {
        return class ComponentWrapper extends Component {
            render() {
                return (
                    predicateFn(this.props)
                    ? <Component {...this.props.props} />
                    : null
                );
            }
        };
    };
}
