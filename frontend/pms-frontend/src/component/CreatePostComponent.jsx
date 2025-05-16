import React, { useState } from "react";
import { createPost } from "../Services/PostService";
import { useNavigate } from "react-router-dom";
import './CreatePost.css';

const CreatePostComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId] = useState(1); // This should come from authentication in a real app

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};
    let valid = true;

    if (!title.trim()) {
      validationErrors.title = "Title is required";
      valid = false;
    }

    if (!description.trim()) {
      validationErrors.description = "Description is required";
      valid = false;
    }

    if (mediaFiles.length === 0) {
      validationErrors.mediaFiles = "Please upload at least one media file";
      valid = false;
    } else {
      const isVideoFile = mediaFiles[0]?.type.startsWith("video/");
      if (isVideoFile && mediaFiles.length > 1) {
        validationErrors.mediaFiles = "Only one video file is allowed";
        valid = false;
      }
      if (!isVideoFile && mediaFiles.length > 3) {
        validationErrors.mediaFiles = "You can upload up to 3 images";
        valid = false;
      }
    }

    setErrors(validationErrors);
    return valid;
  };

  const savePost = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      // Prepare post data
      const postData = {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        isPublic,
        userId
        // Note: mediaUrls will be set by the backend
        // isVideo will be determined by the backend based on the files
      };

      console.log("Submitting Post:", postData);
      
      // Send data to the backend
      const response = await createPost(postData, mediaFiles);
      
      console.log("Post created:", response.data);
      navigate('/posts');
    } catch (error) {
      console.error("Error creating post:", error);
      setErrors({
        ...errors,
        submit: "Failed to create post. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card">
          <h2 className="text-center mt-3">Create Post</h2>
          <div className="card-body">
            {errors.submit && (
              <div className="alert alert-danger" role="alert">
                {errors.submit}
              </div>
            )}
            
            <form onSubmit={savePost}>
              <div className="form-group mb-3">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  id="description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="media">Upload Media (1 video or up to 3 images)</label>
                <input
                  type="file"
                  className={`form-control ${errors.mediaFiles ? 'is-invalid' : ''}`}
                  id="media"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => setMediaFiles(Array.from(e.target.files))}
                />
                {errors.mediaFiles && <div className="invalid-feedback">{errors.mediaFiles}</div>}
                {mediaFiles.length > 0 && (
                  <div className="mt-2">
                    <p>Selected files:</p>
                    <ul className="list-group">
                      {Array.from(mediaFiles).map((file, index) => (
                        <li key={index} className="list-group-item">
                          {file.name} ({(file.size / 1024).toFixed(2)} KB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="travel, nature, photography"
                />
              </div>

              <div className="form-group mb-3">
                <label>Visibility</label>
                <select
                  className="form-control"
                  value={isPublic.toString()}
                  onChange={(e) => setIsPublic(e.target.value === "true")}
                >
                  <option value="true">Public</option>
                  <option value="false">Private</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Post...' : 'Create Post'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default CreatePostComponent;