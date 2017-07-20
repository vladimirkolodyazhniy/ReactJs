function counter(state, action) {
    switch (action.type) {
        case 'ADD_COUNTER': {
            return {
                id: action.id,
                count: action.count
            };
        }

        case 'DECREMENT': {
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                count: state.count - 1
            };
        }

        case 'INCREMENT': {
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                count: state.count + 1
            };
        }

        default: {
            return state;
        }
    }
};

export default function counters(state = [], action) {
    switch (action.type) {
        case 'ADD_COUNTER': {
            return [
                ...state,
                counter(undefined, action)
            ];
        }

        case 'INCREMENT': {
            return state.map(item => counter(item, action));
        }

        case 'DECREMENT': {
            return state.map(item => counter(item, action));
        }

        default: {
            return state;
        }
    }
};
