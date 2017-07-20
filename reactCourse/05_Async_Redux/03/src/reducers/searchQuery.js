import { SELECT_QUERY } from '../actions';

export default function searchQuery(state = '', action) {
    switch (action.type) {
        case SELECT_QUERY:
            return action.query;
        default:
            return state;
    }
}
