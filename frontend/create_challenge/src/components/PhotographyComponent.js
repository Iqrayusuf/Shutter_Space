import React, { useEffect, useState } from "react";
import './PhotographyComponent.css';
import { createChallenge, getPhotography, updatePhotography } from "../service/PhotographyService";
import { useNavigate, useParams } from "react-router-dom";

const PhotographyComponent = () => {
    const [challengeName, setChallengeName] = useState('');
    const [challengeDescription, setChallengeDescription] = useState('');
    const [challengeRules, setChallengeRules] = useState('');
    const [endDate, setEndDate] = useState('');

    const {id} = useParams();

    const [errors, setErrors] = useState({
        challengeName: '',
        challengeDescription: '',
        challengeRules: '',
        endDate: ''
    });

    const navigate = useNavigate();

    useEffect(() =>{
        if(id){
            getPhotography(id).then((response) => {
                setChallengeName(response.data.challengeName);
                setChallengeDescription(response.data.challengeDescription);
                setChallengeRules(response.data.challengeRules);
                setEndDate(response.data.endDate);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdateChallenge(e) {
        e.preventDefault();

        if (validateForm()) {

            const photography = { challengeName, challengeDescription, challengeRules, endDate };
            console.log(photography);

            if(id){
                updatePhotography(id, photography).then((response) => {
                    console.log(response.data);
                    navigate('/photography');
                }).catch(error => {
                    console.error(error);
                })
            }else{
                createChallenge(photography).then((response) => {
                    console.log(response.data);
                    navigate('/photography'); // Navigate to list after successful creation
                }).catch(error => {
                    console.error(error);
                })
            }

        
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (challengeName.trim()) {
            errorsCopy.challengeName = '';
        } else {
            errorsCopy.challengeName = 'Challenge Name is required';
            valid = false;
        }

        if (challengeDescription.trim()) {
            errorsCopy.challengeDescription = '';
        } else {
            errorsCopy.challengeDescription = 'Challenge Description is required';
            valid = false;
        }

        if (challengeRules.trim()) {
            errorsCopy.challengeRules = '';
        } else {
            errorsCopy.challengeRules = 'Challenge Rules are required';
            valid = false;
        }

        if (endDate.trim()) {
            errorsCopy.endDate = '';
        } else {
            errorsCopy.endDate = 'End Date is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h1>Update Challenges</h1>
        }else{
            return <h1>Create Challenges</h1>
        }
    }
    return (
        <div className="wrapper">
        <form onSubmit={saveOrUpdateChallenge}>
            {pageTitle()}
    
            <div className="inputbox">
                <label htmlFor="challengeName">Challenge Name</label>
                <input
                    type="text"
                    placeholder="Challenge Name"
                    value={challengeName}
                    onChange={(e) => setChallengeName(e.target.value)}
                />
                {errors.challengeName && <small className="error">{errors.challengeName}</small>}
            </div>
    
            <div className="inputbox">
                <label htmlFor="challengeDescription">Challenge Description</label>
                <input
                    type="text"
                    placeholder="Challenge Description"
                    value={challengeDescription}
                    onChange={(e) => setChallengeDescription(e.target.value)}
                />
                {errors.challengeDescription && <small className="error">{errors.challengeDescription}</small>}
            </div>
    
            <div className="inputbox">
                <label htmlFor="challengeRules">Rules & Regulation</label>
                <input
                    type="text"
                    placeholder="Rules & Regulation"
                    value={challengeRules}
                    onChange={(e) => setChallengeRules(e.target.value)}
                />
                {errors.challengeRules && <small className="error">{errors.challengeRules}</small>}
            </div>
    
            <div className="inputbox">
                <label htmlFor="endDate">End Date</label>
                <input
                    type="date"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                {errors.endDate && <small className="error">{errors.endDate}</small>}
            </div>
    
            <button type="submit" onClick={saveOrUpdateChallenge}>Submit</button>
        </form>
    
    </div>
    
        

    );
};

export default PhotographyComponent;
