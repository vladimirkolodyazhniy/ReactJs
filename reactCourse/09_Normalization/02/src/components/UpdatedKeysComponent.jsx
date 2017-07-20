import React, { Component } from 'react';

import onlyUpdateForKeys from '../hoc/onlyUpdateForKeys.jsx';

@onlyUpdateForKeys(['foo'])
export default class UpdatedKeysComponent extends Component {
    render() {
        const { foo, anotherFoo } = this.props;

        return (
            <div>
                <p>Should be updated if <strong>{foo}</strong> changed</p>
                <p>Shouldn't be updated if <strong>{anotherFoo}</strong> changed</p>
            </div>
        );
    }
}
