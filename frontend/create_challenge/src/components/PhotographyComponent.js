import React, { useEffect, useState } from "react";
import './PhotographyComponent.css';
import { createChallenge, getPhotography, updatePhotography } from "../service/PhotographyService";
import { useNavigate, useParams } from "react-router-dom";

const PhotographyComponent = () => {
    const [challengeName, setChallengeName] = useState('');
    const [challengeDescription, setChallengeDescription] = useState('');
    const [challengeRules, setChallengeRules] = useState('');
    const [endDate, setEndDate] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        challengeName: '',
        challengeDescription: '',
        challengeRules: '',
        endDate: ''
    });

    useEffect(() => {
        if (id) {
            getPhotography(id).then((response) => {
                setChallengeName(response.data.challengeName);
                setChallengeDescription(response.data.challengeDescription);
                setChallengeRules(response.data.challengeRules);
                setEndDate(response.data.endDate);
            }).catch(error => {
                console.error("Error fetching challenge:", error);
            });
        }
    }, [id]);

    const validateForm = () => {
        let valid = true;
        const updatedErrors = { ...errors };

        if (!challengeName.trim()) {
            updatedErrors.challengeName = 'Challenge Name is required';
            valid = false;
        } else {
            updatedErrors.challengeName = '';
        }

        if (!challengeDescription.trim()) {
            updatedErrors.challengeDescription = 'Challenge Description is required';
            valid = false;
        } else {
            updatedErrors.challengeDescription = '';
        }

        if (!challengeRules.trim()) {
            updatedErrors.challengeRules = 'Challenge Rules are required';
            valid = false;
        } else {
            updatedErrors.challengeRules = '';
        }

        if (!endDate.trim()) {
            updatedErrors.endDate = 'End Date is required';
            valid = false;
        } else {
            updatedErrors.endDate = '';
        }

        setErrors(updatedErrors);
        return valid;
    };

    const saveOrUpdateChallenge = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const challengeData = {
                challengeName,
                challengeDescription,
                challengeRules,
                endDate
            };

            if (id) {
                updatePhotography(id, challengeData).then((response) => {
                    console.log("Updated:", response.data);
                    navigate('/photography');
                }).catch(error => {
                    console.error("Error updating:", error);
                });
            } else {
                createChallenge(challengeData).then((response) => {
                    console.log("Created:", response.data);
                    navigate('/photography');
                }).catch(error => {
                    console.error("Error creating:", error);
                });
            }
        }
    };

    const pageTitle = () => (
        <h1>{id ? "Update Challenge" : "Create Challenge"}</h1>
    );

    return (
        <div className="wrapper">
            <form onSubmit={saveOrUpdateChallenge}>
                {pageTitle()}

                <div className="inputbox">
                    <label>Challenge Name</label>
                    <input
                        type="text"
                        placeholder="Challenge Name"
                        value={challengeName}
                        onChange={(e) => setChallengeName(e.target.value)}
                    />
                    {errors.challengeName && <small className="error">{errors.challengeName}</small>}
                </div>

                <div className="inputbox">
                    <label>Challenge Description</label>
                    <input
                        type="text"
                        placeholder="Challenge Description"
                        value={challengeDescription}
                        onChange={(e) => setChallengeDescription(e.target.value)}
                    />
                    {errors.challengeDescription && <small className="error">{errors.challengeDescription}</small>}
                </div>

                <div className="inputbox">
                    <label>Rules & Regulations</label>
                    <input
                        type="text"
                        placeholder="Rules & Regulations"
                        value={challengeRules}
                        onChange={(e) => setChallengeRules(e.target.value)}
                    />
                    {errors.challengeRules && <small className="error">{errors.challengeRules}</small>}
                </div>

                <div className="inputbox">
                    <label>End Date</label>
                    <input
                        type="date"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    {errors.endDate && <small className="error">{errors.endDate}</small>}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PhotographyComponent;
