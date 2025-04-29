import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/userPhotography';

export const ListUser_challenge = () => axios.get(REST_API_BASE_URL);