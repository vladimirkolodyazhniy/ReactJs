import { fromJS } from 'immutable';
import undoable from 'redux-undo-immutable';

import {
    ADD_TODO,
    TOGGLE_TODO,
    COMPLETE_ALL_TODO,
    DELETE_TODO
} from '../actions';

const todos = (state = fromJS([]), action) => {
    switch (action.type) {
        case ADD_TODO:
            return state
                .push(fromJS({
                    id: action.id,
                    text: action.text,
                    completed: false
                }));

        case TOGGLE_TODO:
            return state.map(item => action.id !== item.get('id') ? item : item.set('completed', !item.get('completed')));

        case DELETE_TODO:
            return state.filter(todo => todo.get('id') !== action.id);

        case COMPLETE_ALL_TODO:
            return state.map(item => item.set('completed', true));

        default:
            return state;
    }
};

export default undoable(todos);
