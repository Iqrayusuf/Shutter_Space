import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/photography';

export const listPhotography = () => axios.get(REST_API_BASE_URL);

export const createChallenge = (photography) => axios.post(REST_API_BASE_URL, photography);

export const getPhotography = (photographyId) => axios.get(REST_API_BASE_URL + '/' + photographyId);

export const updatePhotography = (photographyId,photography) => axios.put(REST_API_BASE_URL + '/' + photographyId, photography);

export const deletePhotography = (photographyId) => axios.delete(REST_API_BASE_URL + '/' + photographyId);
