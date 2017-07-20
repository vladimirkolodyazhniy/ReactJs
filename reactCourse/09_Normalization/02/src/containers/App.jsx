import React, { Component } from 'react';

import MappedPropsComponent from '../components/MappedPropsComponent.jsx';
import UpdatedKeysComponent from '../components/UpdatedKeysComponent.jsx';
import ConditionRenderComponent from '../components/ConditionRenderComponent.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            foo: 'hello Foo',
            anotherFoo: 'hello anotherFoo',
        };

        this.updateSpecifiedKeys = this.updateSpecifiedKeys.bind(this);
        this.updateUnspecifiedKeys = this.updateUnspecifiedKeys.bind(this);
    }

    updateSpecifiedKeys() {
        this.setState({
            foo: 'Update Foo'
        });
    }

    updateUnspecifiedKeys() {
        this.setState({
            anotherFoo: 'Update anotherFoo'
        });
    }

    render() {
        const { anotherFoo, foo } = this.state;

        return (
            <div>
                <div>
                    <h1>MapPropsExample</h1>
                    <MappedPropsComponent anotherFoo="hello1" foo="hello" />
                </div>

                <div>
                    <h1>OnlyUpdateForKeysExample</h1>
                    <button onClick={this.updateSpecifiedKeys}>Update Specified Keys</button>
                    <button onClick={this.updateUnspecifiedKeys}>Update Unspecified Keys</button>

                    <UpdatedKeysComponent anotherFoo={anotherFoo} foo={foo} />
                </div>

                <div>
                    <h1>ShouldComponentRenderExample</h1>
                    <ConditionRenderComponent isLoaded />
                </div>
            </div>
        );
    }
}
