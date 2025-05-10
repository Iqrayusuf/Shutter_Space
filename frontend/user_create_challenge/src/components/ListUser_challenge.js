import React, { useEffect, useState } from 'react';
import { ListUser_challenge as fetchUserChallenges } from '../Services/ListUser_challengeServices';
import './ListUser_challenge.css';

const ListUser_challenge = () => {
  const [userChallenges, setUserChallenges] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetchUserChallenges()
      .then((response) => {
        setUserChallenges(response.data);

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

  const sortedLikes = Object.entries(likes)
    .sort((a, b) => b[1] - a[1])
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

              {/* 👤 User Profile Image */}
              {user.userImage && (
                <img
                  src={`data:image/jpeg;base64,${user.userImage}`}
                  alt="user profile"
                  className="user-profile"
                />
              )}

              {/* 📸 User's Challenge Photo */}
              {user.photo && (
                <img
                  src={`data:image/jpeg;base64,${user.photo}`}
                  alt="user upload"
                  className="challenge-photo"
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
