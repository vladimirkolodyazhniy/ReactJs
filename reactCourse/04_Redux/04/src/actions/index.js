export const addContact = (name, email) => {
    return {
        type: 'ADD_CONTACT',
        id: Date.now(),
        name,
        email
    };
};

export const toggleFavorite = id => {
    return {
        type: 'TOGGLE_FAVORITE',
        id
    };
};

export const setFilter = filter => {
    return {
        type: 'SET_FILTER',
        filter
    };
};

export const setView = viewType => {
    return {
        type: 'SET_VIEW',
        viewType
    };
};
