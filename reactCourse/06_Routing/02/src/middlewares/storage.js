import { saveState } from '../utils/localStorage';

export const localStorageMiddleware = store => next => action => {
    const result = next(action);

    saveState(store.getState());

    return result;
};
