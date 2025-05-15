// src/utils/ResourceUtils.js
import React from 'react';
import { BookOpen, FileText, Film, ExternalLink } from 'lucide-react';

/**
 * Get the appropriate icon component for a resource type
 */
export const getResourceIcon = (type) => {
  if (!type) return <BookOpen size={16} />;
  
  const lowercaseType = type.toLowerCase();
  
  if (lowercaseType.includes('pdf') || lowercaseType.includes('document')) {
    return <FileText size={16} />;
  } else if (lowercaseType.includes('video') || lowercaseType.includes('movie')) {
    return <Film size={16} />;
  } else if (lowercaseType.includes('link') || lowercaseType.includes('website')) {
    return <ExternalLink size={16} />;
  } else {
    return <BookOpen size={16} />;
  }
};

/**
 * Validate a file for resource upload
 */
export const validateResourceFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }
  
  // Check file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, error: 'File is too large. Maximum size is 10MB' };
  }
  
  // Check file type
  const acceptedTypes = [
    'application/pdf',
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/webm',
  ];
  
  if (!acceptedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Invalid file type. Please select a PDF or video file' 
    };
  }
  
  return { valid: true, error: null };
};