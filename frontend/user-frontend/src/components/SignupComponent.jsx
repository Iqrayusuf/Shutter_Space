/*import React, { useState, useRef } from 'react';
import { UserPlus, Camera, Facebook, Mail, Phone, User, Lock, Plus } from 'lucide-react';
import '../styles/SignupComponent.css';
import { registerUser } from '../api/userApi';

const SignupComponent = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [skills, setSkills] = useState([{ name: "", level: "Beginner" }]);
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddSkill = () => {
        setSkills([...skills, { name: "", level: "Beginner" }]);
    };

    const handleSkillChange = (index, field, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value;
        setSkills(updatedSkills);
    };

    const validateForm = () => {
        const errors = {};
        if (!fullName.trim()) errors.fullName = "Full Name is required";
        if (!username.trim()) errors.username = "Username is required";
        if (!email.trim()) errors.email = "Email is required";
        if (!phone.trim()) errors.phone = "Phone is required";
        if (!password.trim()) errors.password = "Password is required";
        if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            const userPayload = {
                fullName,
                username,
                email,
                phone,
                password,
                skills
            };

            formData.append("user", new Blob([JSON.stringify(userPayload)], { type: "application/json" }));

            if (profileImage) {
                formData.append("profileImage", profileImage);
            }

            const response = await registerUser(formData);

            alert("Signup successful!");
            // Optionally redirect or reset form here
        } catch (error) {
            alert("Signup failed: " + (error?.response?.data || error.message));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    
                    
                    <div className="form-group">
                        <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={formErrors.fullName ? "error" : ""} />
                        <User className="input-icon" size={18} />
                        {formErrors.fullName && <div className="error-message">{formErrors.fullName}</div>}
                    </div>

                    
                    <div className="form-group">
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className={formErrors.username ? "error" : ""} />
                        <User className="input-icon" size={18} />
                        {formErrors.username && <div className="error-message">{formErrors.username}</div>}
                    </div>

                    
                    <div className="form-group">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={formErrors.email ? "error" : ""} />
                        <Mail className="input-icon" size={18} />
                        {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                    </div>

                    
                    <div className="form-group">
                        <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={formErrors.phone ? "error" : ""} />
                        <Phone className="input-icon" size={18} />
                        {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                    </div>

                
                    <div className="form-group">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={formErrors.password ? "error" : ""} />
                        <Lock className="input-icon" size={18} />
                        {formErrors.password && <div className="error-message">{formErrors.password}</div>}
                    </div>

                    
                    <div className="form-group">
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={formErrors.confirmPassword ? "error" : ""} />
                        <Lock className="input-icon" size={18} />
                        {formErrors.confirmPassword && <div className="error-message">{formErrors.confirmPassword}</div>}
                    </div>

                    
                    <div className="skills-section">
                        <label>Skills (Optional)</label>
                        {skills.map((skill, index) => (
                            <div className="skill-row" key={index}>
                                <input type="text" placeholder="Skill name" value={skill.name} onChange={(e) => handleSkillChange(index, "name", e.target.value)} className="skill-input" />
                                <select value={skill.level} onChange={(e) => handleSkillChange(index, "level", e.target.value)} className="skill-level">
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                        ))}
                        <button type="button" className="add-skill-button" onClick={handleAddSkill}>
                            <Plus size={16} /> Add another skill
                        </button>
                    </div>

                    
                    <div className="upload-section">
                        <label>Upload Profile Photo:</label>
                        <div className="upload-container">
                            <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="file-input" id="profile-photo" />
                            <button type="button" className="upload-button" onClick={() => fileInputRef.current.click()}>
                                Choose File
                            </button>
                            <span className="file-name">{profileImage ? profileImage.name : "No file chosen"}</span>
                            {profileImagePreview && (
                                <div className="image-preview">
                                    <img src={profileImagePreview} alt="Profile preview" />
                                </div>
                            )}
                        </div>
                    </div>

                    
                    <div className="remember-me">
                        <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>

                
                    <button type="submit" className={`signup-button ${loading ? "loading" : ""}`} disabled={loading}>
                        {loading ? <div className="spinner"></div> : (<><UserPlus size={18} /> Sign Up</>)}
                    </button>
                </form>

                
                <div className="social-login">
                    <button
                        className="social-button facebook"
                        onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/facebook'}
                    >
                        <Facebook size={18} />
                        Login with Facebook
                    </button>

                    <button
                        className="social-button google"
                        onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                    >
                        <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
                            <path
                                d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
                                fill="currentColor"
                            />
                        </svg>
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupComponent;
*/


/*
import React, { useState, useRef } from 'react';
import { UserPlus, Camera, Facebook, Mail, Phone, User, Lock, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupComponent.css';
import { registerUser } from '../api/userApi';

const SignupComponent = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [skills, setSkills] = useState([{ name: "", level: "Beginner" }]);
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddSkill = () => {
        setSkills([...skills, { name: "", level: "Beginner" }]);
    };

    const handleSkillChange = (index, field, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value;
        setSkills(updatedSkills);
    };

    const validateForm = () => {
        const errors = {};
        if (!fullName.trim()) errors.fullName = "Full Name is required";
        if (!username.trim()) errors.username = "Username is required";
        if (!email.trim()) errors.email = "Email is required";
        if (!phone.trim()) errors.phone = "Phone is required";
        if (!password.trim()) errors.password = "Password is required";
        if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);

            const formData = new FormData();
            const userPayload = {
                fullName,
                username,
                email,
                phone,
                password,
                skills
            };

            formData.append("user", new Blob([JSON.stringify(userPayload)], { type: "application/json" }));
            if (profileImage) formData.append("profileImage", profileImage);

            await registerUser(formData);

            const dashboardUser = {
                name: fullName,
                username: "@" + username,
                profilePic: profileImagePreview || `https://i.pravatar.cc/150?u=${username}`,
                followers: 0,
                following: 0,
                bio: "\ud83d\udcf8 Welcome to Shutter Space!",
                skills: skills.map(s => s.name).filter(Boolean)
            };

            navigate('/dashboard', { state: { user: dashboardUser } });

            // Optional reset
            setFullName("");
            setUsername("");
            setEmail("");
            setPhone("");
            setPassword("");
            setConfirmPassword("");
            setSkills([{ name: "", level: "Beginner" }]);
            setProfileImage(null);
            setProfileImagePreview(null);
        } catch (error) {
            alert("Signup failed: " + (error?.response?.data || error.message));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={formErrors.fullName ? "error" : ""} />
                        <User className="input-icon" size={18} />
                        {formErrors.fullName && <div className="error-message">{formErrors.fullName}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className={formErrors.username ? "error" : ""} />
                        <User className="input-icon" size={18} />
                        {formErrors.username && <div className="error-message">{formErrors.username}</div>}
                    </div>

                    <div className="form-group">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={formErrors.email ? "error" : ""} />
                        <Mail className="input-icon" size={18} />
                        {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                    </div>

                    <div className="form-group">
                        <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={formErrors.phone ? "error" : ""} />
                        <Phone className="input-icon" size={18} />
                        {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                    </div>

                    <div className="form-group">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={formErrors.password ? "error" : ""} />
                        <Lock className="input-icon" size={18} />
                        {formErrors.password && <div className="error-message">{formErrors.password}</div>}
                    </div>

                    <div className="form-group">
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={formErrors.confirmPassword ? "error" : ""} />
                        <Lock className="input-icon" size={18} />
                        {formErrors.confirmPassword && <div className="error-message">{formErrors.confirmPassword}</div>}
                    </div>

                    <div className="skills-section">
                        <label>Skills (Optional)</label>
                        {skills.map((skill, index) => (
                            <div className="skill-row" key={index}>
                                <input type="text" placeholder="Skill name" value={skill.name} onChange={(e) => handleSkillChange(index, "name", e.target.value)} className="skill-input" />
                                <select value={skill.level} onChange={(e) => handleSkillChange(index, "level", e.target.value)} className="skill-level">
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                        ))}
                        <button type="button" className="add-skill-button" onClick={handleAddSkill}>
                            <Plus size={16} /> Add another skill
                        </button>
                    </div>

                    <div className="upload-section">
                        <label>Upload Profile Photo:</label>
                        <div className="upload-container">
                            <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="file-input" id="profile-photo" />
                            <button type="button" className="upload-button" onClick={() => fileInputRef.current.click()}>
                                Choose File
                            </button>
                            <span className="file-name">{profileImage ? profileImage.name : "No file chosen"}</span>
                            {profileImagePreview && (
                                <div className="image-preview">
                                    <img src={profileImagePreview} alt="Profile preview" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="remember-me">
                        <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>

                    <button type="submit" className={`signup-button ${loading ? "loading" : ""}`} disabled={loading}>
                        {loading ? <div className="spinner"></div> : (<><UserPlus size={18} /> Sign Up</>)}
                    </button>
                </form>

                <div className="social-login">
                    <button className="social-button facebook" onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/facebook'}>
                        <Facebook size={18} /> Login with Facebook
                    </button>
                    <button className="social-button google" onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}>
                        <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
                            <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" fill="currentColor" />
                        </svg>
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupComponent;
*/

