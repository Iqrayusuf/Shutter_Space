import React, { useState } from 'react';
import './user_challenge.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserChallenge = () => {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !photo) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);

    try {
      const response = await fetch('http://localhost:8080/api/userPhotography', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Challenge submitted successfully!');
        setDescription('');
        setPhoto(null);
        setPreview(null);
        console.log("Redirecting to /challenge-list...");
        navigate('/challenge'); // Redirect to the dashboard (Home page) after submission
      } else {
        alert('Failed to submit challenge.');
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  // Handle showing the list of challenges
  const handleShowChallenges = () => {
    navigate('/challenge-list');
  };

  return (
    <div>
      <form className="challenge-form" onSubmit={handleSubmit}>
        <h2>Submit a Challenge</h2>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            rows="5"
            placeholder="Enter challenge description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="photo">Upload Photo:</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>

        {preview && (
          <div className="form-preview">
            <p>Preview:</p>
            <img src={preview} alt="Preview" style={{ width: '200px' }} />
          </div>
        )}

        <div className="form-actions">
          <button type="submit">Submit Challenge</button>
        </div>
      </form>

      {/* Show Challenge Button */}
      <button onClick={handleShowChallenges}>Show Challenges</button>
    </div>
  );
};

export default UserChallenge;
