const validationRules = {
    required(value, msg) {
        return value.length === 0 && msg;
    },

    email(value, msg) {
        const PATTERN = /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

        return !PATTERN.exec(value) && msg;
    },

    url(value, msg) {
        const PATTERN = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

        return !PATTERN.exec(value) && msg;
    },

    equalsField(value, msg, field, values) {
        return value !== values[field] && msg;
    },

    maxLength(value, msg, length) {
        return value.length > length && msg;
    },

    minLength(value, msg, length) {
        return value.length < length && msg;
    },

    maxValue(value, msg, maxValue) {
        return Number(value) > Number(maxValue) && msg;
    },

    minValue(value, msg, minValue) {
        return Number(value) < Number(minValue) && msg;
    },

    positive(value, msg) {
        return Number(value) < 0 && msg;
    },

    notNull(value, msg) {
        return Number(value) === 0 && msg;
    },

    format(value, msg, pattern) {
        const PATTERN = new RegExp(pattern);

        return !PATTERN.exec(value) && msg;
    },

    alpha(value, msg) {
        const PATTERN = /^[A-Z]+$/i;

        return !PATTERN.exec(value) && msg;
    },

    alphanumeric(value, msg) {
        const PATTERN = /^[0-9A-Z]+$/i;

        return !PATTERN.exec(value) && msg;
    },

    numeric(value, msg)  {
        const PATTERN = /^[-+]?(?:\d*[.])?\d+$/;

        return !PATTERN.exec(value) && msg;
    },

    integer(value, msg)  {
        const PATTERN = /^(?:[-+]?(?:0|[1-9]\d*))$/;

        return !PATTERN.exec(value) && msg;
    },

    zipcode(value, msg) {
        const PATTERN = /^\d{5}(?:[-\s]\d{4})?$/;

        return !PATTERN.exec(value) && msg;
    },

    emptyString(value, msg) {
        const PATTERN = /^\s+$/;

        return PATTERN.exec(value) && msg;
    }

};

export default validationRules;