import React, { useState, useRef } from 'react';
import { UserPlus, Facebook, Mail, Phone, User, Lock, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupComponent.css';
import { registerUser } from '../api/userApi';

const SignupComponent = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [skills, setSkills] = useState([{ name: "", level: "Beginner" }]);
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddSkill = () => {
        setSkills([...skills, { name: "", level: "Beginner" }]);
    };

    const handleSkillChange = (index, field, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value;
        setSkills(updatedSkills);
    };

    const validateForm = () => {
        const errors = {};
        if (!fullName.trim()) errors.fullName = "Full Name is required";
        if (!username.trim()) errors.username = "Username is required";
        if (!email.trim()) errors.email = "Email is required";
        if (!phone.trim()) errors.phone = "Phone is required";
        if (!password.trim()) errors.password = "Password is required";
        if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);

            const formData = new FormData();
            const userPayload = {
                fullName,
                username,
                email,
                phone,
                password,
                skills: skills.filter(s => s.name.trim() !== "") // Filter out empty skills
            };

            formData.append("user", new Blob([JSON.stringify(userPayload)], { type: "application/json" }));
            if (profileImage) formData.append("profileImage", profileImage);

            // Call the API and get the response
            const response = await registerUser(formData);
            console.log("Registration success, server returned:", response);
            
            // Important: Use the data returned from the server, which includes the ID
            const userData = response;
            
            // Create a user object that includes the ID from the server
            const dashboardUser = {
                id: userData.id, // THIS IS CRITICAL! Get the ID from the server response
                name: userData.fullName, 
                fullName: userData.fullName,
                username: userData.username,
                email: userData.email,
                phone: userData.phone,
                profilePic: userData.profileImageUrl || profileImagePreview || `https://i.pravatar.cc/150?u=${username}`,
                profileImageUrl: userData.profileImageUrl,
                followers: 0,
                following: 0,
                bio: "\ud83d\udcf8 Welcome to Shutter Space!",
                skills: userData.skills?.map(s => typeof s === 'object' ? s.name : s).filter(Boolean) || []
            };
            
            // Save to localStorage for persistence
            localStorage.setItem('user', JSON.stringify(dashboardUser));
            
            // Navigate to dashboard with the complete user data
            navigate('/dashboard', { state: { user: dashboardUser } });

        } catch (error) {
            alert("Signup failed: " + (error?.response?.data || error.message));
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={formErrors.fullName ? "error" : ""} />
                        <User className="input-icon" size={18} />
                        {formErrors.fullName && <div className="error-message">{formErrors.fullName}</div>}
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className={formErrors.username ? "error" : ""} />
                        <User className="input-icon" size={18} />
                        {formErrors.username && <div className="error-message">{formErrors.username}</div>}
                    </div>

                    <div className="form-group">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={formErrors.email ? "error" : ""} />
                        <Mail className="input-icon" size={18} />
                        {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                    </div>

                    <div className="form-group">
                        <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={formErrors.phone ? "error" : ""} />
                        <Phone className="input-icon" size={18} />
                        {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                    </div>

                    <div className="form-group">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={formErrors.password ? "error" : ""} />
                        <Lock className="input-icon" size={18} />
                        {formErrors.password && <div className="error-message">{formErrors.password}</div>}
                    </div>

                    <div className="form-group">
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={formErrors.confirmPassword ? "error" : ""} />
                        <Lock className="input-icon" size={18} />
                        {formErrors.confirmPassword && <div className="error-message">{formErrors.confirmPassword}</div>}
                    </div>

                    <div className="skills-section">
                        <label>Skills (Optional)</label>
                        {skills.map((skill, index) => (
                            <div className="skill-row" key={index}>
                                <input type="text" placeholder="Skill name" value={skill.name} onChange={(e) => handleSkillChange(index, "name", e.target.value)} className="skill-input" />
                                <select value={skill.level} onChange={(e) => handleSkillChange(index, "level", e.target.value)} className="skill-level">
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                        ))}
                        <button type="button" className="add-skill-button" onClick={handleAddSkill}>
                            <Plus size={16} /> Add another skill
                        </button>
                    </div>

                    <div className="upload-section">
                        <label>Upload Profile Photo:</label>
                        <div className="upload-container">
                            <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="file-input" id="profile-photo" />
                            <button type="button" className="upload-button" onClick={() => fileInputRef.current.click()}>
                                Choose File
                            </button>
                            <span className="file-name">{profileImage ? profileImage.name : "No file chosen"}</span>
                            {profileImagePreview && (
                                <div className="image-preview">
                                    <img src={profileImagePreview} alt="Profile preview" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="remember-me">
                        <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>

                    <button type="submit" className={`signup-button ${loading ? "loading" : ""}`} disabled={loading}>
                        {loading ? <div className="spinner"></div> : (<><UserPlus size={18} /> Sign Up</>)}
                    </button>
                </form>

                <div className="social-login">
                    <button className="social-button facebook" onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/facebook'}>
                        <Facebook size={18} /> Login with Facebook
                    </button>
                    <button className="social-button google" onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}>
                        <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
                            <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" fill="currentColor" />
                        </svg>
                        Login with Google
                    </button>
                </div>
                
                {/* Add Sign In link */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <span style={{ color: '#ccc', fontSize: '14px' }}>
                        Already have an account?
                    </span>
                    <br />
                    <button
                        type="button"
                        onClick={() => navigate('/signin')}
                        style={{
                            marginTop: '10px',
                            padding: '10px 20px',
                            fontSize: '14px',
                            border: '1px solid #3a7bd5',
                            background: 'transparent',
                            color: '#3a7bd5',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupComponent;