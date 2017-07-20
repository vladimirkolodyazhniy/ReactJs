import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

import { getRandomInt } from '../utils/memorize';

import {
    API_KEY,
    API_PREFIX
} from '../config';

export function fetchImages() {

    const params = {
        query: 'a',
        api_key: API_KEY,
        page: getRandomInt(1, 20)
    };

    return axios.get(`${API_PREFIX}/search/movie`, { params })
        .then(data => camelcaseKeys(data, { deep: true }));
}

export default {
    fetchImages
};
