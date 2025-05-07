
import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/posts';

export const listPosts = () => axios.get(REST_API_BASE_URL);

export const createPost = (post) => axios.post(REST_API_BASE_URL, post);