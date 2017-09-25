const defaultMessages = {
    required: 'This field is required',
    email: 'This is not a valid email',
    equalsField: field => `This value should be equal to ${field} value`,
    minLength: length => `This value length should be at least ${length} `,
    zipcode: 'This value should be regular zip code',
    emptyString: 'This value should not be empty string'
};

export default defaultMessages;
