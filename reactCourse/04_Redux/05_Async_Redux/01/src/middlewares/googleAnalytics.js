import analytic from '../utils/analytics';

export const gaMiddleware = store => next => action => {
    const result = next(action);

    analytic.handleEvent(action);

    return result;
}
