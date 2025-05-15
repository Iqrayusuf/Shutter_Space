/*import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

export const registerUser = async (formData) => {
    return await axios.post(`${API_BASE_URL}/signup`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};


export const updateUser = async (id, formData) => {
  const response = await axios.put(`http://localhost:8080/api/users/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
*/

/*
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

export const updateUser = async (id, formData) => {
  try {
    console.log(`Updating user with ID: ${id}`);
    console.log('Form data keys:', [...formData.entries()].map(entry => entry[0]));
    
    const response = await axios.put(`${API_BASE_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Update error:', error.response?.data || error.message);
    throw error;
  }
};*/


/*
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

export const registerUser = async (formData) => {
  try {
    console.log("Registering new user...");
    const response = await axios.post(`${API_BASE_URL}/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("Registration successful:", response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

export const updateUser = async (id, formData) => {
  try {
    console.log(`Updating user with ID: ${id}`);
    
    // Log FormData keys for debugging
    if (formData instanceof FormData) {
      console.log('Form data keys:', [...formData.entries()].map(entry => entry[0]));
    }
    
    const response = await axios.put(`${API_BASE_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error('Update error:', error);
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};*/

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

export const registerUser = async (formData) => {
  try {
    console.log("Registering new user...");
    const response = await axios.post(`${API_BASE_URL}/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("Registration successful:", response.data);
    return response.data; // Return the data from the response, which should include the user ID
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/*export const updateUser = async (id, formData) => {
  try {
    console.log(`Updating user with ID: ${id}`);
    
    // Log FormData keys for debugging
    if (formData instanceof FormData) {
      console.log('Form data keys:', [...formData.entries()].map(entry => entry[0]));
    }
    
    const response = await axios.put(`${API_BASE_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error('Update error:', error);
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    throw error;
  }
};*/

export const updateUser = async (id, formData) => {
  try {
    console.log(`Updating user with ID: ${id}`);
    
    // Log form data for debugging
    if (formData instanceof FormData) {
      console.log('Form data entries:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1] instanceof Blob ? 
          "Blob data: " + pair[1].size + " bytes" : pair[1]);
      }
    }
    
    const response = await axios.put(`${API_BASE_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log("Update response status:", response.status);
    console.log("Update response data:", response.data);
    
    return response.data;
  } catch (error) {
    console.error('Update error:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};