import React, { useState } from "react";
import { createPost } from "../Services/PostService";
import { useNavigate } from "react-router-dom";

const CreatePostComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [isVideo, setIsVideo] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [userId] = useState(1);

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
      setIsVideo(isVideoFile);
    }

    setErrors(validationErrors);
    return valid;
  };

  const savePost = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const post = {
      title,
      description,
      mediaFiles,
      isVideo,
      tags,
      isPublic,
      userId,
    };

    console.log("Submitting Post:", post);

    createPost(post).then((response) => {
      console.log("Post created:", response.data);
      navigate('/posts');
    }).catch(error => {
      console.error("Error creating post:", error);
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card">
          <h2 className="text-center mt-3">Create Post</h2>
          <div className="card-body">
            <form onSubmit={savePost}>

              <div className="form-group mb-3">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <small className="text-danger">{errors.title}</small>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {errors.description && <small className="text-danger">{errors.description}</small>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="media">Upload Media (1 video or up to 3 images)</label>
                <input
                  type="file"
                  className="form-control"
                  id="media"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => setMediaFiles(Array.from(e.target.files))}
                />
                {errors.mediaFiles && <small className="text-danger">{errors.mediaFiles}</small>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
                />
              </div>

              <div className="form-group mb-3">
                <label>Visibility</label>
                <select
                  className="form-control"
                  value={isPublic}
                  onChange={(e) => setIsPublic(e.target.value === "true")}
                >
                  <option value="true">Public</option>
                  <option value="false">Private</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Create Post
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostComponent;
