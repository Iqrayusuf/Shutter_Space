/*import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../api/userApi';
import '../styles/SignupComponent.css'; // Reuse same styles


const EditProfileComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: user?.password || '',
    skills: user?.skills || []
  });






const EditProfileComponent = ({ user, onUpdate }) => {
    const [formData, setFormData] = useState({
        fullName: user.fullName || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        password: user.password || '',
        skills: user.skills || []
    });

    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("user", new Blob([JSON.stringify(formData)], { type: "application/json" }));
        if (profileImage) form.append("profileImage", profileImage);

        try {
            const res = await updateUser(user.id, form);
            alert("Profile updated!");
            if (onUpdate) onUpdate(res.data);
        } catch (err) {
            alert("Failed to update profile");
            console.error(err);
        }
    };

    return (
        <div className="signup-card">
            <h2 className="signup-title">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
                <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <input type="file" onChange={handleImageChange} ref={fileInputRef} />

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfileComponent;
*/



/*import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../api/userApi';
import '../styles/SignupComponent.css'; // Reuse same styles

const EditProfileComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: user?.password || '',
    skills: user?.skills || [],
  });

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append(
      'user',
      new Blob([JSON.stringify(formData)], { type: 'application/json' })
    );
    if (profileImage) {
      form.append('profileImage', profileImage);
    }

    try {
      const res = await updateUser(user.id, form);
      alert('Profile updated!');
      navigate('/dashboard', { state: { user: res.data } });
    } catch (err) {
      alert('Failed to update profile');
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>
          <div className="form-group">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <input
              type="file"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </div>

          <button type="submit" className="signup-button">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileComponent;*/





/*
import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../api/userApi';
import '../styles/SignupComponent.css'; // Reuse same styles

const EditProfileComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: user?.password || '',
    skills: user?.skills || [],
  });

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append(
      'user',
      new Blob([JSON.stringify(formData)], { type: 'application/json' })
    );
    if (profileImage) {
      form.append('profileImage', profileImage);
    }

    try {
      const res = await updateUser(user.id, form);
      alert('Profile updated!');
      navigate('/dashboard', { state: { user: res.data } });
    } catch (err) {
      alert('Failed to update profile');
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>
          <div className="form-group">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <input
              type="file"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </div>

          <button type="submit" className="signup-button">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileComponent;
*/



/*

import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../api/userApi';
import '../styles/SignupComponent.css';

const EditProfileComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.user;
  
  useEffect(() => {
    console.log("Received user data:", userData);
    if (!userData) {
      navigate('/signin');
    }
  }, [userData, navigate]);
  
  // Handle skills to match backend model
  const prepareSkills = () => {
    if (!userData.skills) return [];
    
    return userData.skills.map(skill => {
      if (typeof skill === 'string') {
        return { name: skill, level: 'Beginner' };
      } else if (typeof skill === 'object') {
        return skill;
      }
      return { name: "Unknown skill", level: "Beginner" };
    });
  };

  const [formData, setFormData] = useState({
    fullName: userData?.fullName || userData?.name || '',
    username: userData?.username || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    password: '', // Empty password as it shouldn't be prefilled
    skills: prepareSkills()
  });

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userData?.id) {
      alert('User ID is missing. Cannot update profile.');
      return;
    }
    
    try {
      // Create FormData object
      const form = new FormData();
      
      // Add user data as JSON blob
      const userDto = {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password || null, // Send null if password is empty
        skills: formData.skills
      };
      
      form.append("user", new Blob([JSON.stringify(userDto)], { 
        type: "application/json" 
      }));
      
      // Add profile image if selected
      if (profileImage) {
        form.append("profileImage", profileImage);
      }
      
      console.log("Submitting update for user ID:", userData.id);
      console.log("Update payload:", userDto);
      
      const updatedUser = await updateUser(userData.id, form);
      
      console.log("Update successful:", updatedUser);
      alert('Profile updated successfully!');
      
      // Navigate back to dashboard with updated user info
      navigate('/dashboard', { 
        state: { 
          user: {
            id: userData.id,
            name: formData.fullName, 
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            profilePic: userData.profilePic, // Keep existing pic if not updated
            followers: userData.followers || 0,
            following: userData.following || 0,
            bio: userData.bio || 'No bio provided',
            skills: formData.skills.map(skill => skill.name) // For display in dashboard
          } 
        } 
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      alert(`Failed to update profile: ${err.response?.data || err.message}`);
    }
  };

  if (!userData) {
    return null; // Don't render anything if no user data
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password (leave empty to keep current)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            {userData.profilePic && (
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <p>Current profile image:</p>
                <img 
                  src={userData.profilePic} 
                  alt="Current profile" 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #3a7bd5'
                  }} 
                />
              </div>
            )}
          </div>

          <button type="submit" className="signup-button">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileComponent;

*/

/*
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../api/userApi';
import '../styles/SignupComponent.css';

const EditProfileComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.user;
  
  // For debugging
  useEffect(() => {
    console.log("Edit Profile received user data:", userData);
    
    if (!userData) {
      navigate('/signin');
    }
  }, [userData, navigate]);

  const [formData, setFormData] = useState({
    fullName: userData?.fullName || userData?.name || '',
    username: userData?.username || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    password: '', // Don't prefill password for security
    skills: Array.isArray(userData?.skills) ? userData.skills : []
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(userData?.profilePic || null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      
      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userData?.id) {
      console.error("Missing user ID in edit profile");
      alert("Cannot update profile: missing user ID");
      return;
    }
    
    try {
      console.log("Preparing to update user with ID:", userData.id);
      
      // Prepare skills array in the correct format
      const formattedSkills = formData.skills.map(skill => {
        if (typeof skill === 'string') {
          return { name: skill, level: 'Beginner' };
        } else if (typeof skill === 'object' && skill.name) {
          return skill;
        }
        return { name: skill.toString(), level: 'Beginner' };
      });
      
      // Create the user DTO
      const userDto = {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password || null,
        skills: formattedSkills
      };
      
      console.log("Update payload:", userDto);
      
      // Create FormData
      const form = new FormData();
      form.append("user", new Blob([JSON.stringify(userDto)], { type: "application/json" }));
      
      if (profileImage) {
        form.append("profileImage", profileImage);
      }
      
      // Log form data entries for debugging
      console.log("Form entries:", [...form.entries()].map(entry => entry[0]));
      
      // Make the API call
      const updatedUser = await updateUser(userData.id, form);
      console.log("Update successful:", updatedUser);
      
      alert("Profile updated successfully!");
      
      // Prepare user data for dashboard
      const dashboardUser = {
        id: userData.id,
        name: formData.fullName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        profilePic: updatedUser.profileImageUrl || imagePreview || userData.profilePic,
        followers: userData.followers || 0,
        following: userData.following || 0,
        bio: userData.bio || '',
        skills: formattedSkills.map(skill => skill.name) // Format for dashboard display
      };
      
      // Navigate back to dashboard
      navigate('/dashboard', { state: { user: dashboardUser } });
      
    } catch (error) {
      console.error("Update failed:", error);
      alert(`Failed to update profile: ${error.response?.data || error.message || 'Unknown error'}`);
    }
  };

  if (!userData) {
    return (
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Error</h2>
          <p style={{ textAlign: 'center', color: '#ff5555' }}>User data not found. Please sign in again.</p>
          <button 
            onClick={() => navigate('/signin')} 
            className="signup-button"
            style={{ marginTop: '20px' }}
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Edit Profile</h2>
        
        
        {process.env.NODE_ENV === 'development' && (
          <div style={{ 
            padding: '8px', 
            marginBottom: '16px', 
            backgroundColor: '#333', 
            borderRadius: '4px',
            fontSize: '12px' 
          }}>
            <p>User ID: {userData.id || 'Missing'}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password (leave empty to keep current)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            {imagePreview && (
              <div style={{ 
                marginTop: '10px', 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <p style={{ color: '#999', fontSize: '12px', marginBottom: '8px' }}>
                  {profileImage ? 'New profile image:' : 'Current profile image:'}
                </p>
                <img 
                  src={imagePreview} 
                  alt="Profile preview" 
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #3a7bd5'
                  }} 
                />
              </div>
            )}
          </div>

          <button type="submit" className="signup-button">Update Profile</button>
          
          
          <button 
            type="button" 
            onClick={() => navigate('/dashboard', { state: { user: userData } })}
            className="signup-button"
            style={{ 
              backgroundColor: 'transparent', 
              border: '1px solid #888',
              color: '#ccc',
              marginTop: '10px'
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileComponent;*/


/*
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../api/userApi';
import '../styles/SignupComponent.css';

const EditProfileComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.user;
  
  useEffect(() => {
    console.log("Edit Profile received user data:", userData);
    if (!userData) {
      navigate('/signin');
    }
  }, [userData, navigate]);

  const [formData, setFormData] = useState({
    fullName: userData?.fullName || userData?.name || '',
    username: userData?.username || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    password: '', // Empty for security
    skills: userData?.skills || []
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // Use both possible fields for the initial image preview
  const [imagePreview, setImagePreview] = useState(userData?.profilePic || userData?.profileImageUrl || null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected new profile image:", file.name, file.type, file.size, "bytes");
      setProfileImage(file);
      
      // Create a preview of the new image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userData?.id) {
      setErrorMessage("Cannot update profile: missing user ID");
      console.error("Missing user ID, cannot update profile");
      return;
    }
    
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      
      console.log("Preparing to update user with ID:", userData.id);
      
      // Format the skills array if needed
      const formattedSkills = Array.isArray(formData.skills) 
        ? formData.skills.filter(s => {
            if (typeof s === 'string') return s.trim() !== '';
            if (typeof s === 'object' && s.name) return s.name.trim() !== '';
            return false;
          }).map(skill => {
            if (typeof skill === 'string') {
              return { name: skill, level: 'Beginner' };
            }
            return skill;
          })
        : [];
      
      // Create the user DTO
      const userDto = {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password || null,
        skills: formattedSkills
      };
      
      console.log("Update payload:", userDto);
      
      // Create FormData
      const form = new FormData();
      form.append("user", new Blob([JSON.stringify(userDto)], { type: "application/json" }));
      
      if (profileImage) {
        console.log("Attaching profile image:", profileImage.name, profileImage.size, "bytes");
        form.append("profileImage", profileImage);
      }
      
      // Log form data for debugging
      console.log("Form data entries:");
      for (let pair of form.entries()) {
        console.log(pair[0], pair[1] instanceof Blob ? 
          "Blob data: " + pair[1].size + " bytes" : pair[1]);
      }
      
      // Make the API call
      const updatedUser = await updateUser(userData.id, form);
      console.log("Update successful, server returned:", updatedUser);
      
      // Check if profile image URL was updated
      console.log("New profile image URL:", updatedUser.profileImageUrl);
      
      // Create updated user object for dashboard
      const dashboardUser = {
        id: updatedUser.id,
        name: updatedUser.fullName,
        fullName: updatedUser.fullName,
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
        // Use the new profile image URL from server
        profilePic: updatedUser.profileImageUrl,
        profileImageUrl: updatedUser.profileImageUrl,
        followers: userData.followers || 0,
        following: userData.following || 0,
        bio: userData.bio || '',
        skills: formattedSkills.map(skill => typeof skill === 'object' ? skill.name : skill)
      };
      
      // Update localStorage with the new user data
      localStorage.setItem('user', JSON.stringify(dashboardUser));
      
      alert("Profile updated successfully!");
      
      // Navigate back to dashboard with updated user
      navigate('/dashboard', { state: { user: dashboardUser } });
      
    } catch (error) {
      console.error("Update failed:", error);
      setErrorMessage(error.response?.data || error.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userData) {
    return (
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Error</h2>
          <p style={{ textAlign: 'center', color: '#ff5555' }}>
            User data not found. Please sign in again.
          </p>
          <button onClick={() => navigate('/signin')} className="signup-button">
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Edit Profile</h2>
        
        
        <div style={{ 
          backgroundColor: '#333',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px', 
          fontSize: '14px'
        }}>
          <p>User ID: {userData.id}</p>
          <p>Current profile image: {userData.profilePic || userData.profileImageUrl || 'None'}</p>
        </div>
        
        {errorMessage && (
          <div className="error-banner" style={{ 
            backgroundColor: '#f44336', 
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password (leave empty to keep current)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profileImage" style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}>
              Profile Image
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button 
                type="button" 
                onClick={() => fileInputRef.current.click()}
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#3a7bd5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Choose Image
              </button>
              <span style={{ color: '#999', fontSize: '16px' }}>
                {profileImage ? profileImage.name : 'No new image selected'}
              </span>
            </div>
            
            
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            
            
            {imagePreview && (
              <div style={{ 
                marginTop: '15px', 
                textAlign: 'center',
                padding: '10px',
                border: '1px solid #333',
                borderRadius: '5px'
              }}>
                <p style={{ color: '#999', marginBottom: '10px', fontSize: '16px' }}>
                  {profileImage ? 'New profile image:' : 'Current profile image:'}
                </p>
                <img 
                  src={imagePreview} 
                  alt="Profile preview" 
                  style={{ 
                    width: '150px', 
                    height: '150px', 
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #3a7bd5'
                  }} 
                  onError={(e) => {
                    console.error("Failed to load profile image preview");
                    e.target.src = `https://i.pravatar.cc/150?u=${formData.username}`;
                  }}
                />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="signup-button" 
            disabled={isSubmitting}
            style={{ 
              marginTop: '20px',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {isSubmitting ? 'Updating...' : 'Update Profile'}
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate('/dashboard', { state: { user: userData } })}
            className="signup-button"
            style={{ 
              backgroundColor: 'transparent', 
              border: '1px solid #888',
              color: '#ccc',
              marginTop: '10px',
              fontSize: '18px'
            }}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileComponent;
*/
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../api/userApi';
import '../styles/SignupComponent.css';

const EditProfileComponent = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const userData = location.state?.user;
 
 useEffect(() => {
   console.log("Edit Profile received user data:", userData);
   if (!userData) {
     navigate('/signin');
   }
 }, [userData, navigate]);

 const [formData, setFormData] = useState({
   fullName: userData?.fullName || userData?.name || '',
   username: userData?.username || '',
   email: userData?.email || '',
   phone: userData?.phone || '',
   password: '', // Empty for security
   skills: userData?.skills || []
 });

 const [profileImage, setProfileImage] = useState(null);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [errorMessage, setErrorMessage] = useState('');
 // Use both possible fields for the initial image preview
 const [imagePreview, setImagePreview] = useState(userData?.profilePic || userData?.profileImageUrl || null);
 const fileInputRef = useRef(null);

 const handleChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleImageChange = (e) => {
   const file = e.target.files[0];
   if (file) {
     console.log("Selected new profile image:", file.name, file.type, file.size, "bytes");
     setProfileImage(file);
     
     // Create a preview of the new image
     const reader = new FileReader();
     reader.onloadend = () => {
       setImagePreview(reader.result);
     };
     reader.readAsDataURL(file);
   }
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   
   if (!userData?.id) {
     setErrorMessage("Cannot update profile: missing user ID");
     return;
   }
   
   try {
     setIsSubmitting(true);
     setErrorMessage('');
     
     console.log("Preparing to update user with ID:", userData.id);
     
     // Format skills array
     const formattedSkills = Array.isArray(formData.skills) 
       ? formData.skills.filter(s => {
           if (typeof s === 'string') return s.trim() !== '';
           if (typeof s === 'object' && s.name) return s.name.trim() !== '';
           return false;
         }).map(skill => {
           if (typeof skill === 'string') {
             return { name: skill, level: 'Beginner' };
           }
           return skill;
         })
       : [];
     
     // Create the user DTO
     const userDto = {
       fullName: formData.fullName,
       username: formData.username,
       email: formData.email,
       phone: formData.phone,
       password: formData.password || null,
       skills: formattedSkills
     };
     
     console.log("Update payload:", userDto);
     
     // Create FormData
     const form = new FormData();
     form.append("user", new Blob([JSON.stringify(userDto)], { type: "application/json" }));
     
     if (profileImage) {
       console.log("Attaching profile image:", profileImage.name, profileImage.size, "bytes");
       form.append("profileImage", profileImage);
     }
     
     // Make the API call
     const updatedUser = await updateUser(userData.id, form);
     console.log("Update successful, server returned:", updatedUser);
     
     // Generate a unique timestamp for cache busting
     const timestamp = new Date().getTime();
     
     // Create updated user object for dashboard
     const dashboardUser = {
       id: updatedUser.id,
       name: updatedUser.fullName,
       fullName: updatedUser.fullName,
       username: updatedUser.username,
       email: updatedUser.email,
       phone: updatedUser.phone,
       // Use the new profile image URL from server
       profilePic: updatedUser.profileImageUrl,
       profileImageUrl: updatedUser.profileImageUrl,
       followers: userData.followers || 0,
       following: userData.following || 0,
       bio: userData.bio || '',
       skills: formattedSkills.map(skill => typeof skill === 'object' ? skill.name : skill)
     };
     
     // Update localStorage with the new user data
     localStorage.setItem('user', JSON.stringify(dashboardUser));
     
     alert("Profile updated successfully!");
     
     // Force page reload to ensure images refresh
     window.location.href = '/dashboard';
   } catch (error) {
     console.error("Update failed:", error);
     setErrorMessage(error.response?.data || error.message || 'Failed to update profile');
   } finally {
     setIsSubmitting(false);
   }
 };

 if (!userData) {
   return (
     <div className="signup-container">
       <div className="signup-card">
         <h2 className="signup-title">Error</h2>
         <p style={{ textAlign: 'center', color: '#ff5555' }}>
           User data not found. Please sign in again.
         </p>
         <button onClick={() => navigate('/signin')} className="signup-button">
           Go to Sign In
         </button>
       </div>
     </div>
   );
 }

 return (
   <div className="signup-container">
     <div className="signup-card">
       <h2 className="signup-title">Edit Profile</h2>
       
       {errorMessage && (
         <div className="error-banner" style={{ 
           backgroundColor: '#f44336', 
           color: 'white',
           padding: '10px',
           borderRadius: '5px',
           marginBottom: '20px'
         }}>
           {errorMessage}
         </div>
       )}
       
       <form onSubmit={handleSubmit}>
         <div className="form-group">
           <input
             name="fullName"
             value={formData.fullName}
             onChange={handleChange}
             placeholder="Full Name"
             required
           />
         </div>
         <div className="form-group">
           <input
             name="username"
             value={formData.username}
             onChange={handleChange}
             placeholder="Username"
             required
           />
         </div>
         <div className="form-group">
           <input
             name="email"
             type="email"
             value={formData.email}
             onChange={handleChange}
             placeholder="Email"
             required
           />
         </div>
         <div className="form-group">
           <input
             name="phone"
             value={formData.phone}
             onChange={handleChange}
             placeholder="Phone"
           />
         </div>
         <div className="form-group">
           <input
             name="password"
             type="password"
             value={formData.password}
             onChange={handleChange}
             placeholder="New Password (leave empty to keep current)"
           />
         </div>

         <div className="form-group">
           <label htmlFor="profileImage" style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}>
             Profile Image
           </label>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             <button 
               type="button" 
               onClick={() => fileInputRef.current.click()}
               style={{
                 padding: '10px 15px',
                 backgroundColor: '#3a7bd5',
                 color: 'white',
                 border: 'none',
                 borderRadius: '5px',
                 cursor: 'pointer',
                 fontSize: '16px'
               }}
             >
               Choose Image
             </button>
             <span style={{ color: '#999', fontSize: '16px' }}>
               {profileImage ? profileImage.name : 'No new image selected'}
             </span>
           </div>
           
           {/* Hidden file input */}
           <input
             id="profileImage"
             type="file"
             accept="image/*"
             onChange={handleImageChange}
             ref={fileInputRef}
             style={{ display: 'none' }}
           />
           
           {/* Image preview section */}
           {imagePreview && (
             <div style={{ 
               marginTop: '15px', 
               textAlign: 'center',
               padding: '10px',
               border: '1px solid #333',
               borderRadius: '5px'
             }}>
               <p style={{ color: '#999', marginBottom: '10px', fontSize: '16px' }}>
                 {profileImage ? 'New profile image:' : 'Current profile image:'}
               </p>
               <img 
                 src={imagePreview} 
                 alt="Profile preview" 
                 style={{ 
                   width: '150px', 
                   height: '150px', 
                   borderRadius: '50%',
                   objectFit: 'cover',
                   border: '3px solid #3a7bd5'
                 }} 
                 onError={(e) => {
                   console.error("Failed to load profile image preview");
                   e.target.src = `https://i.pravatar.cc/150?u=${formData.username}`;
                 }}
               />
             </div>
           )}
         </div>

         <button 
           type="submit" 
           className="signup-button" 
           disabled={isSubmitting}
           style={{ 
             marginTop: '20px',
             fontSize: '18px',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             gap: '10px'
           }}
         >
           {isSubmitting ? 'Updating...' : 'Update Profile'}
         </button>
         
         <button 
           type="button" 
           onClick={() => navigate('/dashboard', { state: { user: userData } })}
           className="signup-button"
           style={{ 
             backgroundColor: 'transparent', 
             border: '1px solid #888',
             color: '#ccc',
             marginTop: '10px',
             fontSize: '18px'
           }}
           disabled={isSubmitting}
         >
           Cancel
         </button>
       </form>
     </div>
   </div>
 );
};

export default EditProfileComponent;