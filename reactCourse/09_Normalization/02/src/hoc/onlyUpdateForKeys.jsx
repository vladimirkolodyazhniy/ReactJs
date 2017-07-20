import React, { Component } from 'react';

export default function onlyUpdateForKeys(keys) {
    return Component => {
        return class ComponentWrapper extends Component {
            shouldComponentUpdate(nextProps) {
                return !keys.every(key => this.props[key] === nextProps[key]);
            }

            render() {
                return (
                    <Component {...this.props} />
                );
            }
        };
    };
}
