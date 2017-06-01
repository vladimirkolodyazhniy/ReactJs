const CUSTOM_COMPONENTS = ['CustomFormComponent'];

import { cloneElement, Children } from 'react';
import Logger from 'js-logger';
import { functionName } from '../../utils/helpers';
import Input from './components/Input.jsx';

export default class FormProvider extends Input {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            child: Children.only(this.props.children)
        };
    }

    getValue() {
        const customComponentName = functionName(this.state.child.type);

        if (CUSTOM_COMPONENTS.indexOf(customComponentName) >= 0) {
            switch (customComponentName) {
                case 'CustomFormComponent':
                    const tagInputData = this.ref.getData();

                    return tagInputData.data;
                default:
                    return null;
            }
        } else {
            Logger.warn(`${customComponentName} is not supported for Form data provision`);
        }
    }

    render() {
        return cloneElement(this.state.child, {
            ref: (component) => this.ref = component
        });
    }
}
