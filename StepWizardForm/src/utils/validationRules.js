const validationRules = {
    required(value, msg) {
        return value.length === 0 && msg;
    },

    email(value, msg) {
        const PATTERN = /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

        return !PATTERN.exec(value) && msg;
    },

    equalsField(value, msg, field, values) {
        return value !== values[field] && msg;
    },

    zipcode(value, msg) {
        const PATTERN = /^\d{5}(?:[-\s]\d{4})?$/;

        return !PATTERN.exec(value) && msg;
    },

    emptyString(value, msg) {
        const PATTERN = /^\s+$/;

        return PATTERN.exec(value) && msg;
    },
    
    minLength(value, msg, length) {
        return value.length < length && msg;
    },

};

export default validationRules;
