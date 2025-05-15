// src/components/ResourceUploader.jsx
import React, { useState, useRef } from 'react';
import { Plus, Upload, Film, FileText, X } from 'lucide-react';
import axios from 'axios';
import { validateResourceFile } from '../utils/ResourceUtils';

const ResourceUploader = ({ onResourceAdded, onError }) => {
  const [resourceType, setResourceType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadError(null);
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile || !resourceType.trim()) {
      setUploadError("Please select a file and enter a resource type");
      return;
    }
    
    // Validate file
    const validation = validateResourceFile(selectedFile);
    if (!validation.valid) {
      setUploadError(validation.error);
      return;
    }
    
    try {
      setUploading(true);
      setUploadProgress(0);
      setUploadError(null);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      // Upload file to server - use proper API URL
      const response = await axios.post('http://localhost:8081/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      console.log('Upload response:', response.data);
      
      // Get the URL returned from the server
      const fileUrl = response.data.fileUrl;
      
      // Call the callback with the new resource
      onResourceAdded({
        type: resourceType,
        url: fileUrl,
        name: selectedFile.name
      });
      
      // Reset form
      setResourceType("");
      setSelectedFile(null);
      setUploadProgress(100);
      
      // Reset upload progress after showing 100%
      setTimeout(() => {
        setUploadProgress(0);
        setUploading(false);
      }, 500);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError(error.response?.data?.error || 'Failed to upload file. Please try again.');
      if (onError) {
        onError(error.response?.data?.error || 'Failed to upload file');
      }
      setUploading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <div className="resource-type-field">
        <input 
          type="text" 
          placeholder="Resource Type (e.g., Video, PDF)" 
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
          className="resource-type-input"
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
            {selectedFile ? (
              <div className="resource-item-icon">
                {selectedFile.type.startsWith('application/pdf') ? (
                  <FileText size={16} />
                ) : (
                  <Film size={16} />
                )}
                {selectedFile.name}
              </div>
            ) : (
              'No file selected'
            )}
          </div>
        </div>
      </div>
      
      {uploading ? (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <span className="progress-text">{uploadProgress}%</span>
        </div>
      ) : (
        <button 
          className="add-btn" 
          onClick={handleFileUpload}
          disabled={!selectedFile || !resourceType.trim()}
        >
          <Plus size={16} />
          Upload & Add
        </button>
      )}
      
      {uploadError && (
        <div className="error-message">
          {uploadError}
        </div>
      )}
    </div>
  );
};

export default ResourceUploader;