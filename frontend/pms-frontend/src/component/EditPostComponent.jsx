import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, updatePost } from '../Services/PostService';
import './EditPost.css';

const EditPostComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Post data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  
  // Media files
  const [currentMedia, setCurrentMedia] = useState([]);
  const [newMediaFiles, setNewMediaFiles] = useState([]);
  const [mediaPreview, setMediaPreview] = useState([]);
  const [keepExistingMedia, setKeepExistingMedia] = useState(true);
  
  // Form validation
  const [validationErrors, setValidationErrors] = useState({});
  
  // Debugging flag
  const debug = true;
  
  // Fetch post data on component mount
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        setError('');
        
        if (debug) console.log(`Attempting to fetch post with ID: ${id} (Attempt ${retryCount + 1})`);
        
        // Add delay for retries to prevent overloading the server
        if (retryCount > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // Validate ID
        const postId = parseInt(id);
        if (isNaN(postId) || postId <= 0) {
          throw new Error(`Invalid post ID: ${id}`);
        }
        
        // Fetch post data
        const response = await getPost(postId);
        
        if (debug) console.log('API Response:', response);
        
        if (!response || !response.data) {
          throw new Error('Empty response received from server');
        }
        
        const post = response.data;
        
        if (debug) console.log('Post data retrieved:', post);
        
        // Set post data
        setTitle(post.title || '');
        setDescription(post.description || '');
        setTags((post.tags || []).join(', '));
        setIsPublic(post.isPublic !== undefined ? post.isPublic : true);
        
        // Set current media
        setCurrentMedia(post.mediaUrls || []);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        
        if (retryCount < 2) {
          // Automatically retry up to 2 times
          setRetryCount(prevCount => prevCount + 1);
        } else {
          setError(`Failed to load post. ${err.message || 'Please try again.'}`);
          setLoading(false);
        }
      }
    };
    
    fetchPostData();
  }, [id, retryCount]);
  
  // Handle media file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewMediaFiles(files);
    
    // Create previews for selected files
    const previews = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      isVideo: file.type.startsWith('video/')
    }));
    
    setMediaPreview(previews);
    
    if (debug) console.log('Selected files:', files);
  };
  
  // Validate form before submission
  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    if (!title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }
    
    if (!description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }
    
    // Check if we have either existing media or new media
    if (!keepExistingMedia && newMediaFiles.length === 0 && currentMedia.length === 0) {
      errors.media = "At least one media file is required";
      isValid = false;
    }
    
    // If uploading new video, ensure only one is selected
    if (newMediaFiles.length > 0) {
      const isVideoFile = newMediaFiles[0].type.startsWith('video/');
      if (isVideoFile && newMediaFiles.length > 1) {
        errors.media = "Only one video file is allowed";
        isValid = false;
      }
      if (!isVideoFile && newMediaFiles.length > 3) {
        errors.media = "You can upload up to 3 images";
        isValid = false;
      }
    }
    
    setValidationErrors(errors);
    
    if (debug && !isValid) console.log('Validation errors:', errors);
    
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Parse ID properly
      const postId = parseInt(id);
      
      // Prepare post data
      const postData = {
        postId: postId,
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        isPublic: Boolean(isPublic)
      };
      
      if (debug) console.log('Submitting post data:', postData);
      
      // Determine if we should keep existing media
      let mediaFilesToSend = newMediaFiles;
      if (keepExistingMedia && newMediaFiles.length === 0) {
        // Keep existing media, don't send any new files
        mediaFilesToSend = [];
      }
      
      if (debug) console.log(`Sending update request for post ${postId} with ${mediaFilesToSend.length} media files`);
      
      // Send update request
      const response = await updatePost(postId, postData, mediaFilesToSend);
      
      if (debug) console.log('Update response:', response);
      
      // Navigate back to posts page
      navigate('/posts');
    } catch (err) {
      console.error('Error updating post:', err);
      setError(`Failed to update post: ${err.message || 'Please try again.'}`);
      setSubmitting(false);
    }
  };
  
  // Retry loading the post
  const handleRetry = () => {
    setRetryCount(0); // Reset retry count to trigger a fresh attempt
  };
  
  // Cancel edit and go back
  const handleCancel = () => {
    navigate('/posts');
  };
  
  if (loading) {
    return (
      <div className="edit-post-loading">
        <div className="spinner"></div>
        <p>Loading post data...</p>
        <p className="loading-detail">Attempt {retryCount + 1}/3</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="edit-post-error">
        <h2>Error</h2>
        <p>{error}</p>
        <div className="error-actions">
          <button className="btn-secondary" onClick={handleRetry}>
            Try Again
          </button>
          <button className="btn-primary" onClick={() => navigate('/posts')}>
            Return to Posts
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="edit-post-container">
      <div className="edit-post-header">
        <h1>Edit Post</h1>
        <p>Update your post details and media</p>
      </div>
      
      <form className="edit-post-form" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={validationErrors.title ? 'error' : ''}
          />
          {validationErrors.title && (
            <p className="error-message">{validationErrors.title}</p>
          )}
        </div>
        
        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={validationErrors.description ? 'error' : ''}
          ></textarea>
          {validationErrors.description && (
            <p className="error-message">{validationErrors.description}</p>
          )}
        </div>
        
        {/* Tags */}
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. nature, travel, photography"
          />
        </div>
        
        {/* Current Media Section */}
        {currentMedia.length > 0 && (
          <div className="form-group current-media-section">
            <label>Current Media</label>
            <div className="media-preview-container">
              {currentMedia.map((url, index) => (
                <div key={`current-${index}`} className="media-preview">
                  {url.toLowerCase().endsWith('.mp4') ? (
                    <video controls>
                      <source src={url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img src={url} alt={`Current media ${index + 1}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="keep-media-option">
              <input
                type="checkbox"
                id="keepMedia"
                checked={keepExistingMedia}
                onChange={(e) => setKeepExistingMedia(e.target.checked)}
              />
              <label htmlFor="keepMedia">Keep existing media</label>
            </div>
          </div>
        )}
        
        {/* New Media Upload */}
        <div className="form-group">
          <label htmlFor="newMedia">
            {currentMedia.length > 0
              ? 'Upload New Media (will replace existing media if any selected)'
              : 'Upload Media (1 video or up to 3 images)'}
          </label>
          <input
            type="file"
            id="newMedia"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className={validationErrors.media ? 'error' : ''}
          />
          {validationErrors.media && (
            <p className="error-message">{validationErrors.media}</p>
          )}
          
          {/* New Media Preview */}
          {mediaPreview.length > 0 && (
            <div className="media-preview-container">
              {mediaPreview.map((file, index) => (
                <div key={`preview-${index}`} className="media-preview">
                  {file.isVideo ? (
                    <video controls>
                      <source src={file.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img src={file.url} alt={`New upload ${index + 1}`} />
                  )}
                  <p className="file-name">{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Visibility */}
        <div className="form-group">
          <label>Visibility</label>
          <select
            value={isPublic.toString()}
            onChange={(e) => setIsPublic(e.target.value === "true")}
          >
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </div>
        
        {/* Form Buttons */}
        <div className="form-buttons">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostComponent;