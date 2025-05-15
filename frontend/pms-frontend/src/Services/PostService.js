import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/posts';

// Get all posts
export const listPosts = () => axios.get(REST_API_BASE_URL);

// Create a new post (multipart/form-data)
export const createPost = (formData) => {
  return axios.post(REST_API_BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

// Update an existing post (also multipart/form-data)
export const updatePost = (postId, formData) => {
  return axios.put(`${REST_API_BASE_URL}/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

// Get a post by ID
export const getPostById = (postId) => axios.get(`${REST_API_BASE_URL}/${postId}`);

// Delete a post by ID
export const deletePost = (postId) => axios.delete(`${REST_API_BASE_URL}/${postId}`);
