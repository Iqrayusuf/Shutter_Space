/*import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../Services/UserService';

const ViewLearningPlan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [learningPlan, setLearningPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLearningPlan();
    }, []);

    const fetchLearningPlan = () => {
        setLoading(true);
        getUserById(id)
            .then(response => {
                setLearningPlan(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching learning plan:', error);
                setError('Failed to load learning plan. Please try again.');
                setLoading(false);
            });
    };

    // Function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        return new Date(dateString).toLocaleDateString();
    };

    // Function to get status badge class
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-success';
            case 'In Progress':
                return 'bg-primary';
            case 'On Hold':
                return 'bg-warning text-dark';
            case 'Not Started':
            default:
                return 'bg-secondary';
        }
    };

    // Navigate back to the list
    const goBack = () => {
        navigate('/users');
    };

    // Navigate to edit page
    const editLearningPlan = () => {
        navigate(`/edit-learning-plan/${id}`);
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">{error}</div>
                <button className="btn btn-primary" onClick={goBack}>Back to List</button>
            </div>
        );
    }

    if (!learningPlan) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">Learning plan not found.</div>
                <button className="btn btn-primary" onClick={goBack}>Back to List</button>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">{learningPlan.title}</h3>
                    <div>
                        <span className={`badge ${getStatusBadgeClass(learningPlan.status)} me-2`}>
                            {learningPlan.status}
                        </span>
                        <span className="badge bg-info">{learningPlan.difficultyLevel}</span>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <h5>Description</h5>
                            <p>{learningPlan.description}</p>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h5 className="mb-0">Topics Covered</h5>
                                </div>
                                <div className="card-body">
                                    {learningPlan.topicsCovered && learningPlan.topicsCovered.length > 0 ? (
                                        <ul className="list-group list-group-flush">
                                            {learningPlan.topicsCovered.map((topic, index) => (
                                                <li key={index} className="list-group-item">
                                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                    {topic}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted">No topics listed.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h5 className="mb-0">Resources</h5>
                                </div>
                                <div className="card-body">
                                    {learningPlan.resources && learningPlan.resources.length > 0 ? (
                                        <ul className="list-group list-group-flush">
                                            {learningPlan.resources.map((resource, index) => (
                                                <li key={index} className="list-group-item">
                                                    <strong>{resource.type}: </strong>
                                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                                        {resource.url}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted">No resources listed.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">Timeline and Details</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <h6>Start Date</h6>
                                            <p>{formatDate(learningPlan.startDate)}</p>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <h6>Target Completion</h6>
                                            <p>{formatDate(learningPlan.targetCompletionDate)}</p>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <h6>Estimated Time</h6>
                                            <p>{learningPlan.estimatedTime}</p>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <h6>Difficulty Level</h6>
                                            <p>{learningPlan.difficultyLevel}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-secondary" onClick={goBack}>
                            <i className="bi bi-arrow-left me-1"></i> Back to List
                        </button>
                        <button className="btn btn-warning" onClick={editLearningPlan}>
                            <i className="bi bi-pencil me-1"></i> Edit Learning Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewLearningPlan;*/

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../Services/UserService';

const ViewLearningPlan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [learningPlan, setLearningPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLearningPlan();
    }, []);

    const fetchLearningPlan = () => {
        setLoading(true);
        getUserById(id)
            .then(response => {
                setLearningPlan(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching learning plan:', error);
                setError('Failed to load learning plan. Please try again.');
                setLoading(false);
            });
    };

    // Function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        return new Date(dateString).toLocaleDateString();
    };

    // Function to get status badge class
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-success';
            case 'In Progress':
                return 'bg-primary';
            case 'On Hold':
                return 'bg-warning text-dark';
            case 'Not Started':
            default:
                return 'bg-secondary';
        }
    };

    // Navigate back to the list
    const goBack = () => {
        navigate('/users');
    };

    // Navigate to edit page
    const editLearningPlan = () => {
        navigate(`/edit-learning-plan/${id}`);
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">{error}</div>
                <button className="btn btn-primary" onClick={goBack}>Back to List</button>
            </div>
        );
    }

    if (!learningPlan) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">Learning plan not found.</div>
                <button className="btn btn-primary" onClick={goBack}>Back to List</button>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">{learningPlan.title}</h3>
                    <div>
                        <span className={`badge ${getStatusBadgeClass(learningPlan.status)} me-2`}>
                            {learningPlan.status}
                        </span>
                        <span className="badge bg-info">{learningPlan.difficultyLevel}</span>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <h5>Description</h5>
                            <p>{learningPlan.description}</p>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h5 className="mb-0">Topics Covered</h5>
                                </div>
                                <div className="card-body">
                                    {learningPlan.topicsCovered && learningPlan.topicsCovered.length > 0 ? (
                                        <ul className="list-group list-group-flush">
                                            {learningPlan.topicsCovered.map((topic, index) => (
                                                <li key={index} className="list-group-item">
                                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                    {topic}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted">No topics listed.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <h5 className="mb-0">Resources</h5>
                                </div>
                                <div className="card-body">
                                    {learningPlan.resources && learningPlan.resources.length > 0 ? (
                                        <ul className="list-group list-group-flush">
                                            {learningPlan.resources.map((resource, index) => (
                                                <li key={index} className="list-group-item">
                                                    <strong>{resource.type}: </strong>
                                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                                        {resource.url}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted">No resources listed.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">Timeline and Details</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <h6>Start Date</h6>
                                            <p>{formatDate(learningPlan.startDate)}</p>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <h6>Target Completion</h6>
                                            <p>{formatDate(learningPlan.targetCompletionDate)}</p>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <h6>Estimated Time</h6>
                                            <p>{learningPlan.estimatedTime}</p>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <h6>Difficulty Level</h6>
                                            <p>{learningPlan.difficultyLevel}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-secondary" onClick={goBack}>
                            <i className="bi bi-arrow-left me-1"></i> Back to List
                        </button>
                        <button className="btn btn-warning" onClick={editLearningPlan}>
                            <i className="bi bi-pencil me-1"></i> Edit Learning Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewLearningPlan;