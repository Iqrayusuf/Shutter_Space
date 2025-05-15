


/*
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, BookOpen, Award, Edit, Trash2 } from 'lucide-react';
import '../styles/SocialMediaDashboard.css';

const SocialMediaDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.user;
  const [user, setUser] = useState(userData);
  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, name: 'George Jose', img: 'https://i.pravatar.cc/150?img=17', time: '3 min ago', followed: false },
    { id: 2, name: 'Michel', img: 'https://i.pravatar.cc/150?img=18', time: '3 min ago', followed: false },
    { id: 3, name: 'Cristano', img: 'https://i.pravatar.cc/150?img=19', time: '3 min ago', followed: false },
    { id: 4, name: 'Brahim Diaz', img: 'https://i.pravatar.cc/150?img=20', time: '3 min ago', followed: false },
    { id: 5, name: 'John Wick', img: 'https://i.pravatar.cc/150?img=21', time: '3 min ago', followed: false },
    { id: 6, name: 'Abhilash Jose', img: 'https://i.pravatar.cc/150?img=22', time: '3 min ago', followed: false }
  ]);

  useEffect(() => {
    if (!user) navigate('/signin');
    
    // Log the user data when component mounts for debugging
    console.log("Dashboard loaded with user data:", user);
  }, [user, navigate]);

  const handleEditProfile = () => {
    if (!user) {
      console.error("Cannot edit: missing user data");
      alert("Cannot edit profile: user information is missing");
      return;
    }
    
    // For debugging: log the current user object to see what data you have
    console.log("Current user data before edit:", user);
    
    // Create a properly structured user object that matches what your backend expects
    const userForEdit = {
      id: user.id, // Make sure this exists!
      fullName: user.name, // Map name to fullName for the backend
      name: user.name, // Keep original for frontend reference
      username: user.username,
      email: user.email || '',
      phone: user.phone || '',
      profilePic: user.profilePic,
      profileImageUrl: user.profilePic, // Add this for backend compatibility
      followers: user.followers || 0,
      following: user.following || 0,
      bio: user.bio || '',
      
      // Transform skills if they're strings to match backend format
      skills: Array.isArray(user.skills) ? user.skills.map(skill => {
        if (typeof skill === 'string') {
          return { name: skill, level: 'Beginner' };
        }
        return skill;
      }) : []
    };
    
    console.log("Navigating to edit profile with:", userForEdit);
    navigate('/edit-profile', { state: { user: userForEdit } });
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      alert('Profile deleted. Redirecting to Sign In.');
      navigate('/signin');
    }
  };

  const toggleFollow = (id) => {
    setRecentActivity(prev =>
      prev.map(user =>
        user.id === id ? { ...user, followed: !user.followed } : user
      )
    );
  };

  const posts = [
    {
      id: 1,
      user: {
        name: user?.name,
        username: user?.username,
        img: user?.profilePic,
        verified: true,
      },
      timeAgo: '1 hour ago',
      content: 'Just joined Shutter Space! Excited to share my photography journey.',
      image: user?.profilePic,
      likes: 5,
      comments: 2,
      shares: 1,
      saved: false,
    },
  ];

  if (!user) {
    return (
      <div className="loading-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff'
      }}>
        <div>Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="sidebar-left">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-header-bg"></div>
            <div className="profile-pic-container">
              <img src={user.profilePic} alt="Profile" className="profile-pic" />
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-username">{user.username}</p>
              <div className="stats-container">
                <div className="stat">
                  <div className="stat-value">{user.followers}</div>
                  <div className="stat-label">Followers</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{user.following}</div>
                  <div className="stat-label">Following</div>
                </div>
              </div>
              <p className="profile-bio">{user.bio}</p>
              <button className="profile-btn" onClick={handleEditProfile}><Edit size={16}/> Edit Profile</button>
              <button className="profile-btn" onClick={handleDeleteProfile} style={{ marginTop: '8px', backgroundColor: '#f44336' }}><Trash2 size={16}/> Delete Account</button>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Skills</h3>
          <div className="skills-container">
            {Array.isArray(user.skills) && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  {typeof skill === 'string' ? skill : skill.name}
                </div>
              ))
            ) : (
              <div className="skill-tag">No skills added yet</div>
            )}
          </div>
        </div>

        <div className="section">
          <div className="feature-buttons">
            <button className="feature-btn learn-btn"><BookOpen size={16}/> Learning new skills</button>
            <button className="feature-btn challenge-btn"><Award size={16}/> Challenges</button>
          </div>
        </div>
      </div>

      <div className="feed">
        <div className="feed-header">
          <h2 className="app-title">Shutter Space</h2>
          <p className="app-tagline">Share your photography journey</p>
        </div>

        <div className="create-post">
          <img src={user.profilePic} alt="Profile" className="post-profile-pic" />
          <input type="text" placeholder="Share your photography journey..." className="post-input" value={postText} onChange={(e) => setPostText(e.target.value)} />
        </div>

        {posts.map(post => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img src={post.user.img} alt={post.user.name} className="post-user-pic" />
              <div className="post-user-info">
                <div className="post-user-meta">
                  <span className="post-user-name">{post.user.name}</span>
                  {post.user.verified && <span className="verified-badge">✓</span>}
                  <span className="post-time">• {post.timeAgo}</span>
                </div>
                <div className="post-username">{post.user.username}</div>
              </div>
            </div>
            <div className="post-content"><p>{post.content}</p></div>
            <div className="post-image-container"><img src={post.image} alt="Post" className="post-image" /></div>
            <div className="post-actions">
              <div className="post-actions-left">
                <button className="action-btn"><Heart size={20} className="action-icon" /></button>
                <button className="action-btn"><MessageCircle size={20} className="action-icon" /></button>
                <button className="action-btn"><Send size={20} className="action-icon" /></button>
              </div>
              <button className="save-btn">Save</button>
            </div>
            <div className="comment-input-container">
              <img src={user.profilePic} alt="Profile" className="comment-profile-pic" />
              <input type="text" placeholder="Write your comment..." className="comment-input" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
              <Send size={18} className="send-icon" />
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-right">
        <h3 className="section-title">Recent Activity</h3>
        <div className="activity-container">
          {recentActivity.map(user => (
            <div key={user.id} className="activity-item">
              <div className="activity-left">
                <div className="activity-pic-wrapper">
                  <img src={user.img} alt={user.name} className="activity-pic" />
                  <div className="notification-badge">+</div>
                </div>
                <div className="activity-info">
                  <div className="activity-name">{user.name}</div>
                  <div className="activity-detail">Followed you • {user.time}</div>
                </div>
              </div>
              <div className="activity-actions">
                <button
                  className="follow-back-btn"
                  onClick={() => toggleFollow(user.id)}
                  style={{ backgroundColor: user.followed ? '#888' : '#3a7bd5' }}
                >
                  {user.followed ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDashboard;
*/



/*
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, BookOpen, Award, Edit, Trash2 } from 'lucide-react';
import '../styles/SocialMediaDashboard.css';

const SocialMediaDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // First check location state, then localStorage as fallback
  const getUserData = () => {
    if (location.state?.user) {
      return location.state.user;
    }
    
    // Try to get from localStorage if not in location state
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse stored user data", e);
      }
    }
    return null;
  };
  
  const userData = getUserData();
  const [user, setUser] = useState(userData);
  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, name: 'George Jose', img: 'https://i.pravatar.cc/150?img=17', time: '3 min ago', followed: false },
    { id: 2, name: 'Michel', img: 'https://i.pravatar.cc/150?img=18', time: '3 min ago', followed: false },
    { id: 3, name: 'Cristano', img: 'https://i.pravatar.cc/150?img=19', time: '3 min ago', followed: false },
    { id: 4, name: 'Brahim Diaz', img: 'https://i.pravatar.cc/150?img=20', time: '3 min ago', followed: false },
    { id: 5, name: 'John Wick', img: 'https://i.pravatar.cc/150?img=21', time: '3 min ago', followed: false },
    { id: 6, name: 'Abhilash Jose', img: 'https://i.pravatar.cc/150?img=22', time: '3 min ago', followed: false }
  ]);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    // Store user in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(user));
    
    // Debug log
    console.log("Dashboard loaded with user data:", user);
    console.log("User ID present:", !!user.id);
  }, [user, navigate]);

  const handleEditProfile = () => {
    if (!user) {
      console.error("Cannot edit: missing user data");
      alert("Cannot edit profile: user information is missing");
      return;
    }
    
    // Debug log
    console.log("Current user data before edit:", user);
    console.log("User ID before edit:", user.id);
    
    // Make a deep copy to avoid reference issues
    const userForEdit = {
      id: user.id, // This is the critical field
      fullName: user.name || user.fullName,
      name: user.name || user.fullName,
      username: user.username,
      email: user.email || '',
      phone: user.phone || '',
      profilePic: user.profilePic || user.profileImageUrl,
      profileImageUrl: user.profilePic || user.profileImageUrl,
      followers: user.followers || 0,
      following: user.following || 0,
      bio: user.bio || '',
      
      // Transform skills if needed
      skills: Array.isArray(user.skills) ? user.skills.map(skill => {
        if (typeof skill === 'string') {
          return { name: skill, level: 'Beginner' };
        } else if (typeof skill === 'object' && skill.name) {
          return skill;
        }
        return { name: String(skill), level: 'Beginner' };
      }) : []
    };
    
    // Show alert if ID is missing
    if (!userForEdit.id) {
      console.error("User ID is missing. Cannot proceed with edit.");
      alert("Cannot edit profile: User ID is missing. Please sign in again.");
      navigate('/signin');
      return;
    }
    
    console.log("Navigating to edit profile with:", userForEdit);
    navigate('/edit-profile', { state: { user: userForEdit } });
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      // Clear localStorage
      localStorage.removeItem('user');
      alert('Profile deleted. Redirecting to Sign In.');
      navigate('/signin');
    }
  };

  const toggleFollow = (id) => {
    setRecentActivity(prev =>
      prev.map(user =>
        user.id === id ? { ...user, followed: !user.followed } : user
      )
    );
  };

  // Add notification handling function
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showNotifications === false) {
      // Reset notification count when opening
      setNotificationCount(0);
    }
  };



  const posts = [
    {
      id: 1,
      user: {
        name: user?.name || user?.fullName,
        username: user?.username,
        img: user?.profilePic || user?.profileImageUrl,
        verified: true,
      },
      timeAgo: '1 hour ago',
      content: 'Just joined Shutter Space! Excited to share my photography journey.',
      image: user?.profilePic || user?.profileImageUrl,
      likes: 5,
      comments: 2,
      shares: 1,
      saved: false,
    },
  ];

  if (!user) {
    return (
      <div className="loading-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff'
      }}>
        <div>Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="sidebar-left">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-header-bg"></div>
            <div className="profile-pic-container">
              <img src={user.profilePic || user.profileImageUrl} alt="Profile" className="profile-pic" />
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{user.name || user.fullName}</h2>
              <p className="profile-username">{user.username}</p>
              <div className="stats-container">
                <div className="stat">
                  <div className="stat-value">{user.followers || 0}</div>
                  <div className="stat-label">Followers</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{user.following || 0}</div>
                  <div className="stat-label">Following</div>
                </div>
              </div>
              <p className="profile-bio">{user.bio || 'No bio provided'}</p>
              <button className="profile-btn" onClick={handleEditProfile}><Edit size={16}/> Edit Profile</button>
              <button className="profile-btn" onClick={handleDeleteProfile} style={{ marginTop: '8px', backgroundColor: '#f44336' }}><Trash2 size={16}/> Delete Account</button>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Skills</h3>
          <div className="skills-container">
            {Array.isArray(user.skills) && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  {typeof skill === 'string' ? skill : (skill.name || String(skill))}
                </div>
              ))
            ) : (
              <div className="skill-tag">No skills added yet</div>
            )}
          </div>
        </div>

        <div className="section">
          <div className="feature-buttons">
            <button className="feature-btn learn-btn"><BookOpen size={16}/> Learning new skills</button>
            <button className="feature-btn challenge-btn"><Award size={16}/> Challenges</button>
          </div>
        </div>
      </div>

      
      <div className="feed">
        <div className="feed-header">
          <h2 className="app-title">Shutter Space</h2>
          <p className="app-tagline">Share your photography journey</p>
        </div>

        <div className="create-post">
          <img src={user.profilePic || user.profileImageUrl} alt="Profile" className="post-profile-pic" />
          <input type="text" placeholder="Share your photography journey..." className="post-input" value={postText} onChange={(e) => setPostText(e.target.value)} />
        </div>

        {posts.map(post => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img src={post.user.img} alt={post.user.name} className="post-user-pic" />
              <div className="post-user-info">
                <div className="post-user-meta">
                  <span className="post-user-name">{post.user.name}</span>
                  {post.user.verified && <span className="verified-badge">✓</span>}
                  <span className="post-time">• {post.timeAgo}</span>
                </div>
                <div className="post-username">{post.user.username}</div>
              </div>
            </div>
            <div className="post-content"><p>{post.content}</p></div>
            <div className="post-image-container"><img src={post.image} alt="Post" className="post-image" /></div>
            <div className="post-actions">
              <div className="post-actions-left">
                <button className="action-btn"><Heart size={20} className="action-icon" /></button>
                <button className="action-btn"><MessageCircle size={20} className="action-icon" /></button>
                <button className="action-btn"><Send size={20} className="action-icon" /></button>
              </div>
              <button className="save-btn">Save</button>
            </div>
            <div className="comment-input-container">
              <img src={user.profilePic || user.profileImageUrl} alt="Profile" className="comment-profile-pic" />
              <input type="text" placeholder="Write your comment..." className="comment-input" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
              <Send size={18} className="send-icon" />
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-right">
        <h3 className="section-title">Recent Activity</h3>
        <div className="activity-container">
          {recentActivity.map(user => (
            <div key={user.id} className="activity-item">
              <div className="activity-left">
                <div className="activity-pic-wrapper">
                  <img src={user.img} alt={user.name} className="activity-pic" />
                  <div className="notification-badge">+</div>
                </div>
                <div className="activity-info">
                  <div className="activity-name">{user.name}</div>
                  <div className="activity-detail">Followed you • {user.time}</div>
                </div>
              </div>
              <div className="activity-actions">
                <button
                  className="follow-back-btn"
                  onClick={() => toggleFollow(user.id)}
                  style={{ backgroundColor: user.followed ? '#888' : '#3a7bd5' }}
                >
                  {user.followed ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDashboard;

*/

