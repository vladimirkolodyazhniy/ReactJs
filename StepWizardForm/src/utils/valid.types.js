export const isDefined = obj =>  typeof obj !== 'undefined';

export const isFunction = functionToCheck => {
    let getType = {};

    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};
