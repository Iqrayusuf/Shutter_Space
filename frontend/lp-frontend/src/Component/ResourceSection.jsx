import React, { useState, useRef } from 'react';
import { Plus, Upload, BookOpen, FileText, Film } from 'lucide-react';
import axios from 'axios';
import './ResourceSection.css';

const ResourceSection = ({ resources, setResources }) => {
  const [newResourceType, setNewResourceType] = useState("");
  const [newResourceUrl, setNewResourceUrl] = useState("");
  const [uploadMode, setUploadMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Handle URL resource addition
  const handleAddUrlResource = () => {
    if (newResourceType.trim() !== "" && newResourceUrl.trim() !== "") {
      setResources([...resources, { 
        type: newResourceType, 
        url: newResourceUrl 
      }]);
      setNewResourceType("");
      setNewResourceUrl("");
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile || !newResourceType.trim()) return;

    try {
      setUploading(true);
      setUploadProgress(0);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      // Upload file to server
      const response = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      // Add the uploaded file as a resource
      setResources([...resources, {
        type: newResourceType,
        url: response.data.fileUrl,
        name: selectedFile.name
      }]);
      
      // Reset form
      setNewResourceType("");
      setSelectedFile(null);
      setUploadMode(false);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Toggle between URL and File upload modes
  const toggleUploadMode = () => {
    setUploadMode(!uploadMode);
    setNewResourceType("");
    setNewResourceUrl("");
    setSelectedFile(null);
  };

  // Resource type icon selection
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

  // Handle remove resource
  const handleRemoveResource = (index) => {
    const updatedResources = [...resources];
    updatedResources.splice(index, 1);
    setResources(updatedResources);
  };

  return (
    <div className="resource-section">
      <div className="resource-header">
        <BookOpen className="section-icon" />
        <h3 className="section-title">Learning Resources</h3>
      </div>
      
      <div className="resource-content">
        <div className="resource-input-toggle">
          <button 
            className={`toggle-btn ${!uploadMode ? 'active' : ''}`} 
            onClick={() => setUploadMode(false)}
          >
            Add URL
          </button>
          <button 
            className={`toggle-btn ${uploadMode ? 'active' : ''}`} 
            onClick={() => setUploadMode(true)}
          >
            Upload File
          </button>
        </div>
        
        {uploadMode ? (
          // File Upload Mode
          <div className="file-upload-container">
            <div className="resource-type-field">
              <input 
                type="text" 
                placeholder="Resource Type (e.g., Video, PDF)" 
                value={newResourceType}
                onChange={(e) => setNewResourceType(e.target.value)}
                className="resource-type-input"
              />
            </div>
            
            <div className="file-selection">
              <input
                type="file"
                accept="application/pdf,video/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                id="file-input"
                className="hidden-file-input"
              />
              <div className="file-input-wrapper">
                <button 
                  type="button" 
                  className="file-select-btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Upload size={16} />
                  Select File
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
                className="add-resource-btn" 
                onClick={handleFileUpload}
                disabled={!selectedFile || !newResourceType.trim()}
              >
                <Plus size={16} />
                Upload & Add
              </button>
            )}
          </div>
        ) : (
          // URL Input Mode
          <div className="url-input-container">
            <div className="resource-type-field">
              <input 
                type="text" 
                placeholder="Resource Type (e.g., Video, Book)" 
                value={newResourceType}
                onChange={(e) => setNewResourceType(e.target.value)}
                className="resource-type-input"
              />
            </div>
            
            <div className="resource-url-field">
              <input 
                type="url" 
                placeholder="Resource URL" 
                value={newResourceUrl}
                onChange={(e) => setNewResourceUrl(e.target.value)}
                className="resource-url-input"
              />
            </div>
            
            <button 
              className="add-resource-btn" 
              onClick={handleAddUrlResource}
              disabled={!newResourceType.trim() || !newResourceUrl.trim()}
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        )}
        
        {/* Resource List */}
        {resources.length > 0 ? (
          <ul className="resources-list">
            {resources.map((resource, index) => (
              <li key={index} className="resource-item">
                <div className="resource-item-icon">
                  {getResourceIcon(resource.type)}
                </div>
                <div className="resource-details">
                  <div className="resource-type">{resource.type}</div>
                  <div className="resource-link">
                    {resource.name || resource.url}
                  </div>
                </div>
                <button 
                  className="remove-resource-btn" 
                  onClick={() => handleRemoveResource(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-resources">
            <BookOpen size={24} className="empty-icon" />
            <p>No resources added yet. Please add at least one resource.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceSection;