import React, { useEffect, useState } from 'react';
import { ListUser_challenge as fetchUserChallenges } from '../Services/ListUser_challengeServices';
import './ListUser_challenge.css'; // Dark-themed CSS

const ListUser_challenge = () => {
  const [userChallenges, setUserChallenges] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetchUserChallenges()
      .then((response) => {
        setUserChallenges(response.data);

        // Initialize likes state with zeros
        const initialLikes = {};
        response.data.forEach((user) => {
          initialLikes[user.id] = 0;
        });
        setLikes(initialLikes);
      })
      .catch((error) => {
        console.error('Error fetching user challenges:', error);
      });
  }, []);

  const handleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: prevLikes[id] + 1
    }));
  };

  // Determine the highest number of likes and identify 1st, 2nd, and 3rd places
  const sortedLikes = Object.entries(likes)
    .sort((a, b) => b[1] - a[1]) // Sort by likes in descending order
    .map(entry => entry[0]);

  const firstPlace = sortedLikes[0];
  const secondPlace = sortedLikes[1];
  const thirdPlace = sortedLikes[2];

  return (
    <div className="challenge-list-container">
      {userChallenges && userChallenges.length > 0 ? (
        userChallenges.map((user) => (
          <div key={user.id} className="challenge-card">
            <div className="challenge-image">
              {firstPlace === user.id.toString() && (
                <div className="certificate-badge first-place">🏆 1st Place</div>
              )}
              {secondPlace === user.id.toString() && (
                <div className="certificate-badge second-place">🥈 2nd Place</div>
              )}
              {thirdPlace === user.id.toString() && (
                <div className="certificate-badge third-place">🥉 3rd Place</div>
              )}
              {user.photo && (
                <img
                  src={`data:image/jpeg;base64,${user.photo}`}
                  alt="user upload"
                />
              )}
            </div>
            <div className="challenge-details">
              <p className="description">{user.description}</p>
              <button onClick={() => handleLike(user.id)} className="like-btn">
                ❤️ Like ({likes[user.id] || 0})
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No challenges found.</p>
      )}
    </div>
  );
};

export default ListUser_challenge;
