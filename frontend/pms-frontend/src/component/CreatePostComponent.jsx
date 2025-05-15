import React, { useState, useEffect } from "react";
import { createPost, getPostById, updatePost } from "../Services/PostService";
import { useNavigate, useParams } from "react-router-dom";
import './FormComponent.css';

const CreatePostComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [existingMediaUrls, setExistingMediaUrls] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [userId] = useState(1);

  const { postId } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (postId) {
      getPostById(postId)
        .then((response) => {
          const data = response.data;
          setTitle(data.title);
          setDescription(data.description);
          setExistingMediaUrls(data.mediaUrls || []);
          setTags(data.tags || []);
          setTagInput(data.tags?.join(', ') || '');
          setIsVideo(data.isVideo || false);
          setIsPublic(data.isPublic ?? true);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    }
  }, [postId]);

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

    if (!postId && mediaFiles.length === 0) {
      validationErrors.mediaFiles = "Please upload at least one media file";
      valid = false;
    } else if (!postId) {
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

  const saveOrUpdatePost = (e) => {
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

    if (postId) {
      updatePost(postId, post)
        .then((response) => {
          console.log("Post updated:", response.data);
          navigate("/posts");
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
    } else {
      createPost(post)
        .then((response) => {
          console.log("Post created:", response.data);
          navigate("/posts");
        })
        .catch((error) => {
          console.error("Error creating post:", error);
        });
    }
  };

  const pageTitle = () =>
    <h2 className="text-center mt-3">{postId ? "Update Post" : "Create Post"}</h2>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={saveOrUpdatePost}>
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

              {!postId && (
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
              )}

              {postId && existingMediaUrls.length > 0 && (
                <div className="form-group mb-3">
                  <label>Existing Media:</label>
                  <div className="media-preview d-flex gap-2">
                    {existingMediaUrls.map((url, i) =>
                      isVideo ? (
                        <video key={i} src={url} width="200" controls />
                      ) : (
                        <img key={i} src={url} alt="media" width="100" />
                      )
                    )}
                  </div>
                </div>
              )}

              <div className="form-group mb-3">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                    setTags(e.target.value.split(',').map(tag => tag.trim()));
                  }}
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
                {postId ? "Update Post" : "Create Post"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostComponent;
