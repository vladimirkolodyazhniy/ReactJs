import React, { Component } from 'react';

import mapProps from '../hoc/mapProps.jsx';

@mapProps({ foo: 'bar' })
export default class MappedPropsComponent extends Component {
    render() {
        return (
            <div>
                {this.props.bar}
            </div>
        );
    }
}
