const loadState = () => {
    try {
        const serializedState = localStorage.getItem('todos');

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('todos', serializedState);
};

export { loadState, saveState };
