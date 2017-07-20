import React, { Component } from 'react';

import shouldComponentRender from '../hoc/shouldComponentRender.jsx';

@shouldComponentRender(props => props.isLoaded)
export default class ConditionRenderComponent extends Component {
    render() {
        return (
            <div>
                <h2>I'am Rendered</h2>
            </div>
        );
    }
}
