import React, { useEffect, useState } from 'react';
import { listPosts, deletePost, likePost, commentOnPost } from '../Services/PostService';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';
import './PostComponent.css';
import './BlackModern.css';

dayjs.extend(relativeTime);

// Base URL for the backend
const API_BASE_URL = 'http://localhost:8080';

// Function to get initials from a name
const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

// Function to get color based on name
const getColorForName = (name) => {
  const colors = [
    '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
    '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
    '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', 
    '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser] = useState({
    id: 1, // Assuming current user has ID 1
    name: 'Elviz Dizzouza',
    username: '@elvizoodem'
  });
  const [commentInputs, setCommentInputs] = useState({});
  const [showComments, setShowComments] = useState({});
  
  // Featured users data
  const featuredUsers = [
    { id: 1, name: 'Sinan pk' },
    { id: 2, name: 'Jhon' },
    { id: 3, name: 'Michal' },
    { id: 4, name: 'Fedrick' },
    { id: 5, name: 'David' },
    { id: 6, name: 'Chris' }
  ];

  // Activity data
  const recentActivity = [
    { id: 1, name: 'George Jose', time: '3 min ago' },
    { id: 2, name: 'Michel', time: '3 min ago' },
    { id: 3, name: 'Cristano', time: '3 min ago' },
    { id: 4, name: 'Brahim diaz', time: '3 min ago' },
    { id: 5, name: 'John wick', time: '3 min ago' },
    { id: 6, name: 'Abhilash Jose', time: '3 min ago' }
  ];

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await listPosts();
      console.log('Fetched posts:', response.data);
      setPosts(response.data);
      
      // Initialize comment inputs and show comments state
      const commentState = {};
      const showState = {};
      response.data.forEach(post => {
        commentState[post.postId] = '';
        showState[post.postId] = false;
      });
      setCommentInputs(commentState);
      setShowComments(showState);
      
      setError('');
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to determine if URL is absolute or needs base URL
  const getFullMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${API_BASE_URL}${url}`;
  };

  const handleEdit = (postId) => {
    // Check if postId exists and is valid
    if (!postId) {
      console.error("Cannot edit post: Missing post ID");
      alert("Cannot edit this post: Invalid post ID");
      return;
    }
    
    console.log(`Navigating to edit page for post with ID: ${postId}`);
    
    // Make sure to use the correct route format
    navigate(`/edit-post/${postId}`);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        setPosts(posts.filter(post => post.postId !== postId));
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const addNewPost = () => {
    navigate('/add-post');
  };
  
  // Handle liking a post
  const handleLike = async (post) => {
    try {
      // Check if user already liked this post
      const userLiked = post.likedBy ? post.likedBy.includes(currentUser.id) : false;
      
      // Call backend API to toggle like
      const response = await likePost(post.postId, currentUser.id);
      
      // Update local posts state with new like count
      const updatedPosts = posts.map(p => {
        if (p.postId === post.postId) {
          return {
            ...p,
            likesCount: userLiked ? p.likesCount - 1 : p.likesCount + 1,
            likedBy: userLiked 
              ? (p.likedBy || []).filter(id => id !== currentUser.id)
              : [...(p.likedBy || []), currentUser.id]
          };
        }
        return p;
      });
      
      setPosts(updatedPosts);
    } catch (err) {
      console.error('Error liking post:', err);
      alert('Failed to like post. Please try again.');
    }
  };
  
  // Handle comment input change
  const handleCommentChange = (postId, value) => {
    setCommentInputs({
      ...commentInputs,
      [postId]: value
    });
  };
  
  // Handle submitting a comment
  const handleCommentSubmit = async (postId) => {
    if (!commentInputs[postId].trim()) return;
    
    try {
      // Call backend API to add comment
      const comment = {
        userId: currentUser.id,
        userName: currentUser.name,
        content: commentInputs[postId],
        createdAt: new Date().toISOString()
      };
      
      const response = await commentOnPost(postId, comment);
      
      // Update local posts state with new comment
      const updatedPosts = posts.map(post => {
        if (post.postId === postId) {
          const comments = post.comments || [];
          return {
            ...post,
            comments: [...comments, comment],
            commentsCount: (post.commentsCount || 0) + 1
          };
        }
        return post;
      });
      
      setPosts(updatedPosts);
      
      // Clear comment input
      setCommentInputs({
        ...commentInputs,
        [postId]: ''
      });
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Failed to add comment. Please try again.');
    }
  };
  
  // Toggle comments visibility
  const toggleComments = (postId) => {
    setShowComments({
      ...showComments,
      [postId]: !showComments[postId]
    });
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="btn btn-primary" onClick={fetchPosts}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left sidebar - Profile section */}
        <div className="col-md-3 profile-sidebar">
          <div className="profile-circle">
            <div className="profile-image" style={{ backgroundColor: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
              ED
            </div>
          </div>
          <h2 className="profile-name">Elviz Dizzouza</h2>
          <p className="profile-username">@elvizoodem</p>
          
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-number">1984</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-number">1002</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
          
          <p className="profile-bio">
            ⭐ Hello, I'm a Wildlife Photograper! Open up for promotions⭐
          </p>
          
          <button className="profile-button">My Profile</button>
          
          <div className="skills-section">
            <h3>Skills</h3>
            <ul className="skills-list">
              <li className="skill-item">Wildlife Photographer</li>
              <li className="skill-item">Sony World Photogphy Award Winner</li>
              <li className="skill-item">Professional Photographer</li>
            </ul>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="col-md-6 main-content">
          <div className="header-section">
            <h1 className="main-title">Shutter Space</h1>
            <p className="subtitle">Share your photography journey</p>
          </div>
          
          {/* Featured photographers section */}
          <div className="featured-section">
            <h3 className="section-title">Featured Photographers</h3>
            <div className="photographer-carousel">
              {featuredUsers.map(user => (
                <div key={user.id} className="photographer-item">
                  <div className="photographer-circle" style={{ backgroundColor: getColorForName(user.name) }}>
                    {getInitials(user.name)}
                  </div>
                  <p className="photographer-name">{user.name}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Create post section */}
          <div className="create-post-section" onClick={addNewPost}>
            <div className="post-input">
              <div className="user-avatar">
                ED
              </div>
              <div className="post-text-input">
                Share your photography journey...
              </div>
            </div>
          </div>
          
          {/* Posts feed */}
          <div className="posts-feed">
            {posts.length === 0 ? (
              <div className="no-posts">
                <p>No posts found. Create your first post!</p>
              </div>
            ) : (
              posts.map((post) => {
                // Check if current user has liked this post
                const userLiked = post.likedBy ? post.likedBy.includes(currentUser.id) : false;
                
                return (
                  <div key={post.postId} className="post-card">
                    <div className="post-header">
                      <div className="post-user-avatar" style={{ backgroundColor: getColorForName(`User ${post.userId}`) }}>
                        {getInitials(featuredUsers.find(u => u.id === post.userId)?.name || `User ${post.userId}`)}
                      </div>
                      <div className="post-user-info">
                        <p className="post-user-name">
                          {featuredUsers.find(u => u.id === post.userId)?.name || `User ${post.userId}`}
                          {post.userId === 1 && <span className="verified-icon">✓</span>}
                        </p>
                        <p className="post-time">{post.createdAt ? dayjs(post.createdAt).fromNow() : '17 minutes ago'}</p>
                      </div>
                    </div>
                    
                    <div className="post-content">
                      {/* Post title */}
                      {post.title && (
                        <h3 className="post-title">{post.title}</h3>
                      )}
                      
                      <p className="post-text">{post.description}</p>
                      
                      <div className="post-media">
                        {post.mediaUrls && post.mediaUrls.length > 0 && 
                          post.mediaUrls.map((url, index) => {
                            const fullUrl = getFullMediaUrl(url);
                            return post.video ? (
                              <video key={index} controls className="post-video">
                                <source src={fullUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <img key={index} src={fullUrl} alt={post.title || 'Post image'} className="post-image" />
                            );
                          })
                        }
                      </div>
                      
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="post-tags">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="post-tag">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="post-actions">
                      {/* Like button with counter */}
                      <button 
                        className={`action-button ${userLiked ? 'liked' : ''}`}
                        onClick={() => handleLike(post)}
                      >
                        {userLiked ? '❤️' : '👍'} {post.likesCount || 0}
                      </button>
                      
                      {/* Comment button with counter */}
                      <button 
                        className="action-button"
                        onClick={() => toggleComments(post.postId)}
                      >
                        💬 {post.commentsCount || 0}
                      </button>
                      
                      <button className="action-button">↗️ Share</button>
                      
                      <div className="edit-actions">
                        <button className="edit-button" onClick={() => handleEdit(post.postId)}title={`Edit post ${post.postId || 'unknown'}`}>✏️</button>
                        <button className="delete-button" onClick={() => handleDelete(post.postId)}>🗑️</button>
                      </div>
                    </div>
                    
                    {/* Comments section */}
                    {showComments[post.postId] && (
                      <div className="comments-section">
                        {/* Existing comments */}
                        <div className="comments-list">
                          {post.comments && post.comments.length > 0 ? (
                            post.comments.map((comment, index) => (
                              <div key={index} className="comment">
                                <div className="comment-avatar" style={{ backgroundColor: getColorForName(comment.userName) }}>
                                  {getInitials(comment.userName)}
                                </div>
                                <div className="comment-content">
                                  <div className="comment-header">
                                    <span className="comment-user">{comment.userName}</span>
                                    <span className="comment-time">{dayjs(comment.createdAt).fromNow()}</span>
                                  </div>
                                  <p className="comment-text">{comment.content}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="no-comments">No comments yet. Be the first to comment!</p>
                          )}
                        </div>
                        
                        {/* Add comment form */}
                        <div className="comment-form">
                          <div className="comment-input-container">
                            <div className="comment-avatar" style={{ backgroundColor: getColorForName(currentUser.name) }}>
                              {getInitials(currentUser.name)}
                            </div>
                            <input
                              type="text"
                              className="comment-input"
                              placeholder="Add a comment..."
                              value={commentInputs[post.postId] || ''}
                              onChange={(e) => handleCommentChange(post.postId, e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.postId)}
                            />
                          </div>
                          <button 
                            className="comment-submit"
                            onClick={() => handleCommentSubmit(post.postId)}
                            disabled={!commentInputs[post.postId]?.trim()}
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
        
        {/* Right sidebar - Activity section */}
        <div className="col-md-3 activity-sidebar">
          <div className="activity-container">
            <h3 className="activity-title">Recent Activity</h3>
            <div className="activity-list">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-user">
                    <div className="activity-avatar">
                      <div className="activity-image" style={{ backgroundColor: getColorForName(activity.name) }}>
                        {getInitials(activity.name)}
                      </div>
                      <span className="plus-badge">+</span>
                    </div>
                    <div className="activity-info">
                      <p className="activity-name">{activity.name}</p>
                      <p className="activity-detail">Followed on you • {activity.time}</p>
                    </div>
                  </div>
                  <div className="activity-actions">
                    <button className="follow-button">Follow Back</button>
                    <span className="remove-text">Remove</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;