/*

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, BookOpen, Award, Edit, Trash2, Bell, X } from 'lucide-react';
import '../styles/SocialMediaDashboard.css';

const SocialMediaDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // First check location state, then localStorage as fallback
  const getUserData = () => {
    if (location.state?.user) {
      return location.state.user;
    }
    
    // Try to get from localStorage if not in location state
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse stored user data", e);
      }
    }
    return null;
  };
  
  const userData = getUserData();
  const [user, setUser] = useState(userData);
  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, name: 'George Jose', img: 'https://i.pravatar.cc/150?img=17', time: '3 min ago', followed: false },
    { id: 2, name: 'Michel', img: 'https://i.pravatar.cc/150?img=18', time: '3 min ago', followed: false },
    { id: 3, name: 'Cristano', img: 'https://i.pravatar.cc/150?img=19', time: '3 min ago', followed: false },
    { id: 4, name: 'Brahim Diaz', img: 'https://i.pravatar.cc/150?img=20', time: '3 min ago', followed: false },
    { id: 5, name: 'John Wick', img: 'https://i.pravatar.cc/150?img=21', time: '3 min ago', followed: false },
    { id: 6, name: 'Abhilash Jose', img: 'https://i.pravatar.cc/150?img=22', time: '3 min ago', followed: false }
  ]);

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    { id: 1, user: 'George Jose', img: 'https://i.pravatar.cc/150?img=17', action: 'liked your photo', time: '2 min ago' },
    { id: 2, user: 'Michel', img: 'https://i.pravatar.cc/150?img=18', action: 'commented on your post', time: '5 min ago' },
    { id: 3, user: 'Cristano', img: 'https://i.pravatar.cc/150?img=19', action: 'started following you', time: '10 min ago' }
  ]);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    // Store user in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(user));
    
    // Debug log
    console.log("Dashboard loaded with user data:", user);
    console.log("User ID present:", !!user.id);
  }, [user, navigate]);

  const handleEditProfile = () => {
    if (!user) {
      console.error("Cannot edit: missing user data");
      alert("Cannot edit profile: user information is missing");
      return;
    }
    
    // Debug log
    console.log("Current user data before edit:", user);
    console.log("User ID before edit:", user.id);
    
    // Make a deep copy to avoid reference issues
    const userForEdit = {
      id: user.id, // This is the critical field
      fullName: user.name || user.fullName,
      name: user.name || user.fullName,
      username: user.username,
      email: user.email || '',
      phone: user.phone || '',
      profilePic: user.profilePic || user.profileImageUrl,
      profileImageUrl: user.profilePic || user.profileImageUrl,
      followers: user.followers || 0,
      following: user.following || 0,
      bio: user.bio || '',
      
      // Transform skills if needed
      skills: Array.isArray(user.skills) ? user.skills.map(skill => {
        if (typeof skill === 'string') {
          return { name: skill, level: 'Beginner' };
        } else if (typeof skill === 'object' && skill.name) {
          return skill;
        }
        return { name: String(skill), level: 'Beginner' };
      }) : []
    };
    
    // Show alert if ID is missing
    if (!userForEdit.id) {
      console.error("User ID is missing. Cannot proceed with edit.");
      alert("Cannot edit profile: User ID is missing. Please sign in again.");
      navigate('/signin');
      return;
    }
    
    console.log("Navigating to edit profile with:", userForEdit);
    navigate('/edit-profile', { state: { user: userForEdit } });
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      // Clear localStorage
      localStorage.removeItem('user');
      alert('Profile deleted. Redirecting to Sign In.');
      navigate('/signin');
    }
  };

  const toggleFollow = (id) => {
    setRecentActivity(prev =>
      prev.map(user =>
        user.id === id ? { ...user, followed: !user.followed } : user
      )
    );
  };

  // Add notification handling function
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showNotifications === false) {
      // Reset notification count when opening
      setNotificationCount(0);
    }
  };

  const posts = [
    {
      id: 1,
      user: {
        name: user?.name || user?.fullName,
        username: user?.username,
        img: user?.profilePic || user?.profileImageUrl,
        verified: true,
      },
      timeAgo: '1 hour ago',
      content: 'Just joined Shutter Space! Excited to share my photography journey.',
      image: user?.profilePic || user?.profileImageUrl,
      likes: 5,
      comments: 2,
      shares: 1,
      saved: false,
    },
  ];

  if (!user) {
    return (
      <div className="loading-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff'
      }}>
        <div>Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="sidebar-left">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-header-bg"></div>
            <div className="profile-pic-container">
              <img src={user.profilePic || user.profileImageUrl} alt="Profile" className="profile-pic" />
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{user.name || user.fullName}</h2>
              <p className="profile-username">{user.username}</p>
              <div className="stats-container">
                <div className="stat">
                  <div className="stat-value">{user.followers || 0}</div>
                  <div className="stat-label">Followers</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{user.following || 0}</div>
                  <div className="stat-label">Following</div>
                </div>
              </div>
              <p className="profile-bio">{user.bio || 'No bio provided'}</p>
              <button className="profile-btn" onClick={handleEditProfile}><Edit size={16}/> Edit Profile</button>
              <button className="profile-btn" onClick={handleDeleteProfile} style={{ marginTop: '8px', backgroundColor: '#f44336' }}><Trash2 size={16}/> Delete Account</button>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Skills</h3>
          <div className="skills-container">
            {Array.isArray(user.skills) && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  {typeof skill === 'string' ? skill : (skill.name || String(skill))}
                </div>
              ))
            ) : (
              <div className="skill-tag">No skills added yet</div>
            )}
          </div>
        </div>

        <div className="section">
          <div className="feature-buttons">
            <button className="feature-btn learn-btn"><BookOpen size={16}/> Learning new skills</button>
            <button className="feature-btn challenge-btn"><Award size={16}/> Challenges</button>
          </div>
        </div>
      </div>

      <div className="feed">
        <div className="feed-header">
          <div className="app-header">
            <h2 className="app-title">Shutter Space</h2>
            <div className="header-controls">
              <button className="notification-btn" onClick={toggleNotifications}>
                <Bell size={24} />
                {notificationCount > 0 && (
                  <span className="notification-count">{notificationCount}</span>
                )}
              </button>
            </div>
          </div>
          <p className="app-tagline">Share your photography journey</p>
          
          
          {showNotifications && (
            <div className="notifications-panel">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <button onClick={() => setShowNotifications(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="notifications-list">
                {notifications.map(notif => (
                  <div key={notif.id} className="notification-item">
                    <img src={notif.img} alt={notif.user} className="notification-user-pic" />
                    <div className="notification-content">
                      <p><strong>{notif.user}</strong> {notif.action}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="create-post">
          <img src={user.profilePic || user.profileImageUrl} alt="Profile" className="post-profile-pic" />
          <input type="text" placeholder="Share your photography journey..." className="post-input" value={postText} onChange={(e) => setPostText(e.target.value)} />
        </div>

        {posts.map(post => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img src={post.user.img} alt={post.user.name} className="post-user-pic" />
              <div className="post-user-info">
                <div className="post-user-meta">
                  <span className="post-user-name">{post.user.name}</span>
                  {post.user.verified && <span className="verified-badge">✓</span>}
                  <span className="post-time">• {post.timeAgo}</span>
                </div>
                <div className="post-username">{post.user.username}</div>
              </div>
            </div>
            <div className="post-content"><p>{post.content}</p></div>
            <div className="post-image-container"><img src={post.image} alt="Post" className="post-image" /></div>
            <div className="post-actions">
              <div className="post-actions-left">
                <button className="action-btn"><Heart size={20} className="action-icon" /></button>
                <button className="action-btn"><MessageCircle size={20} className="action-icon" /></button>
                <button className="action-btn"><Send size={20} className="action-icon" /></button>
              </div>
              <button className="save-btn">Save</button>
            </div>
            <div className="comment-input-container">
              <img src={user.profilePic || user.profileImageUrl} alt="Profile" className="comment-profile-pic" />
              <input type="text" placeholder="Write your comment..." className="comment-input" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
              <Send size={18} className="send-icon" />
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-right">
        <h3 className="section-title">Recent Activity</h3>
        <div className="activity-container">
          {recentActivity.map(user => (
            <div key={user.id} className="activity-item">
              <div className="activity-left">
                <div className="activity-pic-wrapper">
                  <img src={user.img} alt={user.name} className="activity-pic" />
                  <div className="notification-badge">+</div>
                </div>
                <div className="activity-info">
                  <div className="activity-name">{user.name}</div>
                  <div className="activity-detail">Followed you • {user.time}</div>
                </div>
              </div>
              <div className="activity-actions">
                <button
                  className="follow-back-btn"
                  onClick={() => toggleFollow(user.id)}
                  style={{ backgroundColor: user.followed ? '#888' : '#3a7bd5' }}
                >
                  {user.followed ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDashboard;
*/


