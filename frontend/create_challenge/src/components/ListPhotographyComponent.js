import React, { useEffect, useState } from 'react';
import { deletePhotography, listPhotography } from '../service/PhotographyService';
import './ListPhotographyComponent.css';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';

const ListPhotographyComponent = () => {
    const [photography, setPhotography] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllPhotography();
    }, []);

    const getAllPhotography = () => {
        listPhotography().then(response => {
            const now = new Date();
            const active = response.data.filter(item => new Date(item.endDate) >= now);
            setPhotography(active);
        }).catch(console.error);
    };

    const addNewChallenge = () => navigate('/add-challenge/photography');
    const updatePhotography = (id) => navigate(`/edit-photography/${id}`);
    const removePhotography = (id) => {
        deletePhotography(id).then(getAllPhotography).catch(console.error);
    };

    return (
        <div className="dashboard">
            <div className="feed">
                <div className="feed-header">
                    <h2 className="app-title">Photography Challenges</h2>
                    <p className="app-tagline">Explore and manage current challenges</p>
                </div>

                <button className="feature-btn challenge-btn" onClick={addNewChallenge}>
                    + Add New Challenge
                </button>

                <div className="challenge-list">
                    {photography.length > 0 ? (
                        photography.map(item => (
                            <div className="challenge-card-dark" key={item.id}>
                                <h3>{item.challengeName}</h3>
                                <p><strong>Description:</strong> {item.challengeDescription}</p>
                                <p><strong>Rules:</strong> {item.challengeRules}</p>
                                <p><strong>End Date:</strong> {item.endDate}</p>
                                <p><strong>Time Remaining:</strong>{' '}
                                    <span className="countdown">
                                        <CountdownTimer 
                                            endDate={item.endDate}
                                            onTimerEnd={() => removePhotography(item.id)}
                                        />
                                    </span>
                                </p>
                                <div className="challenge-actions-dark">
                                    <button onClick={() => updatePhotography(item.id)} className="update-btn">Update</button>
                                    <button onClick={() => removePhotography(item.id)} className="delete-btn">Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-challenges">No current photography challenges available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListPhotographyComponent;

