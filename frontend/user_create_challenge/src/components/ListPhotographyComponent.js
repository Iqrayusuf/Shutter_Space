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

    function getAllPhotography() {
        listPhotography().then((response) => {
            const currentDate = new Date();
            const filteredData = response.data.filter(item => new Date(item.endDate) >= currentDate);
            setPhotography(filteredData);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewChallenge() {
        navigate('/add-challenge/photography');
    }

    function updatePhotography(id) {
        navigate(`/edit-photography/${id}`);
    }

    function removePhotography(id) {
        deletePhotography(id).then(() => {
            getAllPhotography();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="list-container">
            <h2>Current Photography Challenges</h2>
            <button className="add-btn" onClick={addNewChallenge}>Add Challenge</button>

            <div className="challenge-list">
                {photography.length > 0 ? (
                    photography.map(item => (
                        <div className="challenge-card" key={item.id}>
                            <h3>{item.challengeName}</h3>
                            <p><strong>Description:</strong> {item.challengeDescription}</p>
                            <p><strong>Rules:</strong> {item.challengeRules}</p>
                            <p><strong>End Date:</strong> {item.endDate}</p>
                            <p><strong>Time Remaining:</strong>
                                <span className="countdown">
                                    <CountdownTimer 
                                        endDate={item.endDate} 
                                        onTimerEnd={() => removePhotography(item.id)} 
                                    />
                                </span>
                            </p>
                            <div className="challenge-actions">
                                <button onClick={() => updatePhotography(item.id)}>Update</button>
                                <button onClick={() => removePhotography(item.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No current photography challenges available.</p>
                )}
            </div>
        </div>
    );
};

export default ListPhotographyComponent;
