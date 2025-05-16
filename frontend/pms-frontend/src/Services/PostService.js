import axios from 'axios';

const API_URL = 'http://localhost:8080/api/posts';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json'
  }
});

// Enable debugging
const debug = true;

// Service to handle API requests for posts
export const PostService = {
  // Create a new post with media files
  createPost: async (postData, mediaFiles) => {
    try {
      if (debug) console.log('Creating post with data:', postData);
      
      const formData = new FormData();
      
      // Convert post data to JSON and append to form
      formData.append('post', new Blob([JSON.stringify(postData)], { 
        type: 'application/json' 
      }));
      
      // Append each media file
      if (mediaFiles && mediaFiles.length > 0) {
        if (debug) console.log(`Attaching ${mediaFiles.length} media files`);
        
        for (let i = 0; i < mediaFiles.length; i++) {
          formData.append("mediaFiles", mediaFiles[i]);
        }
      }
      
      const response = await apiClient.post('', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (debug) console.log('Post created successfully:', response.data);
      
      return response;
    } catch (error) {
      console.error('Error in createPost:', error);
      throw error;
    }
  },

  // Get all posts
  listPosts: async () => {
    try {
      if (debug) console.log('Fetching all posts');
      const response = await apiClient.get('');
      if (debug) console.log(`Fetched ${response.data.length} posts`);
      return response;
    } catch (error) {
      console.error('Error in listPosts:', error);
      throw error;
    }
  },

  // Get a post by ID
  getPost: async (postId) => {
    try {
      if (debug) console.log(`Fetching post with ID: ${postId}`);
      
      // Validate postId
      if (!postId || isNaN(parseInt(postId))) {
        throw new Error(`Invalid post ID: ${postId}`);
      }
      
      const response = await apiClient.get(`/${postId}`);
      
      if (debug) {
        console.log(`Post ${postId} data:`, response.data);
      }
      
      return response;
    } catch (error) {
      console.error(`Error fetching post ${postId}:`, error);
      throw error;
    }
  },

  // Update a post with optional new media files
  updatePost: async (postId, postData, mediaFiles) => {
    try {
      if (debug) console.log(`Updating post ${postId} with data:`, postData);
      
      // Validate postId
      if (!postId || isNaN(parseInt(postId))) {
        throw new Error(`Invalid post ID: ${postId}`);
      }
      
      const formData = new FormData();
      
      // Convert post data to JSON and append to form
      formData.append('post', new Blob([JSON.stringify(postData)], {
        type: 'application/json'
      }));
      
      // Append each media file if provided
      if (mediaFiles && mediaFiles.length > 0) {
        if (debug) console.log(`Attaching ${mediaFiles.length} media files to post ${postId}`);
        
        for (let i = 0; i < mediaFiles.length; i++) {
          formData.append("mediaFiles", mediaFiles[i]);
        }
      } else {
        if (debug) console.log('No media files to update');
      }
      
      // Log form data for debugging
      if (debug) {
        for (let pair of formData.entries()) {
          console.log(`Form data entry: ${pair[0]}, ${typeof pair[1]}`);
        }
      }
      
      const response = await apiClient.put(`/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (debug) console.log(`Post ${postId} updated successfully:`, response.data);
      
      return response;
    } catch (error) {
      console.error(`Error updating post ${postId}:`, error);
      throw error;
    }
  },

  // Delete a post
  deletePost: async (postId) => {
    try {
      if (debug) console.log(`Deleting post ${postId}`);
      const response = await apiClient.delete(`/${postId}`);
      if (debug) console.log(`Post ${postId} deleted successfully`);
      return response;
    } catch (error) {
      console.error(`Error deleting post ${postId}:`, error);
      throw error;
    }
  },
  
  // Like a post
  likePost: async (postId, userId) => {
    try {
      if (debug) console.log(`User ${userId} liking post ${postId}`);
      const response = await apiClient.post(`/${postId}/like`, { userId });
      return response;
    } catch (error) {
      console.error(`Error liking post ${postId}:`, error);
      throw error;
    }
  },
  
  // Unlike a post
  unlikePost: async (postId, userId) => {
    try {
      if (debug) console.log(`User ${userId} unliking post ${postId}`);
      const response = await apiClient.delete(`/${postId}/like/${userId}`);
      return response;
    } catch (error) {
      console.error(`Error unliking post ${postId}:`, error);
      throw error;
    }
  },
  
  // Add a comment to a post
  commentOnPost: async (postId, comment) => {
    try {
      if (debug) console.log(`Adding comment to post ${postId}:`, comment);
      const response = await apiClient.post(`/${postId}/comments`, comment);
      return response;
    } catch (error) {
      console.error(`Error commenting on post ${postId}:`, error);
      throw error;
    }
  },
  
  // Get comments for a post
  getComments: async (postId) => {
    try {
      if (debug) console.log(`Fetching comments for post ${postId}`);
      const response = await apiClient.get(`/${postId}/comments`);
      return response;
    } catch (error) {
      console.error(`Error getting comments for post ${postId}:`, error);
      throw error;
    }
  },
  
  // Delete a comment
  deleteComment: async (postId, commentId) => {
    try {
      if (debug) console.log(`Deleting comment ${commentId} from post ${postId}`);
      const response = await apiClient.delete(`/${postId}/comments/${commentId}`);
      return response;
    } catch (error) {
      console.error(`Error deleting comment ${commentId} from post ${postId}:`, error);
      throw error;
    }
  }
};

export const { 
  createPost, 
  listPosts, 
  getPost, 
  updatePost, 
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
  getComments,
  deleteComment
} = PostService;