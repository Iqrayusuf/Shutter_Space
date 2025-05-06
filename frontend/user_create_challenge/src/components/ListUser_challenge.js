import React, { useEffect, useState } from 'react';
import { ListUser_challenge as fetchUserChallenges } from '../Services/ListUser_challengeServices';
import './ListUser_challenge.css'; // Add the dark-themed CSS

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

  return (
    <div className="challenge-list-container">
      {userChallenges && userChallenges.length > 0 ? (
        userChallenges.map((user) => (
          <div key={user.id} className="challenge-card">
            <div className="challenge-image">
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
