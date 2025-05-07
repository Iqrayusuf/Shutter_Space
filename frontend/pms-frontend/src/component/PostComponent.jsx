import React, { useEffect, useState } from 'react';
import { listPosts } from '../Services/PostService';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './PostComponent.css';
import { useNavigate } from 'react-router-dom';

dayjs.extend(relativeTime);

const PostComponent = () => {
  const [posts, setPosts] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    listPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  function addNewPost() {
    navigator('/add-posts/new');
  }

  return (
    <div className="feed-container">
      <button className='btn btn-primary' onClick={addNewPost}>Create Post</button>
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

            <div className="tags">
              {post.tags.map((tag, i) => (
                <span key={i} className="tag">#{tag}</span>
              ))}
            </div>
          </div>

          <div className="post-actions">
            <button>👍 Like</button>
            <button>💬 Comment</button>
            <button>↗️ Share</button>
            <button className="btn btn-sm btn-warning" onClick={() => handleEdit(post.postId)}>✏️ Edit</button>
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(post.postId)}>🗑️ Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostComponent;
