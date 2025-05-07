import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8081/api/users';

export const listUsers = () => axios.get(REST_API_BASE_URL);