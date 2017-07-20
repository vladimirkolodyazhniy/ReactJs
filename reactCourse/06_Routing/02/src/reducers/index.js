import {
    ADD_TODO,
    TOGGLE_TODO,
    COMPLETE_ALL_TODO,
    DELETE_TODO
} from '../actions';

const todo = (state, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                id: action.id,
                text: action.text,
                completed: false
            };

        case TOGGLE_TODO:
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };

        case COMPLETE_ALL_TODO:
            return {
                ...state,
                completed: true
            };

        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                todo(null, action)
            ];

        case TOGGLE_TODO:
            return state.map(item => todo(item, action));

        case DELETE_TODO:
            return state.filter(todo => todo.id !== action.id);

        case COMPLETE_ALL_TODO:
            return state.map(item => todo(item, action));

        default:
            return state;
    }
};

export default todos;
