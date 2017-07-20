export default function viewType(state = 'list', action) {
    switch (action.type) {
        case 'SET_VIEW': {
            return action.viewType;
        }

        default: {
            return state;
        }
    }
};
