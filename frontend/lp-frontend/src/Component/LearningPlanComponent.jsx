
/*import React, { useState, useEffect } from 'react'
import './UserComponent.css'
import axios from 'axios'

export const UserComponent = () => {
    // State variables for all fields
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [topicsCovered, setTopicsCovered] = useState([])
    const [newTopic, setNewTopic] = useState("")
    const [resources, setResources] = useState([])
    const [newResourceType, setNewResourceType] = useState("")
    const [newResourceUrl, setNewResourceUrl] = useState("")
    const [startDate, setStartDate] = useState("")
    const [targetCompletionDate, setTargetCompletionDate] = useState("")
    const [estimatedTime, setEstimatedTime] = useState("")
    const [difficultyLevel, setDifficultyLevel] = useState("Beginner")
    const [status, setStatus] = useState("Not Started")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    // Clear success message after 10 seconds
    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 10000); // 10 seconds
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [successMessage]);

    // Function to handle adding a new topic
    const handleAddTopic = (e) => {
        e.preventDefault()
        if (newTopic.trim() !== "") {
            setTopicsCovered([...topicsCovered, newTopic])
            setNewTopic("")
        }
    }

    // Function to handle removing a topic
    const handleRemoveTopic = (index) => {
        const updatedTopics = [...topicsCovered]
        updatedTopics.splice(index, 1)
        setTopicsCovered(updatedTopics)
    }

    // Function to handle adding a new resource
    const handleAddResource = (e) => {
        e.preventDefault()
        if (newResourceType.trim() !== "" && newResourceUrl.trim() !== "") {
            setResources([...resources, { 
                type: newResourceType, 
                url: newResourceUrl 
            }])
            setNewResourceType("")
            setNewResourceUrl("")
        }
    }

    // Function to handle removing a resource
    const handleRemoveResource = (index) => {
        const updatedResources = [...resources]
        updatedResources.splice(index, 1)
        setResources(updatedResources)
    }

    // Function to save learning plan to the database
    const saveLearningplan = async (e) => {
        e.preventDefault()
        
        try {
            setLoading(true)
            setError(null)
            setSuccessMessage(null)
            
            // Format resources properly
            const formattedResources = resources.map(resource => ({
                type: resource.type,
                url: resource.url
            }))
            
            // Create the learning plan object to match UserDto in backend
            const learningPlan = {
                title,
                description,
                topicsCovered: topicsCovered,
                resources: formattedResources,
                startDate,
                targetCompletionDate,
                estimatedTime,
                difficultyLevel,
                status
            }
            
            // Make API call to your backend endpoint
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            
            const response = await axios.post('http://localhost:8080/api/users', learningPlan, config)
            
            setSuccessMessage('Learning plan saved successfully!')
            resetForm()
            
        } catch (err) {
            console.error('Error saving learning plan:', err)
            setError(err.response?.data?.message || 'Failed to save learning plan. Please try again.')
        } finally {
            setLoading(false)
        }
    }
    
    // Function to reset the form
    const resetForm = () => {
        setTitle("")
        setDescription("")
        setTopicsCovered([])
        setResources([])
        setStartDate("")
        setTargetCompletionDate("")
        setEstimatedTime("")
        setDifficultyLevel("Beginner")
        setStatus("Not Started")
        setError(null)
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Create Learning Plan</h2>
            
            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> {successMessage}
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setSuccessMessage(null)}
                        aria-label="Close"
                    ></button>
                </div>
            )}
            
        
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> {error}
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setError(null)}
                        aria-label="Close"
                    ></button>
                </div>
            )}
            
            <form onSubmit={saveLearningplan}>
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Basic Information</h5>
                        
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="title" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea 
                                className="form-control" 
                                id="description" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="3"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Topics Covered</h5>
                        
                        <div className="mb-3">
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Add a new topic" 
                                    value={newTopic}
                                    onChange={(e) => setNewTopic(e.target.value)}
                                />
                                <button 
                                    className="btn btn-outline-secondary" 
                                    type="button"
                                    onClick={handleAddTopic}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                        
                        {topicsCovered.length > 0 ? (
                            <ul className="list-group">
                                {topicsCovered.map((topic, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        {topic}
                                        <button 
                                            type="button" 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleRemoveTopic(index)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="alert alert-warning">
                                No topics added yet. Please add at least one topic.
                            </div>
                        )}
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Resources</h5>
                        
                        <div className="mb-3">
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Resource Type (e.g., PDF, Video)" 
                                        value={newResourceType}
                                        onChange={(e) => setNewResourceType(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input 
                                        type="url" 
                                        className="form-control" 
                                        placeholder="Resource URL (e.g., https://example.com)" 
                                        value={newResourceUrl}
                                        onChange={(e) => setNewResourceUrl(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <button 
                                        className="btn btn-outline-secondary w-100" 
                                        type="button"
                                        onClick={handleAddResource}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {resources.length > 0 ? (
                            <ul className="list-group">
                                {resources.map((resource, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>{resource.type}:</strong>{' '}
                                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                                {resource.url}
                                            </a>
                                        </div>
                                        <button 
                                            type="button" 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleRemoveResource(index)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="alert alert-warning">
                                No resources added yet. Please add at least one resource.
                            </div>
                        )}
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Timeline and Difficulty</h5>
                        
                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <label htmlFor="startDate" className="form-label">Start Date</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="startDate" 
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="col-md-6">
                                <label htmlFor="targetCompletionDate" className="form-label">Target Completion Date</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="targetCompletionDate" 
                                    value={targetCompletionDate}
                                    onChange={(e) => setTargetCompletionDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label htmlFor="estimatedTime" className="form-label">Estimated Time</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="estimatedTime" 
                                    value={estimatedTime}
                                    onChange={(e) => setEstimatedTime(e.target.value)}
                                    placeholder="e.g., 4 weeks"
                                    required
                                />
                            </div>
                            
                            <div className="col-md-4">
                                <label htmlFor="difficultyLevel" className="form-label">Difficulty Level</label>
                                <select 
                                    className="form-select" 
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
                            </div>
                            
                            <div className="col-md-4">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select 
                                    className="form-select" 
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

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
                    <button 
                        type="button" 
                        className="btn btn-secondary me-md-2" 
                        onClick={resetForm}
                    >
                        Reset
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        disabled={loading || topicsCovered.length === 0 || resources.length === 0}
                    >
                        {loading ? 'Saving...' : 'Save Learning Plan'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserComponent*/


/*
import React, { useState, useEffect } from 'react';
import { BookOpen, Award, Plus, X, Save, RefreshCw } from 'lucide-react';
import axios from 'axios';
import './LearningPlanComponent.css';

const LearningPlanComponent = () => {
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Clear success message after 10 seconds
    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 10000); // 10 seconds
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [successMessage]);

    // Function to handle adding a new topic
    const handleAddTopic = (e) => {
        e.preventDefault();
        if (newTopic.trim() !== "") {
            setTopicsCovered([...topicsCovered, newTopic]);
            setNewTopic("");
        }
    }

    // Function to handle removing a topic
    const handleRemoveTopic = (index) => {
        const updatedTopics = [...topicsCovered];
        updatedTopics.splice(index, 1);
        setTopicsCovered(updatedTopics);
    }

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
        }
    }

    // Function to handle removing a resource
    const handleRemoveResource = (index) => {
        const updatedResources = [...resources];
        updatedResources.splice(index, 1);
        setResources(updatedResources);
    }

    // Function to save learning plan to the database
    const saveLearningplan = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            setError(null);
            setSuccessMessage(null);
            
            // Format resources properly
            const formattedResources = resources.map(resource => ({
                type: resource.type,
                url: resource.url
            }));
            
            // Create the learning plan object to match UserDto in backend
            const learningPlan = {
                title,
                description,
                topicsCovered: topicsCovered,
                resources: formattedResources,
                startDate,
                targetCompletionDate,
                estimatedTime,
                difficultyLevel,
                status
            };
            
            // Make API call to your backend endpoint
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            
            const response = await axios.post('http://localhost:8080/api/users', learningPlan, config);
            
            setSuccessMessage('Learning plan saved successfully!');
            resetForm();
            
        } catch (err) {
            console.error('Error saving learning plan:', err);
            setError(err.response?.data?.message || 'Failed to save learning plan. Please try again.');
        } finally {
            setLoading(false);
        }
    }
    
    // Function to reset the form
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setTopicsCovered([]);
        setResources([]);
        setStartDate("");
        setTargetCompletionDate("");
        setEstimatedTime("");
        setDifficultyLevel("Beginner");
        setStatus("Not Started");
        setError(null);
    }

    return (
        <div className="learning-plan-container">
            <div className="plan-header">
                <h2 className="plan-title">Create Learning Plan</h2>
                <p className="plan-subtitle">Track your photography learning journey</p>
            </div>
            
            
            {successMessage && (
                <div className="alert success-alert">
                    <div className="alert-content">
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
            
            
            {error && (
                <div className="alert error-alert">
                    <div className="alert-content">
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
            
            <form onSubmit={saveLearningplan}>
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
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a title for your learning plan"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                id="description" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe what you want to learn and why"
                                rows="3"
                                required
                            />
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
                        </div>
                        
                        {topicsCovered.length > 0 ? (
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
                        ) : (
                            <div className="empty-state">
                                No topics added yet. Please add at least one topic.
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
                                    />
                                </div>
                                <div className="resource-url-input">
                                    <input 
                                        type="url" 
                                        placeholder="Resource URL" 
                                        value={newResourceUrl}
                                        onChange={(e) => setNewResourceUrl(e.target.value)}
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
                        </div>
                        
                        {resources.length > 0 ? (
                            <ul className="items-list">
                                {resources.map((resource, index) => (
                                    <li key={index} className="list-item">
                                        <div className="resource-info">
                                            <strong>{resource.type}:</strong>{' '}
                                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                                {resource.url}
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
                        ) : (
                            <div className="empty-state">
                                No resources added yet. Please add at least one resource.
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
                                <label htmlFor="startDate">Start Date</label>
                                <input 
                                    type="date" 
                                    id="startDate" 
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="targetCompletionDate">Target Completion Date</label>
                                <input 
                                    type="date" 
                                    id="targetCompletionDate" 
                                    value={targetCompletionDate}
                                    onChange={(e) => setTargetCompletionDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="difficulty-inputs">
                            <div className="form-group">
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input 
                                    type="text" 
                                    id="estimatedTime" 
                                    value={estimatedTime}
                                    onChange={(e) => setEstimatedTime(e.target.value)}
                                    placeholder="e.g., 4 weeks"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="difficultyLevel">Difficulty Level</label>
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
                        onClick={resetForm}
                    >
                        <RefreshCw size={16} />
                        Reset
                    </button>
                    <button 
                        type="submit" 
                        className="submit-btn" 
                        disabled={loading || topicsCovered.length === 0 || resources.length === 0}
                    >
                        <Save size={16} />
                        {loading ? 'Saving...' : 'Save Learning Plan'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LearningPlanComponent;
*/







