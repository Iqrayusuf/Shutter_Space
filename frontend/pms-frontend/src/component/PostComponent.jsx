import React, { useEffect, useState } from 'react';
import { deletePost, listPosts } from '../Services/PostService';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './PostComponent.css';
import { useNavigate } from 'react-router-dom';

dayjs.extend(relativeTime);

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    listPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }

  function addNewPost() {
    navigator('/add-post');
  }

  function handleUpdatePost(postId) {
    navigator(`/update-post/${postId}`);
  }

  function handleDeletePost(postId) {
    console.log('Deleting post with ID:', postId);
    deletePost(postId)
      .then(() => {
        fetchPosts(); // Refresh after delete
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  }

  return (
    <div className="feed-container">
      <button className='btn btn-primary mb-3' onClick={addNewPost}>Create Post</button>

      {posts.map((post) => (
        <div key={post.postId} className="post-card">
          <div className="post-header">
            <img
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=User${post.userId}`}
              alt="Avatar"
              className="avatar"
            />

            <div>
              <div className="username">User {post.userId}</div>
              <div className="timestamp">{dayjs(post.createdAt).fromNow()}</div>
            </div>
          </div>

          <div className="post-content">
            <h3>{post.title}</h3>
            <p>{post.description}</p>

            <div className="media">
              {post.mediaUrls.map((url, index) =>
                post.isVideo ? (
                  <video key={index} width="100%" height="auto" controls>
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img key={index} src={url} alt="Post Media" />
                )
              )}
            </div>

            <div className="tags mt-2">
              {post.tags.map((tag, i) => (
                <span key={i} className="tag">#{tag}</span>
              ))}
            </div>
          </div>

          <div className="post-actions mt-3">
            <button className="btn btn-outline-secondary me-2">👍 Like</button>
            <button className="btn btn-outline-secondary me-2">💬 Comment</button>
            <button className="btn btn-outline-secondary me-2">↗️ Share</button>
            <button className="btn btn-warning me-2" onClick={() => handleUpdatePost(post.postId)}>✏️ Edit</button>
            <button className="btn btn-danger" onClick={() => handleDeletePost(post.postId)}>🗑️ Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostComponent;
