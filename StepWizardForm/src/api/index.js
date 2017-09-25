import axios from 'axios';

const API_PREFIX = 'https://www.zipcodeapi.com/rest/';
const API_KEY = 'js-oJSxIajrk49SOOeWBoMrKfDbiPVOyrrWakuTvOkQSuIHiWDUlql5FZhYOcNnEfkO';

export function getLocation(code) {
    return axios.get(`${API_PREFIX}${API_KEY}/info.json/${code}/radians`);
}

export default {
    getLocation,
};
