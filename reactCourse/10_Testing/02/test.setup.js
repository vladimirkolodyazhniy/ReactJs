/*eslint-disable*/
import chai from 'chai';

require.extensions['.less'] = () => {};
require.extensions['.css'] = () => {};
require.extensions['.svg'] = () => {};
require.extensions['.png'] = () => {};
require.extensions['.jpg'] = () => {};

const { expect } = chai;