/*import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Award, Plus, X, Save, RefreshCw, Camera, Calendar, Clock, Upload, Star, Edit, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import './LearningPlanComponent.css';

const LearningPlanComponent = () => {
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [showFormTips, setShowFormTips] = useState(false);
    const [saving, setSaving] = useState(false);
    const [progress, setProgress] = useState(0);
    
    // Refs for focus management
    const titleRef = useRef(null);
    const topicInputRef = useRef(null);
    const resourceTypeInputRef = useRef(null);

    // Calculate form completion progress
    useEffect(() => {
        const requiredFields = [title, description, startDate, targetCompletionDate, estimatedTime];
        const completedFields = requiredFields.filter(field => field).length;
        const additionalPoints = (topicsCovered.length > 0 ? 1 : 0) + (resources.length > 0 ? 1 : 0);
        const totalFields = requiredFields.length + 2; // +2 for topics and resources
        
        const calculatedProgress = Math.floor(((completedFields + additionalPoints) / totalFields) * 100);
        setProgress(calculatedProgress);
    }, [title, description, topicsCovered, resources, startDate, targetCompletionDate, estimatedTime]);

    // Clear success message after 10 seconds
    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 10000); // 10 seconds
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [successMessage]);
    
    // Focus on title input when component mounts
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.focus();
        }
    }, []);

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

    // Function to save learning plan to the database
    const saveLearningplan = async (e) => {
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
            setLoading(true);
            setSaving(true);
            setError(null);
            setSuccessMessage(null);
            
            // Simulate progress for better UX (in a real app, this would track actual upload progress)
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 300);
            
            // Format resources properly
            const formattedResources = resources.map(resource => ({
                type: resource.type,
                url: resource.url
            }));
            
            // Create FormData for image upload (if needed)
            const formData = new FormData();
            if (image) {
                formData.append('image', image);
            }
            
            // Create the learning plan object to match UserDto in backend
            const learningPlan = {
                title,
                description,
                topicsCovered: topicsCovered,
                resources: formattedResources,
                startDate,
                targetCompletionDate,
                estimatedTime,
                difficultyLevel,
                status,
                imageUrl: imagePreview // In a real app, you'd upload the image and get a URL back
            };
            
            // Add the learning plan data to FormData or send as JSON
            formData.append('learningPlanData', JSON.stringify(learningPlan));
            
            // Make API call to your backend endpoint
            const config = {
                headers: {
                    'Content-Type': image ? 'multipart/form-data' : 'application/json',
                }
            };
            
            // Simulating a successful API call for demo purposes
            // In a real app, you'd use:
            // const response = await axios.post('http://localhost:8080/api/users', formData, config);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            clearInterval(progressInterval);
            setProgress(100);
            
            // Wait a bit to show 100% completion
            setTimeout(() => {
                setSuccessMessage('Learning plan saved successfully!');
                setSaving(false);
                resetForm();
            }, 500);
            
        } catch (err) {
            console.error('Error saving learning plan:', err);
            setError(err.response?.data?.message || 'Failed to save learning plan. Please try again.');
            setSaving(false);
        } finally {
            setLoading(false);
        }
    };
    
    // Function to reset the form
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setTopicsCovered([]);
        setResources([]);
        setStartDate("");
        setTargetCompletionDate("");
        setEstimatedTime("");
        setDifficultyLevel("Beginner");
        setStatus("Not Started");
        setError(null);
        setFormErrors({});
        setImage(null);
        setImagePreview(null);
        setProgress(0);
        
        // Focus back on title
        if (titleRef.current) {
            titleRef.current.focus();
        }
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

    return (
        <div className="learning-plan-container">
            <div className="plan-header">
                <h2 className="plan-title">Create Learning Plan</h2>
                <p className="plan-subtitle">Track your photography learning journey</p>
                
                
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="progress-text">{progress}% complete</span>
                </div>
                
                <button 
                    className={`form-tips-toggle ${showFormTips ? 'active' : ''}`}
                    onClick={() => setShowFormTips(!showFormTips)}
                >
                    {showFormTips ? 'Hide Tips' : 'Show Tips'}
                </button>
            </div>
            
            {showFormTips && (
                <div className="form-tips">
                    <h3>Tips for creating a great learning plan:</h3>
                    <ul>
                        <li>Be specific about what you want to learn</li>
                        <li>Break down complex topics into smaller parts</li>
                        <li>Include a variety of resource types (videos, books, articles)</li>
                        <li>Set realistic timeframes for completion</li>
                        <li>Consider adding an image that represents your learning goal</li>
                    </ul>
                </div>
            )}
            
            
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
            
            <form onSubmit={saveLearningplan}>
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
                                            <Trash2 size={16} />
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
                                                    {resource.url}
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
                        onClick={resetForm}
                        disabled={loading || saving}
                    >
                        <RefreshCw size={16} />
                        Reset
                    </button>
                    <button 
                        type="submit" 
                        className={`submit-btn ${saving ? 'saving' : ''}`}
                        disabled={loading || saving || topicsCovered.length === 0 || resources.length === 0}
                    >
                        {saving ? (
                            <>
                                <div className="spinner"></div>
                                Saving... {progress}%
                            </>
                        ) : (
                            <>
                                <Save size={16} />
                                Save Learning Plan
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LearningPlanComponent;

*/






