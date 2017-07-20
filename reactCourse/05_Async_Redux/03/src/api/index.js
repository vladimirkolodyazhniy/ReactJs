import axios from 'axios';

const API_PREFIX = 'https://api.themoviedb.org/3';
const API_KEY = '920feab675546a7c0aa9f14bc64ef606';

export function getMovies(query, page) {
    const params = {
        query: query,
        api_key: API_KEY,
        page
    };

    return axios.get(`${API_PREFIX}/search/movie`, { params });
}

export default {
    getMovies,
};
