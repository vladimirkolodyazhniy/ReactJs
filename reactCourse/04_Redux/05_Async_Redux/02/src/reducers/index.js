import {
    GET_NOTES,
    ADD_NOTE,
    DELETE_NOTE,
    REQUEST_NOTES
} from '../actions';

export default function notes(state = { isFetching: false, items: [] }, action) {
    switch (action.type) {
        case ADD_NOTE: {
            return {
                ...state,
                isFetching: false,
                items: [...state.items, action.note]
            };
        }

        case REQUEST_NOTES: {
            return {
                ...state,
                isFetching: true
            };
        }

        case GET_NOTES: {
            return {
                isFetching: false,
                items: action.notes
            };
        }

        case DELETE_NOTE: {
            return {
                ...state,
                isFetching: false,
                items: state.items.filter(note => note._id !== action.id)
            }
        }

        default: {
            return state;
        }
    }
};
