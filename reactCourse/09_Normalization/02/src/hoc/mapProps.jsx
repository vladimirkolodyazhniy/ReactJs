import React, { Component } from 'react';

export default function mapProps(propsMapping) {
    return Component => {
        return class ComponentWrapper extends Component {
            getMappedProps() {
                const propKeys = Object.keys(this.props);

                return propKeys.reduce(
                    (mappedProps, key) => ({
                        ...mappedProps,
                        [propsMapping[key] || key]: this.props[key]
                    }),
                    {}
                );
            }

            render() {
                const mappedProps = this.getMappedProps();

                return (
                    <Component {...mappedProps} />
                );
            }
        };
    };
}
