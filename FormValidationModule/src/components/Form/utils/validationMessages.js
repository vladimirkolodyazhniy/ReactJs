const defaultMessages = {
    required: 'This field is required',
    email: 'This is not a valid email',
    url: 'This is not a valid URL',
    equalsField: field => `This value should be equal to ${field} value`,
    maxLength: length => `This value length should not exceeded ${length}`,
    minLength: length => `This value length should be at least ${length} `,
    maxValue: maxValue => `This value should not exceeded ${maxValue}`,
    minValue: minValue => `This value should be more than ${minValue}`,
    positive: 'This value should be positive',
    notNull: 'This value should be not equal 0',
    format: 'This value can only contain chars matches the pattern',
    alpha: 'This value should contain only letters',
    alphanumeric: 'This value should contain letters or numbers',
    zipcode: 'This value should be regular zip code',
    numeric: 'This value should be numeric',
    integer: 'This value should be integer number',
    emptyString: 'This value should not be empty string'
};

export default defaultMessages;