/*
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, BookOpen, Award, Edit, Trash2, Bell, X } from 'lucide-react';
import '../styles/SocialMediaDashboard.css';

const SocialMediaDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // First check location state, then localStorage as fallback
  const getUserData = () => {
    if (location.state?.user) {
      return location.state.user;
    }
    
    // Try to get from localStorage if not in location state
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse stored user data", e);
      }
    }
    return null;
  };
  
  const userData = getUserData();
  const [user, setUser] = useState(userData);
  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  // Add timestamp for cache busting
  const [timestamp, setTimestamp] = useState(new Date().getTime());
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, name: 'George Jose', img: 'https://i.pravatar.cc/150?img=17', time: '3 min ago', followed: false },
    { id: 2, name: 'Michel', img: 'https://i.pravatar.cc/150?img=18', time: '3 min ago', followed: false },
    { id: 3, name: 'Cristano', img: 'https://i.pravatar.cc/150?img=19', time: '3 min ago', followed: false },
    { id: 4, name: 'Brahim Diaz', img: 'https://i.pravatar.cc/150?img=20', time: '3 min ago', followed: false },
    { id: 5, name: 'John Wick', img: 'https://i.pravatar.cc/150?img=21', time: '3 min ago', followed: false },
    { id: 6, name: 'Abhilash Jose', img: 'https://i.pravatar.cc/150?img=22', time: '3 min ago', followed: false }
  ]);

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    { id: 1, user: 'George Jose', img: 'https://i.pravatar.cc/150?img=17', action: 'liked your photo', time: '2 min ago' },
    { id: 2, user: 'Michel', img: 'https://i.pravatar.cc/150?img=18', action: 'commented on your post', time: '5 min ago' },
    { id: 3, user: 'Cristano', img: 'https://i.pravatar.cc/150?img=19', action: 'started following you', time: '10 min ago' }
  ]);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    // Store user in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(user));
    
    // Debug log
    console.log("Dashboard loaded with user data:", user);
    console.log("User ID present:", !!user.id);
    console.log("Profile image URL:", user.profilePic || user.profileImageUrl);
    
    // Create a new timestamp for cache busting
    setTimestamp(new Date().getTime());
    
    // Preload profile image to force refresh
    if (user.profilePic || user.profileImageUrl) {
      const img = new Image();
      img.src = `${user.profilePic || user.profileImageUrl}?t=${timestamp}`;
    }
  }, [user, navigate]);

  const handleEditProfile = () => {
    if (!user) {
      console.error("Cannot edit: missing user data");
      alert("Cannot edit profile: user information is missing");
      return;
    }
    
    // Debug log
    console.log("Current user data before edit:", user);
    console.log("User ID before edit:", user.id);
    
    // Make a deep copy to avoid reference issues
    const userForEdit = {
      id: user.id, // This is the critical field
      fullName: user.name || user.fullName,
      name: user.name || user.fullName,
      username: user.username,
      email: user.email || '',
      phone: user.phone || '',
      profilePic: user.profilePic || user.profileImageUrl,
      profileImageUrl: user.profilePic || user.profileImageUrl,
      followers: user.followers || 0,
      following: user.following || 0,
      bio: user.bio || '',
      
      // Transform skills if needed
      skills: Array.isArray(user.skills) ? user.skills.map(skill => {
        if (typeof skill === 'string') {
          return { name: skill, level: 'Beginner' };
        } else if (typeof skill === 'object' && skill.name) {
          return skill;
        }
        return { name: String(skill), level: 'Beginner' };
      }) : []
    };
    
    // Show alert if ID is missing
    if (!userForEdit.id) {
      console.error("User ID is missing. Cannot proceed with edit.");
      alert("Cannot edit profile: User ID is missing. Please sign in again.");
      navigate('/signin');
      return;
    }
    
    console.log("Navigating to edit profile with:", userForEdit);
    navigate('/edit-profile', { state: { user: userForEdit } });
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      // Clear localStorage
      localStorage.removeItem('user');
      alert('Profile deleted. Redirecting to Sign In.');
      navigate('/signin');
    }
  };

  const toggleFollow = (id) => {
    setRecentActivity(prev =>
      prev.map(user =>
        user.id === id ? { ...user, followed: !user.followed } : user
      )
    );
  };

  // Add notification handling function
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showNotifications === false) {
      // Reset notification count when opening
      setNotificationCount(0);
    }
  };

  // Function to get profile image URL with cache busting
  const getProfileImageUrl = () => {
    const baseUrl = user.profilePic || user.profileImageUrl;
    if (!baseUrl) return `https://i.pravatar.cc/150?u=${user.username || 'default'}`;
    return `${baseUrl}?t=${timestamp}`;
  };

  const posts = [
    {
      id: 1,
      user: {
        name: user?.name || user?.fullName,
        username: user?.username,
        img: getProfileImageUrl(),
        verified: true,
      },
      timeAgo: '1 hour ago',
      content: 'Just joined Shutter Space! Excited to share my photography journey.',
      image: getProfileImageUrl(),
      likes: 5,
      comments: 2,
      shares: 1,
      saved: false,
    },
  ];

  if (!user) {
    return (
      <div className="loading-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff'
      }}>
        <div>Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="sidebar-left">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-header-bg"></div>
            <div className="profile-pic-container">
              <img 
                src={getProfileImageUrl()} 
                alt="Profile" 
                className="profile-pic"
                onError={(e) => {
                  console.error("Failed to load profile image:", e.target.src);
                  e.target.src = `https://i.pravatar.cc/150?u=${user.username || 'default'}`;
                }}
              />
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{user.name || user.fullName}</h2>
              <p className="profile-username">{user.username}</p>
              <div className="stats-container">
                <div className="stat">
                  <div className="stat-value">{user.followers || 0}</div>
                  <div className="stat-label">Followers</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{user.following || 0}</div>
                  <div className="stat-label">Following</div>
                </div>
              </div>
              <p className="profile-bio">{user.bio || 'No bio provided'}</p>
              <button className="profile-btn" onClick={handleEditProfile}><Edit size={16}/> Edit Profile</button>
              <button className="profile-btn" onClick={handleDeleteProfile} style={{ marginTop: '8px', backgroundColor: '#f44336' }}><Trash2 size={16}/> Delete Account</button>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Skills</h3>
          <div className="skills-container">
            {Array.isArray(user.skills) && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  {typeof skill === 'string' ? skill : (skill.name || String(skill))}
                </div>
              ))
            ) : (
              <div className="skill-tag">No skills added yet</div>
            )}
          </div>
        </div>

        <div className="section">
          <div className="feature-buttons">
            <button className="feature-btn learn-btn"><BookOpen size={16}/> Learning new skills</button>
            <button className="feature-btn challenge-btn"><Award size={16}/> Challenges</button>
          </div>
        </div>
      </div>

      <div className="feed">
        <div className="feed-header">
          <div className="app-header">
            <h2 className="app-title">Shutter Space</h2>
            <div className="header-controls">
              <button className="notification-btn" onClick={toggleNotifications}>
                <Bell size={24} />
                {notificationCount > 0 && (
                  <span className="notification-count">{notificationCount}</span>
                )}
              </button>
            </div>
          </div>
          <p className="app-tagline">Share your photography journey</p>
          
        
          {showNotifications && (
            <div className="notifications-panel">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <button onClick={() => setShowNotifications(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="notifications-list">
                {notifications.map(notif => (
                  <div key={notif.id} className="notification-item">
                    <img src={notif.img} alt={notif.user} className="notification-user-pic" />
                    <div className="notification-content">
                      <p><strong>{notif.user}</strong> {notif.action}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="create-post">
          <img 
            src={getProfileImageUrl()} 
            alt="Profile" 
            className="post-profile-pic"
            onError={(e) => {
              console.error("Failed to load profile image in post creator:", e.target.src);
              e.target.src = `https://i.pravatar.cc/150?u=${user.username || 'default'}`;
            }}
          />
          <input 
            type="text" 
            placeholder="Share your photography journey..." 
            className="post-input" 
            value={postText} 
            onChange={(e) => setPostText(e.target.value)} 
          />
        </div>

        {posts.map(post => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img 
                src={post.user.img}
                alt={post.user.name} 
                className="post-user-pic" 
                onError={(e) => {
                  console.error("Failed to load post user image:", e.target.src);
                  e.target.src = `https://i.pravatar.cc/150?u=${post.user.username || 'default'}`;
                }}
              />
              <div className="post-user-info">
                <div className="post-user-meta">
                  <span className="post-user-name">{post.user.name}</span>
                  {post.user.verified && <span className="verified-badge">✓</span>}
                  <span className="post-time">• {post.timeAgo}</span>
                </div>
                <div className="post-username">{post.user.username}</div>
              </div>
            </div>
            <div className="post-content"><p>{post.content}</p></div>
            <div className="post-image-container">
              <img 
                src={post.image} 
                alt="Post" 
                className="post-image"
                onError={(e) => {
                  console.error("Failed to load post image:", e.target.src);
                  e.target.src = `https://i.pravatar.cc/800?u=${post.user.username || 'default'}`;
                }}
              />
            </div>
            <div className="post-actions">
              <div className="post-actions-left">
                <button className="action-btn"><Heart size={20} className="action-icon" /></button>
                <button className="action-btn"><MessageCircle size={20} className="action-icon" /></button>
                <button className="action-btn"><Send size={20} className="action-icon" /></button>
              </div>
              <button className="save-btn">Save</button>
            </div>
            <div className="comment-input-container">
              <img 
                src={getProfileImageUrl()} 
                alt="Profile" 
                className="comment-profile-pic"
                onError={(e) => {
                  console.error("Failed to load profile image in comment section:", e.target.src);
                  e.target.src = `https://i.pravatar.cc/150?u=${user.username || 'default'}`;
                }}
              />
              <input 
                type="text" 
                placeholder="Write your comment..." 
                className="comment-input" 
                value={commentText} 
                onChange={(e) => setCommentText(e.target.value)} 
              />
              <Send size={18} className="send-icon" />
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-right">
        <h3 className="section-title">Recent Activity</h3>
        <div className="activity-container">
          {recentActivity.map(user => (
            <div key={user.id} className="activity-item">
              <div className="activity-left">
                <div className="activity-pic-wrapper">
                  <img 
                    src={user.img} 
                    alt={user.name} 
                    className="activity-pic"
                    onError={(e) => {
                      console.error("Failed to load activity user image:", e.target.src);
                      e.target.src = `https://i.pravatar.cc/150?u=${user.name.replace(/\s+/g, '')}`;
                    }}
                  />
                  <div className="notification-badge">+</div>
                </div>
                <div className="activity-info">
                  <div className="activity-name">{user.name}</div>
                  <div className="activity-detail">Followed you • {user.time}</div>
                </div>
              </div>
              <div className="activity-actions">
                <button
                  className="follow-back-btn"
                  onClick={() => toggleFollow(user.id)}
                  style={{ backgroundColor: user.followed ? '#888' : '#3a7bd5' }}
                >
                  {user.followed ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDashboard;
*/

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, BookOpen, Award, Edit, Trash2, Bell, X } from 'lucide-react';
import '../styles/SocialMediaDashboard.css';

const SocialMediaDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Add forceUpdate function for hard refresh
  const [, forceUpdate] = useState();
  
  // First check location state, then localStorage as fallback
  const getUserData = () => {
    if (location.state?.user) {
      // Store in localStorage when coming from another page
      localStorage.setItem('user', JSON.stringify(location.state.user));
      return location.state.user;
    }
    
    // Try to get from localStorage if not in location state
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse stored user data", e);
      }
    }
    return null;
  };
  
  const userData = getUserData();
  const [user, setUser] = useState(userData);
  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  
  // Use unique timestamp for force refresh
  const [timestamp, setTimestamp] = useState(Date.now());
  
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, name: 'George Jose', img: 'https://i.pravatar.cc/150?img=17', time: '3 min ago', followed: false },
    { id: 2, name: 'Michel', img: 'https://i.pravatar.cc/150?img=18', time: '3 min ago', followed: false },
    { id: 3, name: 'Cristano', img: 'https://i.pravatar.cc/150?img=19', time: '3 min ago', followed: false },
    { id: 4, name: 'Brahim Diaz', img: 'https://i.pravatar.cc/150?img=20', time: '3 min ago', followed: false },
    { id: 5, name: 'John Wick', img: 'https://i.pravatar.cc/150?img=21', time: '3 min ago', followed: false },
    { id: 6, name: 'Abhilash Jose', img: 'https://i.pravatar.cc/150?img=22', time: '3 min ago', followed: false }
  ]);

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    { id: 1, user: 'George Jose', img: 'https://i.pravatar.cc/150?img=17', action: 'liked your photo', time: '2 min ago' },
    { id: 2, user: 'Michel', img: 'https://i.pravatar.cc/150?img=18', action: 'commented on your post', time: '5 min ago' },
    { id: 3, user: 'Cristano', img: 'https://i.pravatar.cc/150?img=19', action: 'started following you', time: '10 min ago' }
  ]);

  // Function to get profile image URL with forced cache busting
  const getProfileImageUrl = () => {
    let baseUrl = user.profilePic || user.profileImageUrl;
    if (!baseUrl) return `https://i.pravatar.cc/150?u=${user.username || 'default'}&t=${timestamp}`;
    
    // Check if the URL is a relative path (starts with /)
    if (baseUrl.startsWith('/')) {
      // The URL is already correct format for the proxy
      baseUrl = baseUrl;
    } else if (!baseUrl.startsWith('http')) {
      // If it doesn't start with http and isn't a relative path, assume it's relative
      baseUrl = '/' + baseUrl;
    }
    
    // Remove any existing query parameters
    baseUrl = baseUrl.split('?')[0];
    
    // Add timestamp for cache busting
    return `${baseUrl}?t=${timestamp}`;
  };
  
  // Force reload image
  const reloadProfileImage = () => {
    console.log("Forcing image reload");
    setTimestamp(Date.now());
    forceUpdate({});
  };

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    // Generate a new timestamp for cache busting
    setTimestamp(Date.now());
    
    // Debug log
    console.log("Dashboard loaded with user data:", user);
    console.log("User ID present:", !!user.id);
    console.log("Profile image URL:", user.profilePic || user.profileImageUrl);
    console.log("Using timestamp for cache busting:", timestamp);
    
    // Force a reload of image after a delay
    const timer = setTimeout(() => {
      reloadProfileImage();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [user, navigate]);

  const handleEditProfile = () => {
    if (!user) {
      console.error("Cannot edit: missing user data");
      alert("Cannot edit profile: user information is missing");
      return;
    }
    
    // Debug log
    console.log("Current user data before edit:", user);
    console.log("User ID before edit:", user.id);
    
    // Make a deep copy to avoid reference issues
    const userForEdit = {
      id: user.id, // This is the critical field
      fullName: user.name || user.fullName,
      name: user.name || user.fullName,
      username: user.username,
      email: user.email || '',
      phone: user.phone || '',
      profilePic: user.profilePic || user.profileImageUrl,
      profileImageUrl: user.profilePic || user.profileImageUrl,
      followers: user.followers || 0,
      following: user.following || 0,
      bio: user.bio || '',
      
      // Transform skills if needed
      skills: Array.isArray(user.skills) ? user.skills.map(skill => {
        if (typeof skill === 'string') {
          return { name: skill, level: 'Beginner' };
        } else if (typeof skill === 'object' && skill.name) {
          return skill;
        }
        return { name: String(skill), level: 'Beginner' };
      }) : []
    };
    
    // Show alert if ID is missing
    if (!userForEdit.id) {
      console.error("User ID is missing. Cannot proceed with edit.");
      alert("Cannot edit profile: User ID is missing. Please sign in again.");
      navigate('/signin');
      return;
    }
    
    console.log("Navigating to edit profile with:", userForEdit);
    navigate('/edit-profile', { state: { user: userForEdit } });
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      // Clear localStorage
      localStorage.removeItem('user');
      alert('Profile deleted. Redirecting to Sign In.');
      navigate('/signin');
    }
  };

  const toggleFollow = (id) => {
    setRecentActivity(prev =>
      prev.map(user =>
        user.id === id ? { ...user, followed: !user.followed } : user
      )
    );
  };

  // Notification handling function
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showNotifications === false) {
      // Reset notification count when opening
      setNotificationCount(0);
    }
  };

  const posts = [
    {
      id: 1,
      user: {
        name: user?.name || user?.fullName,
        username: user?.username,
        img: getProfileImageUrl(),
        verified: true,
      },
      timeAgo: '1 hour ago',
      content: 'Just joined Shutter Space! Excited to share my photography journey.',
      image: getProfileImageUrl(),
      likes: 5,
      comments: 2,
      shares: 1,
      saved: false,
    },
  ];

  if (!user) {
    return (
      <div className="loading-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff'
      }}>
        <div>Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="sidebar-left">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-header-bg"></div>
            <div className="profile-pic-container">
              <img 
                key={timestamp}
                src={getProfileImageUrl()} 
                alt="Profile" 
                className="profile-pic"
                onError={(e) => {
                  console.error("Failed to load profile image:", e.target.src);
                  e.target.src = `https://i.pravatar.cc/150?u=${user.username || 'default'}&t=${timestamp}`;
                }}
                onClick={reloadProfileImage}
              />
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{user.name || user.fullName}</h2>
              <p className="profile-username">{user.username}</p>
              <div className="stats-container">
                <div className="stat">
                  <div className="stat-value">{user.followers || 0}</div>
                  <div className="stat-label">Followers</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{user.following || 0}</div>
                  <div className="stat-label">Following</div>
                </div>
              </div>
              <p className="profile-bio">{user.bio || 'No bio provided'}</p>
              <button className="profile-btn" onClick={handleEditProfile}><Edit size={16}/> Edit Profile</button>
              <button 
                className="profile-btn" 
                onClick={handleDeleteProfile} 
                style={{ marginTop: '8px', backgroundColor: '#f44336' }}
              >
                <Trash2 size={16}/> Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Skills</h3>
          <div className="skills-container">
            {Array.isArray(user.skills) && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  {typeof skill === 'string' ? skill : (skill.name || String(skill))}
                </div>
              ))
            ) : (
              <div className="skill-tag">No skills added yet</div>
            )}
          </div>
        </div>

        <div className="section">
          <div className="feature-buttons">
            <button className="feature-btn learn-btn"><BookOpen size={16}/> Learning new skills</button>
            <button className="feature-btn challenge-btn"><Award size={16}/> Challenges</button>
          </div>
        </div>
      </div>

      <div className="feed">
        <div className="feed-header">
          <div className="app-header">
            <h2 className="app-title">Shutter Space</h2>
            <div className="header-controls">
              <button className="notification-btn" onClick={toggleNotifications}>
                <Bell size={24} />
                {notificationCount > 0 && (
                  <span className="notification-count">{notificationCount}</span>
                )}
              </button>
            </div>
          </div>
          <p className="app-tagline">Share your photography journey</p>
          
          {/* Notifications Panel */}
          {showNotifications && (
            <div className="notifications-panel">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <button onClick={() => setShowNotifications(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="notifications-list">
                {notifications.map(notif => (
                  <div key={notif.id} className="notification-item">
                    <img src={notif.img} alt={notif.user} className="notification-user-pic" />
                    <div className="notification-content">
                      <p><strong>{notif.user}</strong> {notif.action}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="create-post">
          <img 
            key={`post-profile-${timestamp}`}
            src={getProfileImageUrl()} 
            alt="Profile" 
            className="post-profile-pic"
            onError={(e) => {
              console.error("Failed to load profile image in post creator:", e.target.src);
              e.target.src = `https://i.pravatar.cc/150?u=${user.username || 'default'}&t=${timestamp}`;
            }}
          />
          <input 
            type="text" 
            placeholder="Share your photography journey..." 
            className="post-input" 
            value={postText} 
            onChange={(e) => setPostText(e.target.value)} 
          />
        </div>

        {posts.map(post => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img 
                key={`post-user-${timestamp}`}
                src={post.user.img}
                alt={post.user.name} 
                className="post-user-pic" 
                onError={(e) => {
                  console.error("Failed to load post user image:", e.target.src);
                  e.target.src = `https://i.pravatar.cc/150?u=${post.user.username || 'default'}&t=${timestamp}`;
                }}
              />
              <div className="post-user-info">
                <div className="post-user-meta">
                  <span className="post-user-name">{post.user.name}</span>
                  {post.user.verified && <span className="verified-badge">✓</span>}
                  <span className="post-time">• {post.timeAgo}</span>
                </div>
                <div className="post-username">{post.user.username}</div>
              </div>
            </div>
            <div className="post-content"><p>{post.content}</p></div>
            <div className="post-image-container">
              <img 
                key={`post-img-${timestamp}`}
                src={post.image} 
                alt="Post" 
                className="post-image"
                onError={(e) => {
                  console.error("Failed to load post image:", e.target.src);
                  e.target.src = `https://i.pravatar.cc/800?u=${post.user.username || 'default'}&t=${timestamp}`;
                }}
              />
            </div>
            <div className="post-actions">
              <div className="post-actions-left">
                <button className="action-btn"><Heart size={20} className="action-icon" /></button>
                <button className="action-btn"><MessageCircle size={20} className="action-icon" /></button>
                <button className="action-btn"><Send size={20} className="action-icon" /></button>
              </div>
              <button className="save-btn">Save</button>
            </div>
            <div className="comment-input-container">
              <img 
                key={`comment-profile-${timestamp}`}
                src={getProfileImageUrl()} 
                alt="Profile" 
                className="comment-profile-pic"
                onError={(e) => {
                  console.error("Failed to load profile image in comment section:", e.target.src);
                  e.target.src = `https://i.pravatar.cc/150?u=${user.username || 'default'}&t=${timestamp}`;
                }}
              />
              <input 
                type="text" 
                placeholder="Write your comment..." 
                className="comment-input" 
                value={commentText} 
                onChange={(e) => setCommentText(e.target.value)} 
              />
              <Send size={18} className="send-icon" />
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-right">
        <h3 className="section-title">Recent Activity</h3>
        <div className="activity-container">
          {recentActivity.map(user => (
            <div key={user.id} className="activity-item">
              <div className="activity-left">
                <div className="activity-pic-wrapper">
                  <img 
                    src={user.img} 
                    alt={user.name} 
                    className="activity-pic"
                    onError={(e) => {
                      console.error("Failed to load activity user image:", e.target.src);
                      e.target.src = `https://i.pravatar.cc/150?u=${user.name.replace(/\s+/g, '')}&t=${timestamp}`;
                    }}
                  />
                  <div className="notification-badge">+</div>
                </div>
                <div className="activity-info">
                  <div className="activity-name">{user.name}</div>
                  <div className="activity-detail">Followed you • {user.time}</div>
                </div>
              </div>
              <div className="activity-actions">
                <button
                  className="follow-back-btn"
                  onClick={() => toggleFollow(user.id)}
                  style={{ backgroundColor: user.followed ? '#888' : '#3a7bd5' }}
                >
                  {user.followed ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDashboard;