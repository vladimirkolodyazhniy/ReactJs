import { Schema, arrayOf } from 'normalizr';

const userSchema = new Schema('users', {
    idAttribute: user => user.login.toLowerCase(),
});

const repoSchema = new Schema('repos', {
    idAttribute: repo => repo.fullName.toLowerCase(),
});

repoSchema.define({
    owner: userSchema,
});

export default {
    USER: userSchema,
    USER_ARRAY: arrayOf(userSchema),
    REPO: repoSchema,
    REPO_ARRAY: arrayOf(repoSchema),
};
