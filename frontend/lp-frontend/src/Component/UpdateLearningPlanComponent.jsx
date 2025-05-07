import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Award, Plus, X, Save, RefreshCw, Camera, Calendar, 
  Clock, Upload, Star, AlertTriangle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import './LearningPlanComponent.css'; // Reusing the same CSS

const UpdateLearningPlanComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // State variables for all fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [topicsCovered, setTopicsCovered] = useState([]);
    const [newTopic, setNewTopic] = useState("");
    const [resources, setResources] = useState([]);
    const [newResourceType, setNewResourceType] = useState("");
    const [newResourceUrl, setNewResourceUrl] = useState("");
    const [startDate, setStartDate] = useState("");
    const [targetCompletionDate, setTargetCompletionDate] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [difficultyLevel, setDifficultyLevel] = useState("Beginner");
    const [status, setStatus] = useState("Not Started");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [progress, setProgress] = useState(0);
    
    // Refs for focus management
    const titleRef = useRef(null);
    const topicInputRef = useRef(null);
    const resourceTypeInputRef = useRef(null);

    // API URL
    const API_URL = 'http://localhost:8081/api/users';

    // Fetch learning plan data on component mount
    useEffect(() => {
        const fetchLearningPlan = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/${id}`);
                const learningPlan = response.data;
                
                // Set all form fields with data from API
                setTitle(learningPlan.title || "");
                setDescription(learningPlan.description || "");
                setTopicsCovered(learningPlan.topicsCovered || []);
                setResources(learningPlan.resources || []);
                setStartDate(learningPlan.startDate || "");
                setTargetCompletionDate(learningPlan.targetCompletionDate || "");
                setEstimatedTime(learningPlan.estimatedTime || "");
                setDifficultyLevel(learningPlan.difficultyLevel || "Beginner");
                setStatus(learningPlan.status || "Not Started");
                
                // Handle image if exists
                if (learningPlan.imageUrl) {
                    setImagePreview(learningPlan.imageUrl);
                }
                
                setLoading(false);
                // Calculate progress
                calculateProgress();
            } catch (err) {
                console.error('Error fetching learning plan:', err);
                setError('Failed to fetch learning plan details. Please try again.');
                setLoading(false);
            }
        };

        fetchLearningPlan();
    }, [id]);

    // Calculate form completion progress
    const calculateProgress = () => {
        const requiredFields = [title, description, startDate, targetCompletionDate, estimatedTime];
        const completedFields = requiredFields.filter(field => field).length;
        const additionalPoints = (topicsCovered.length > 0 ? 1 : 0) + (resources.length > 0 ? 1 : 0);
        const totalFields = requiredFields.length + 2; // +2 for topics and resources
        
        const calculatedProgress = Math.floor(((completedFields + additionalPoints) / totalFields) * 100);
        setProgress(calculatedProgress);
    };

    // Clear success message after 5 seconds
    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [successMessage]);

    // Update progress when form fields change
    useEffect(() => {
        calculateProgress();
    }, [title, description, topicsCovered, resources, startDate, targetCompletionDate, estimatedTime]);

    // Function to handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to handle adding a new topic
    const handleAddTopic = (e) => {
        e.preventDefault();
        if (newTopic.trim() !== "") {
            setTopicsCovered([...topicsCovered, newTopic]);
            setNewTopic("");
            // Focus back on input
            if (topicInputRef.current) {
                topicInputRef.current.focus();
            }
            // Clear any previous error
            if (formErrors.topics) {
                const { topics, ...rest } = formErrors;
                setFormErrors(rest);
            }
        }
    };

    // Function to handle removing a topic
    const handleRemoveTopic = (index) => {
        const updatedTopics = [...topicsCovered];
        updatedTopics.splice(index, 1);
        setTopicsCovered(updatedTopics);
    };

    // Function to handle adding a new resource
    const handleAddResource = (e) => {
        e.preventDefault();
        if (newResourceType.trim() !== "" && newResourceUrl.trim() !== "") {
            setResources([...resources, { 
                type: newResourceType, 
                url: newResourceUrl 
            }]);
            setNewResourceType("");
            setNewResourceUrl("");
            // Focus back on resource type input
            if (resourceTypeInputRef.current) {
                resourceTypeInputRef.current.focus();
            }
            // Clear any previous error
            if (formErrors.resources) {
                const { resources, ...rest } = formErrors;
                setFormErrors(rest);
            }
        }
    };

    // Function to handle removing a resource
    const handleRemoveResource = (index) => {
        const updatedResources = [...resources];
        updatedResources.splice(index, 1);
        setResources(updatedResources);
    };

    // Validate the form
    const validateForm = () => {
        const errors = {};
        if (!title.trim()) errors.title = "Title is required";
        if (!description.trim()) errors.description = "Description is required";
        if (topicsCovered.length === 0) errors.topics = "At least one topic is required";
        if (resources.length === 0) errors.resources = "At least one resource is required";
        if (!startDate) errors.startDate = "Start date is required";
        if (!targetCompletionDate) errors.targetCompletionDate = "Target completion date is required";
        if (!estimatedTime.trim()) errors.estimatedTime = "Estimated time is required";
        
        // Check if target date is after start date
        if (startDate && targetCompletionDate && new Date(targetCompletionDate) <= new Date(startDate)) {
            errors.targetCompletionDate = "Target date must be after start date";
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Function to update the learning plan
    const updateLearningplan = async (e) => {
        e.preventDefault();
        
        // Validate form first
        if (!validateForm()) {
            // Scroll to the first error
            const firstErrorField = Object.keys(formErrors)[0];
            const errorElement = document.getElementById(firstErrorField);
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                errorElement.focus();
            }
            return;
        }
        
        try {
            setSubmitting(true);
            setError(null);
            setSuccessMessage(null);
            
            // Format resources properly
            const formattedResources = resources.map(resource => ({
                id: resource.id || null,
                type: resource.type,
                url: resource.url,
                name: resource.name || null
            }));
            
            // Create the learning plan object to match your backend DTO
            const learningPlan = {
                id: parseInt(id),
                title,
                description,
                topicsCovered,
                resources: formattedResources,
                startDate,
                targetCompletionDate,
                estimatedTime,
                difficultyLevel,
                status,
                imageUrl: imagePreview // In a real app, you'd upload the image and get a URL back
            };
            
            // Make API call to update
            const response = await axios.put(`${API_URL}/${id}`, learningPlan);
            
            setSuccessMessage('Learning plan updated successfully!');
            
            // Navigate back to list view after a short delay
            setTimeout(() => {
                navigate('/');
            }, 2000);
            
        } catch (err) {
            console.error('Error updating learning plan:', err);
            setError(err.response?.data?.message || 'Failed to update learning plan. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };
    
    // Function to cancel the update and go back to list
    const handleCancel = () => {
        navigate('/');
    };

    // Preview difficulty level UI helper
    const renderDifficultyStars = (level) => {
        const stars = {
            "Beginner": 1,
            "Intermediate": 2,
            "Advanced": 3,
            "Expert": 4
        };
        
        return (
            <div className="difficulty-stars">
                {[...Array(4)].map((_, index) => (
                    <Star 
                        key={index}
                        size={16} 
                        className={index < stars[level] ? "star-filled" : "star-empty"} 
                    />
                ))}
            </div>
        );
    };

    // Show loading state
    if (loading) {
        return <div className="loading-container">Loading learning plan details...</div>;
    }

    return (
        <div className="learning-plan-container">
            <div className="plan-header">
                <h2 className="plan-title">Update Learning Plan</h2>
                <p className="plan-subtitle">Edit your photography learning journey</p>
                
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="progress-text">{progress}% complete</span>
                </div>
            </div>
            
            {/* Success message with animation */}
            {successMessage && (
                <div className="alert success-alert">
                    <div className="alert-content">
                        <CheckCircle size={18} />
                        <strong>Success!</strong> {successMessage}
                    </div>
                    <button 
                        type="button" 
                        className="alert-close" 
                        onClick={() => setSuccessMessage(null)}
                    >
                        <X size={18} />
                    </button>
                </div>
            )}
            
            {/* Error message */}
            {error && (
                <div className="alert error-alert">
                    <div className="alert-content">
                        <AlertTriangle size={18} />
                        <strong>Error!</strong> {error}
                    </div>
                    <button 
                        type="button" 
                        className="alert-close" 
                        onClick={() => setError(null)}
                    >
                        <X size={18} />
                    </button>
                </div>
            )}
            
            <form onSubmit={updateLearningplan}>
                <div className="plan-card">
                    <div className="card-header">
                        <BookOpen className="card-icon" />
                        <h3 className="card-title">Basic Information</h3>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text" 
                                id="title" 
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (formErrors.title) {
                                        const { title, ...rest } = formErrors;
                                        setFormErrors(rest);
                                    }
                                }}
                                placeholder="Enter a title for your learning plan"
                                className={formErrors.title ? "error" : ""}
                                ref={titleRef}
                                required
                            />
                            {formErrors.title && <div className="error-message">{formErrors.title}</div>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                id="description" 
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    if (formErrors.description) {
                                        const { description, ...rest } = formErrors;
                                        setFormErrors(rest);
                                    }
                                }}
                                placeholder="Describe what you want to learn and why"
                                className={formErrors.description ? "error" : ""}
                                rows="3"
                                required
                            />
                            {formErrors.description && <div className="error-message">{formErrors.description}</div>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="image">Cover Image (Optional)</label>
                            <div className="image-upload-container">
                                <div className="image-upload">
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="image-input"
                                    />
                                    <label htmlFor="image" className="image-label">
                                        <Upload size={18} />
                                        {imagePreview ? 'Change Image' : 'Upload Image'}
                                    </label>
                                </div>
                                
                                {imagePreview && (
                                    <div className="image-preview-container">
                                        <div className="image-preview">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                        <button 
                                            type="button" 
                                            className="remove-image-btn"
                                            onClick={() => {
                                                setImage(null);
                                                setImagePreview(null);
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="plan-card">
                    <div className="card-header">
                        <Award className="card-icon" />
                        <h3 className="card-title">Topics Covered</h3>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    placeholder="Add a photography topic or technique" 
                                    value={newTopic}
                                    onChange={(e) => setNewTopic(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddTopic(e);
                                        }
                                    }}
                                    className={formErrors.topics ? "error" : ""}
                                    ref={topicInputRef}
                                />
                                <button 
                                    className="add-btn" 
                                    type="button"
                                    onClick={handleAddTopic}
                                >
                                    <Plus size={18} />
                                    Add
                                </button>
                            </div>
                            {formErrors.topics && <div className="error-message">{formErrors.topics}</div>}
                        </div>
                        
                        {topicsCovered.length > 0 ? (
                            <div className="topics-list-container">
                                <ul className="items-list">
                                    {topicsCovered.map((topic, index) => (
                                        <li key={index} className="list-item">
                                            <span>{topic}</span>
                                            <button 
                                                type="button" 
                                                className="remove-btn"
                                                onClick={() => handleRemoveTopic(index)}
                                            >
                                                <X size={16} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                
                                {topicsCovered.length > 0 && (
                                    <div className="topics-count">
                                        {topicsCovered.length} topic{topicsCovered.length !== 1 ? 's' : ''} added
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <Camera size={24} />
                                <p>No topics added yet. Please add at least one topic.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="plan-card">
                    <div className="card-header">
                        <BookOpen className="card-icon" />
                        <h3 className="card-title">Learning Resources</h3>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <div className="resource-inputs">
                                <div className="resource-type-input">
                                    <input 
                                        type="text" 
                                        placeholder="Resource Type (e.g., Video, Book)" 
                                        value={newResourceType}
                                        onChange={(e) => setNewResourceType(e.target.value)}
                                        className={formErrors.resources ? "error" : ""}
                                        ref={resourceTypeInputRef}
                                    />
                                </div>
                                <div className="resource-url-input">
                                    <input 
                                        type="url" 
                                        placeholder="Resource URL" 
                                        value={newResourceUrl}
                                        onChange={(e) => setNewResourceUrl(e.target.value)}
                                        className={formErrors.resources ? "error" : ""}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddResource(e);
                                            }
                                        }}
                                    />
                                </div>
                                <button 
                                    className="add-btn" 
                                    type="button"
                                    onClick={handleAddResource}
                                >
                                    <Plus size={18} />
                                    Add
                                </button>
                            </div>
                            {formErrors.resources && <div className="error-message">{formErrors.resources}</div>}
                        </div>
                        
                        {resources.length > 0 ? (
                            <div className="resources-list-container">
                                <ul className="items-list">
                                    {resources.map((resource, index) => (
                                        <li key={index} className="list-item resource-item">
                                            <div className="resource-info">
                                                <div className="resource-type">{resource.type}</div>
                                                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-url">
                                                    {resource.name || resource.url}
                                                </a>
                                            </div>
                                            <button 
                                                type="button" 
                                                className="remove-btn"
                                                onClick={() => handleRemoveResource(index)}
                                            >
                                                <X size={16} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                
                                {resources.length > 0 && (
                                    <div className="resources-count">
                                        {resources.length} resource{resources.length !== 1 ? 's' : ''} added
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <BookOpen size={24} />
                                <p>No resources added yet. Please add at least one resource.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="plan-card">
                    <div className="card-header">
                        <Award className="card-icon" />
                        <h3 className="card-title">Timeline and Difficulty</h3>
                    </div>
                    <div className="card-body">
                        <div className="date-inputs">
                            <div className="form-group">
                                <label htmlFor="startDate">
                                    <Calendar size={16} className="field-icon" />
                                    Start Date
                                </label>
                                <input 
                                    type="date" 
                                    id="startDate" 
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        if (formErrors.startDate) {
                                            const { startDate, ...rest } = formErrors;
                                            setFormErrors(rest);
                                        }
                                    }}
                                    className={formErrors.startDate ? "error" : ""}
                                    required
                                />
                                {formErrors.startDate && <div className="error-message">{formErrors.startDate}</div>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="targetCompletionDate">
                                    <Calendar size={16} className="field-icon" />
                                    Target Completion Date
                                </label>
                                <input 
                                    type="date" 
                                    id="targetCompletionDate" 
                                    value={targetCompletionDate}
                                    onChange={(e) => {
                                        setTargetCompletionDate(e.target.value);
                                        if (formErrors.targetCompletionDate) {
                                            const { targetCompletionDate, ...rest } = formErrors;
                                            setFormErrors(rest);
                                        }
                                    }}
                                    className={formErrors.targetCompletionDate ? "error" : ""}
                                    required
                                />
                                {formErrors.targetCompletionDate && 
                                    <div className="error-message">{formErrors.targetCompletionDate}</div>
                                }
                            </div>
                        </div>
                        
                        <div className="difficulty-inputs">
                            <div className="form-group">
                                <label htmlFor="estimatedTime">
                                    <Clock size={16} className="field-icon" />
                                    Estimated Time
                                </label>
                                <input 
                                    type="text" 
                                    id="estimatedTime" 
                                    value={estimatedTime}
                                    onChange={(e) => {
                                        setEstimatedTime(e.target.value);
                                        if (formErrors.estimatedTime) {
                                            const { estimatedTime, ...rest } = formErrors;
                                            setFormErrors(rest);
                                        }
                                    }}
                                    placeholder="e.g., 4 weeks"
                                    className={formErrors.estimatedTime ? "error" : ""}
                                    required
                                />
                                {formErrors.estimatedTime && 
                                    <div className="error-message">{formErrors.estimatedTime}</div>
                                }
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="difficultyLevel">Difficulty Level</label>
                                <div className="select-wrapper">
                                    <select 
                                        id="difficultyLevel"
                                        value={difficultyLevel}
                                        onChange={(e) => setDifficultyLevel(e.target.value)}
                                        required
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                    <div className="difficulty-preview">
                                        {renderDifficultyStars(difficultyLevel)}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select 
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="On Hold">On Hold</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button 
                        type="button" 
                        className="reset-btn" 
                        onClick={handleCancel}
                    >
                        <X size={16} />
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="submit-btn" 
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <div className="spinner"></div>
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save size={16} />
                                Update Learning Plan
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateLearningPlanComponent;