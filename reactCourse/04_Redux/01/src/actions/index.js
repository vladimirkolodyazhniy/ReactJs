export const addCounter = () => {
    return {
        type: 'ADD_COUNTER',
        id: Date.now(),
        count: 0
    };
};

export const increment = id => {
    return {
        type: 'INCREMENT',
        id
    }
};

export const decrement = id => {
    return {
        type: 'DECREMENT',
        id
    }
};
