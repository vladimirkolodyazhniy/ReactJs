export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const COMPLETE_ALL_TODO = 'COMPLETE_ALL_TODO';

export const addTodo = text => {
    return {
        type: 'ADD_TODO',
        id: Date.now(),
        text
    };
};

export const deleteTodo = id => {
    return {
        type: 'DELETE_TODO',
        id
    };
};

export const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};

export const completeAllTodos = () => {
    return {
        type: 'COMPLETE_ALL_TODO',
    };
};
