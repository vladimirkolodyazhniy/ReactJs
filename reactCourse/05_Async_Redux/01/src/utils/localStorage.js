const loadState = () => {
    const serializedState = localStorage.getItem('todos');

    if (serializedState === null) {
        return undefined;
    }

    return JSON.parse(serializedState);
}

const saveState = (state) => {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('todos', serializedState);
}

export { loadState, saveState };