/*
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Award, Plus, X, Save, RefreshCw, Camera, Calendar, Clock, Upload, Star, Edit, Trash2, CheckCircle, AlertTriangle, Eye, FileText, Film } from 'lucide-react';
import axios from 'axios';
import './LearningPlanComponent.css';

const LearningPlanComponent = () => {
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [showFormTips, setShowFormTips] = useState(false);
    const [saving, setSaving] = useState(false);
    const [progress, setProgress] = useState(0);
    
    // New state variables for file upload
    const [uploadMode, setUploadMode] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const fileInputRef = useRef(null);
    
    // Refs for focus management
    const titleRef = useRef(null);
    const topicInputRef = useRef(null);
    const resourceTypeInputRef = useRef(null);

    // Calculate form completion progress
    useEffect(() => {
        const requiredFields = [title, description, startDate, targetCompletionDate, estimatedTime];
        const completedFields = requiredFields.filter(field => field).length;
        const additionalPoints = (topicsCovered.length > 0 ? 1 : 0) + (resources.length > 0 ? 1 : 0);
        const totalFields = requiredFields.length + 2; // +2 for topics and resources
        
        const calculatedProgress = Math.floor(((completedFields + additionalPoints) / totalFields) * 100);
        setProgress(calculatedProgress);
    }, [title, description, topicsCovered, resources, startDate, targetCompletionDate, estimatedTime]);

    // Clear success message after 10 seconds
    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 10000); // 10 seconds
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [successMessage]);
    
    // Focus on title input when component mounts
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.focus();
        }
    }, []);

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

    // Function to handle adding a new resource from URL
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

    // Function to handle file selection for upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setUploadError(null);
    };

    // Function to handle file upload
    const handleFileUpload = async () => {
        if (!selectedFile || !newResourceType.trim()) {
            setUploadError("Please select a file and enter a resource type");
            return;
        }
        
        // Validate file type
        const isValidFileType = 
            selectedFile.type.startsWith('application/pdf') || 
            selectedFile.type.startsWith('video/');
            
        if (!isValidFileType) {
            setUploadError("Please select a PDF or video file");
            return;
        }
        
        try {
            setUploading(true);
            setUploadProgress(0);
            setUploadError(null);
            
            // Create form data
            const formData = new FormData();
            formData.append('file', selectedFile);
            
            // Set up progress tracking
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 300);

            
            // For this example, we'll simulate a successful upload
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simulate a response with a URL to the uploaded file
            const mockFileUrl = `http://localhost:8080/api/files/${selectedFile.name.replace(/\s+/g, '_')}`;
            
            // Add the uploaded file as a resource
            setResources([...resources, {
                type: newResourceType,
                url: mockFileUrl,
                name: selectedFile.name
            }]);
            
            // Reset form
            setNewResourceType("");
            setSelectedFile(null);
            setUploadProgress(100);
            
            // Clear any resource errors
            if (formErrors.resources) {
                const { resources, ...rest } = formErrors;
                setFormErrors(rest);
            }
            
            // Reset upload progress after showing 100%
            setTimeout(() => {
                setUploadProgress(0);
                setUploading(false);
            }, 500);
            
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadError('Failed to upload file. Please try again.');
            setUploading(false);
        }
    };

    // Function to save learning plan to the database
    const saveLearningplan = async (e) => {
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
            setLoading(true);
            setSaving(true);
            setError(null);
            setSuccessMessage(null);
            
            // Simulate progress for better UX (in a real app, this would track actual upload progress)
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 300);
            
            // Format resources properly
            const formattedResources = resources.map(resource => ({
                type: resource.type,
                url: resource.url,
                name: resource.name || null
            }));
            
            // Create FormData for image upload (if needed)
            const formData = new FormData();
            if (image) {
                formData.append('image', image);
            }
            
            // Create the learning plan object to match UserDto in backend
            const learningPlan = {
                title,
                description,
                topicsCovered: topicsCovered,
                resources: formattedResources,
                startDate,
                targetCompletionDate,
                estimatedTime,
                difficultyLevel,
                status,
                imageUrl: imagePreview // In a real app, you'd upload the image and get a URL back
            };
            
            // Add the learning plan data to FormData or send as JSON
            formData.append('learningPlanData', JSON.stringify(learningPlan));
            
            // Make API call to your backend endpoint
            const config = {
                headers: {
                    'Content-Type': image ? 'multipart/form-data' : 'application/json',
                }
            };
            
            // Simulating a successful API call for demo purposes
            // In a real app, you'd use:
            // const response = await axios.post('http://localhost:8080/api/users', formData, config);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            clearInterval(progressInterval);
            setProgress(100);
            
            // Wait a bit to show 100% completion
            setTimeout(() => {
                setSuccessMessage('Learning plan saved successfully!');
                setSaving(false);
                resetForm();
            }, 500);
            
        } catch (err) {
            console.error('Error saving learning plan:', err);
            setError(err.response?.data?.message || 'Failed to save learning plan. Please try again.');
            setSaving(false);
        } finally {
            setLoading(false);
        }
    };
    
    // Function to reset the form
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setTopicsCovered([]);
        setResources([]);
        setStartDate("");
        setTargetCompletionDate("");
        setEstimatedTime("");
        setDifficultyLevel("Beginner");
        setStatus("Not Started");
        setError(null);
        setFormErrors({});
        setImage(null);
        setImagePreview(null);
        setProgress(0);
        setUploadMode(false);
        setSelectedFile(null);
        setUploadError(null);
        
        // Focus back on title
        if (titleRef.current) {
            titleRef.current.focus();
        }
    };

    // Get resource type icon
    const getResourceIcon = (type) => {
        const lowercaseType = type.toLowerCase();
        if (lowercaseType.includes('pdf') || lowercaseType.includes('document')) {
            return <FileText size={16} />;
        } else if (lowercaseType.includes('video') || lowercaseType.includes('movie')) {
            return <Film size={16} />;
        } else {
            return <BookOpen size={16} />;
        }
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

    return (
        <div className="learning-plan-container">
            <div className="plan-header">
                <h2 className="plan-title">Create Learning Plan</h2>
                <p className="plan-subtitle">Track your photography learning journey</p>
                
                
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="progress-text">{progress}% complete</span>
                </div>
                
                <button 
                    className={`form-tips-toggle ${showFormTips ? 'active' : ''}`}
                    onClick={() => setShowFormTips(!showFormTips)}
                >
                    {showFormTips ? 'Hide Tips' : 'Show Tips'}
                </button>
            </div>
            
            {showFormTips && (
                <div className="form-tips">
                    <h3>Tips for creating a great learning plan:</h3>
                    <ul>
                        <li>Be specific about what you want to learn</li>
                        <li>Break down complex topics into smaller parts</li>
                        <li>Include a variety of resource types (videos, books, articles)</li>
                        <li>Set realistic timeframes for completion</li>
                        <li>Consider adding an image that represents your learning goal</li>
                    </ul>
                </div>
            )}
            
            
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
            
            <form onSubmit={saveLearningplan}>
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
                                            <Trash2 size={16} />
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
                        
                        <div className="resource-input-toggle">
                            <button 
                                type="button"
                                className={`toggle-btn ${!uploadMode ? 'active' : ''}`} 
                                onClick={() => setUploadMode(false)}
                            >
                                Add URL
                            </button>
                            <button 
                                type="button"
                                className={`toggle-btn ${uploadMode ? 'active' : ''}`} 
                                onClick={() => setUploadMode(true)}
                            >
                                Upload File
                            </button>
                        </div>

                        {uploadMode ? (
                            // File Upload Mode
                            <div className="form-group">
                                <div className="file-upload-container">
                                    <div className="resource-type-field">
                                        <input 
                                            type="text" 
                                            placeholder="Resource Type (e.g., PDF, Video)" 
                                            value={newResourceType}
                                            onChange={(e) => setNewResourceType(e.target.value)}
                                            className={formErrors.resources ? "error" : ""}
                                        />
                                    </div>
                                    
                                    <div className="file-selection">
                                        <input
                                            type="file"
                                            accept="application/pdf,video/*"
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                            id="resource-file"
                                            className="hidden-file-input"
                                        />
                                        <div className="file-input-wrapper">
                                            <button 
                                                type="button" 
                                                className="file-select-btn"
                                                onClick={() => fileInputRef.current.click()}
                                            >
                                                <Upload size={16} />
                                                {selectedFile ? 'Change File' : 'Select File'}
                                            </button>
                                            <div className="selected-file">
                                                {selectedFile ? selectedFile.name : 'No file selected'}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {uploading ? (
                                        <div className="upload-progress">
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill" 
                                                    style={{ width: `${uploadProgress}%` }}
                                                ></div>
                                            </div>
                                            <span className="progress-text">{uploadProgress}%</span>
                                        </div>
                                    ) : (
                                        <button 
                                            className="add-btn" 
                                            type="button"
                                            onClick={handleFileUpload}
                                            disabled={!selectedFile || !newResourceType.trim()}
                                        >
                                            <Plus size={18} />
                                            Upload & Add
                                        </button>
                                    )}
                                    
                                    {uploadError && (
                                        <div className="error-message">
                                            {uploadError}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            // URL Input Mode
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
                        )}
                        
                        {resources.length > 0 ? (
                            <div className="resources-list-container">
                                <ul className="items-list">
                                    {resources.map((resource, index) => (
                                        <li key={index} className="list-item resource-item">
                                            <div className="resource-item-icon">
                                                {getResourceIcon(resource.type)}
                                            </div>
                                            <div className="resource-info">
                                                <div className="resource-type">{resource.type}</div>
                                                {resource.name ? (
                                                    <div className="resource-name">{resource.name}</div>
                                                ) : (
                                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-url">
                                                        {resource.url}
                                                    </a>
                                                )}
                                            </div>
                                            <div className="resource-actions">
                                                <a 
                                                    href={resource.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="view-btn"
                                                >
                                                    <Eye size={16} />
                                                    View
                                                </a>
                                                <button 
                                                    type="button" 
                                                    className="remove-btn"
                                                    onClick={() => handleRemoveResource(index)}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
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
                            onClick={resetForm}
                            disabled={loading || saving}
                        >
                            <RefreshCw size={16} />
                            Reset
                        </button>
                        <button 
                            type="submit" 
                            className={`submit-btn ${saving ? 'saving' : ''}`}
                            disabled={loading || saving || topicsCovered.length === 0 || resources.length === 0}
                        >
                            {saving ? (
                                <>
                                    <div className="spinner"></div>
                                    Saving... {progress}%
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    Save Learning Plan
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        );
    };
    
    export default LearningPlanComponent;

*/


import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Award, Plus, X, Save, RefreshCw, Camera, Calendar, Clock, Upload, Star, Edit, Trash2, CheckCircle, AlertTriangle, Eye, FileText, Film } from 'lucide-react';
import axios from 'axios';
import './LearningPlanComponent.css';

// Create API utilities
const api = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// File upload specific instance
const uploadApi = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// API functions
const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return uploadApi.post('/upload', formData);
};

const saveLearningPlan = (learningPlanData) => {
  return api.post('/users', learningPlanData);
};

const LearningPlanComponent = () => {
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [showFormTips, setShowFormTips] = useState(false);
    const [saving, setSaving] = useState(false);
    const [progress, setProgress] = useState(0);
    
    // New state variables for file upload
    const [uploadMode, setUploadMode] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const fileInputRef = useRef(null);
    
    // Refs for focus management
    const titleRef = useRef(null);
    const topicInputRef = useRef(null);
    const resourceTypeInputRef = useRef(null);

    // Calculate form completion progress
    useEffect(() => {
        const requiredFields = [title, description, startDate, targetCompletionDate, estimatedTime];
        const completedFields = requiredFields.filter(field => field).length;
        const additionalPoints = (topicsCovered.length > 0 ? 1 : 0) + (resources.length > 0 ? 1 : 0);
        const totalFields = requiredFields.length + 2; // +2 for topics and resources
        
        const calculatedProgress = Math.floor(((completedFields + additionalPoints) / totalFields) * 100);
        setProgress(calculatedProgress);
    }, [title, description, topicsCovered, resources, startDate, targetCompletionDate, estimatedTime]);

    // Clear success message after 10 seconds
    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 10000); // 10 seconds
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [successMessage]);
    
    // Focus on title input when component mounts
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.focus();
        }
    }, []);

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

    // Function to handle adding a new resource from URL
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

    // Function to handle file selection for upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setUploadError(null);
    };

    // Function to handle file upload
    const handleFileUpload = async () => {
        if (!selectedFile || !newResourceType.trim()) {
            setUploadError("Please select a file and enter a resource type");
            return;
        }
        
        // Validate file type
        const isValidFileType = 
            selectedFile.type.startsWith('application/pdf') || 
            selectedFile.type.startsWith('video/');
            
        if (!isValidFileType) {
            setUploadError("Please select a PDF or video file");
            return;
        }
        
        try {
            setUploading(true);
            setUploadProgress(0);
            setUploadError(null);
            
            // Create form data
            const formData = new FormData();
            formData.append('file', selectedFile);
            
            // Upload file to server
            const response = await uploadApi.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });
            
            console.log('File upload response:', response.data);
            
            // Get the URL returned from the server
            const fileUrl = response.data.fileUrl;
            
            // Add the uploaded file as a resource
            setResources([...resources, {
                type: newResourceType,
                url: fileUrl,
                name: selectedFile.name
            }]);
            
            // Reset form
            setNewResourceType("");
            setSelectedFile(null);
            setUploadProgress(100);
            
            // Clear any resource errors
            if (formErrors.resources) {
                const { resources, ...rest } = formErrors;
                setFormErrors(rest);
            }
            
            // Reset upload progress after showing 100%
            setTimeout(() => {
                setUploadProgress(0);
                setUploading(false);
            }, 500);
            
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadError(error.response?.data?.error || 'Failed to upload file. Please try again.');
            setUploading(false);
        }
    };

    // Function to save learning plan to the database
    const saveLearningplan = async (e) => {
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
            setLoading(true);
            setSaving(true);
            setError(null);
            setSuccessMessage(null);
            
            // Simulate progress for better UX
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 300);
            
            let imageUrl = imagePreview;
            
            // If there's a new image to upload, upload it first
            if (image && !(typeof image === 'string')) {
                try {
                    const formData = new FormData();
                    formData.append('file', image);
                    
                    const response = await uploadApi.post('/upload', formData);
                    imageUrl = response.data.fileUrl;
                    console.log('Image uploaded with URL:', imageUrl);
                } catch (err) {
                    console.error('Error uploading image:', err);
                    clearInterval(progressInterval);
                    setError('Failed to upload cover image. Please try again.');
                    setSaving(false);
                    setLoading(false);
                    return;
                }
            }
            
            // Format resources properly
            const formattedResources = resources.map(resource => ({
                type: resource.type,
                url: resource.url,
                name: resource.name || null
            }));
            
            // Create the learning plan object
            const learningPlanData = {
                title,
                description,
                topicsCovered,
                resources: formattedResources,
                startDate,
                targetCompletionDate,
                estimatedTime,
                difficultyLevel,
                status,
                imageUrl
            };
            
            // Make API call to save learning plan
            const response = await api.post('/users', learningPlanData);
            
            clearInterval(progressInterval);
            setProgress(100);
            
            console.log('Learning plan saved successfully:', response.data);
            
            // Wait a bit to show 100% completion
            setTimeout(() => {
                setSuccessMessage('Learning plan saved successfully!');
                setSaving(false);
                resetForm();
            }, 500);
            
        } catch (err) {
            console.error('Error saving learning plan:', err);
            setError(err.response?.data?.message || 'Failed to save learning plan. Please try again.');
            setSaving(false);
        } finally {
            setLoading(false);
        }
    };
    
    // Function to reset the form
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setTopicsCovered([]);
        setResources([]);
        setStartDate("");
        setTargetCompletionDate("");
        setEstimatedTime("");
        setDifficultyLevel("Beginner");
        setStatus("Not Started");
        setError(null);
        setFormErrors({});
        setImage(null);
        setImagePreview(null);
        setProgress(0);
        setUploadMode(false);
        setSelectedFile(null);
        setUploadError(null);
        
        // Focus back on title
        if (titleRef.current) {
            titleRef.current.focus();
        }
    };

    // Get resource type icon
    const getResourceIcon = (type) => {
        const lowercaseType = type.toLowerCase();
        if (lowercaseType.includes('pdf') || lowercaseType.includes('document')) {
            return <FileText size={16} />;
        } else if (lowercaseType.includes('video') || lowercaseType.includes('movie')) {
            return <Film size={16} />;
        } else {
            return <BookOpen size={16} />;
        }
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

    return (
        <div className="learning-plan-container">
            <div className="plan-header">
                <h2 className="plan-title">Create Learning Plan</h2>
                <p className="plan-subtitle">Track your photography learning journey</p>
                
                {/* Progress bar */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="progress-text">{progress}% complete</span>
                </div>
                
                <button 
                    className={`form-tips-toggle ${showFormTips ? 'active' : ''}`}
                    onClick={() => setShowFormTips(!showFormTips)}
                >
                    {showFormTips ? 'Hide Tips' : 'Show Tips'}
                </button>
            </div>
            
            {showFormTips && (
                <div className="form-tips">
                    <h3>Tips for creating a great learning plan:</h3>
                    <ul>
                        <li>Be specific about what you want to learn</li>
                        <li>Break down complex topics into smaller parts</li>
                        <li>Include a variety of resource types (videos, books, articles)</li>
                        <li>Set realistic timeframes for completion</li>
                        <li>Consider adding an image that represents your learning goal</li>
                    </ul>
                </div>
            )}
            
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
            
            <form onSubmit={saveLearningplan}>
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
                                            <Trash2 size={16} />
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
                        {/* Toggle between URL and File upload */}
                        <div className="resource-input-toggle">
                            <button 
                                type="button"
                                className={`toggle-btn ${!uploadMode ? 'active' : ''}`} 
                                onClick={() => setUploadMode(false)}
                            >
                                Add URL
                            </button>
                            <button 
                                type="button"
                                className={`toggle-btn ${uploadMode ? 'active' : ''}`} 
                                onClick={() => setUploadMode(true)}
                            >
                                Upload File
                            </button>
                        </div>

                        {uploadMode ? (
                            // File Upload Mode
                            <div className="form-group">
                                <div className="file-upload-container">
                                    <div className="resource-type-field">
                                        <input 
                                            type="text" 
                                            placeholder="Resource Type (e.g., PDF, Video)" 
                                            value={newResourceType}
                                            onChange={(e) => setNewResourceType(e.target.value)}
                                            className={formErrors.resources ? "error" : ""}
                                        />
                                    </div>
                                    
                                    <div className="file-selection">
                                        <input
                                            type="file"
                                            accept="application/pdf,video/*"
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                            id="resource-file"
                                            className="hidden-file-input"
                                        />
                                        <div className="file-input-wrapper">
                                            <button 
                                                type="button" 
                                                className="file-select-btn"
                                                onClick={() => fileInputRef.current.click()}
                                            >
                                                <Upload size={16} />
                                                {selectedFile ? 'Change File' : 'Select File'}
                                            </button>
                                            <div className="selected-file">
                                                {selectedFile ? selectedFile.name : 'No file selected'}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {uploading ? (
                                        <div className="upload-progress">
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill" 
                                                    style={{ width: `${uploadProgress}%` }}
                                                ></div>
                                            </div>
                                            <span className="progress-text">{uploadProgress}%</span>
                                        </div>
                                    ) : (
                                        <button 
                                            className="add-btn" 
                                            type="button"
                                            onClick={handleFileUpload}
                                            disabled={!selectedFile || !newResourceType.trim()}
                                        >
                                            <Plus size={18} />
                                            Upload & Add
                                        </button>
                                    )}
                                    
                                    {uploadError && (
                                        <div className="error-message">
                                            {uploadError}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            // URL Input Mode
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
                        )}
                        
                        {resources.length > 0 ? (
                            <div className="resources-list-container">
                                <ul className="items-list">
                                    {resources.map((resource, index) => (
                                        <li key={index} className="list-item resource-item">
                                            <div className="resource-item-icon">
                                                {getResourceIcon(resource.type)}
                                            </div>
                                            <div className="resource-info">
                                                <div className="resource-type">{resource.type}</div>
                                                {resource.name ? (
                                                    <div className="resource-name">{resource.name}</div>
                                                ) : (
                                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-url">
                                                        {resource.url}
                                                    </a>
                                                )}
                                            </div>
                                            <div className="resource-actions">
                                                <a 
                                                    href={resource.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="view-btn"
                                                >
                                                    <Eye size={16} />
                                                    View
                                                </a>
                                                <button 
                                                    type="button" 
                                                    className="remove-btn"
                                                    onClick={() => handleRemoveResource(index)}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
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
                        onClick={resetForm}
                        disabled={loading || saving}
                    >
                        <RefreshCw size={16} />
                        Reset
                    </button>
                    <button 
                        type="submit" 
                        className={`submit-btn ${saving ? 'saving' : ''}`}
                        disabled={loading || saving || topicsCovered.length === 0 || resources.length === 0}
                    >
                        {saving ? (
                            <>
                                <div className="spinner"></div>
                                Saving... {progress}%
                            </>
                        ) : (
                            <>
                                <Save size={16} />
                                Save Learning Plan
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LearningPlanComponent;