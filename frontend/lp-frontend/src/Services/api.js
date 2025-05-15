// src/services/api.js
import axios from 'axios';

// Create a base axios instance for API calls
const api = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// File upload specific instance
export const uploadApi = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// API functions
export const saveLearningPlan = (learningPlanData) => {
  return api.post('/users', learningPlanData);
};

export const updateLearningPlan = (id, learningPlanData) => {
  return api.put(`/users/${id}`, learningPlanData);
};

export const fetchLearningPlans = () => {
  return api.get('/users');
};

export const fetchLearningPlanById = (id) => {
  return api.get(`/users/${id}`);
};

export const deleteLearningPlan = (id) => {
  return api.delete(`/users/${id}`);
};

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return uploadApi.post('/upload', formData);
};

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;