/*import React,{useEffect, useState} from 'react'
import { listUsers } from '../Services/UserService'

const ListUserComponents = () => {
    const {users,setUsers} = useState({})

    useEffect(()=> {
        listUsers().then({response} => {
            setUsers(response.data);
        }).catch(error =>{
            console.error(error);

        });
    },{})
 
   

  return (
    <div className='container'>
        <h2>List of Employees</h2>
        <table className='table table-striped table-border'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee FirstName</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListUserComponents*/

/* React, { useEffect, useState } from 'react'
import { listUsers } from '../Services/UserService'

const ListUserComponents = () => {
    const [users, setUsers] = useState([])  // Fixed: Use array destructuring and initialize as empty array

    useEffect(() => {
        listUsers().then((response) => {  // Fixed: Proper parentheses for then callback
            setUsers(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, [])  

    return (
        <div className='container'>
            <h2>List of Employees</h2>
            <table className='table table-striped table-bordered'>  
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee FirstName</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default <ListUserComponents></ListUserComponents>*/


/*
import React, { useEffect, useState } from 'react'
import { listUsers } from '../Services/UserService'
import { useNavigate } from 'react-router-dom'

const ListUserComponents = () => {
    const [users, setUsers] = useState([])
    const naviagator = useNavigate();

    useEffect(() => {
        listUsers().then((response) => {
            setUsers(response.data)
        }).catch(error => {
            console.error(error)
        });
    }, [])


    function addNewLearningPlan(){
        naviagator('/add-NewLearningPlan')
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Learning Plans</h2>
            <button className='btn btn-primary mb-2'onClick={addNewLearningPlan}> Add New Learning Plan </button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Topics Covered</th>
                        <th>Resources</th>
                        <th>Start Date</th>
                        <th>Target Completion Date</th>
                        <th>Estimated Time</th>
                        <th>Difficulty Level</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <tr key={user.id}>
                                <td>{user.title}</td>
                                <td>{user.description}</td>
                                <td>
                                    <ul>
                                        {user.topicsCovered?.map((topic, index) => (
                                            <li key={index}>{topic}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {user.resources?.map((res, index) => (
                                            <li key={index}>
                                                <strong>{res.type}:</strong>{' '}
                                                <a href={res.url} target="_blank" rel="noopener noreferrer">
                                                    {res.url}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{user.startDate}</td>
                                <td>{user.targetCompletionDate}</td>
                                <td>{user.estimatedTime}</td>
                                <td>{user.difficultyLevel}</td>
                                <td>{user.status}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListUserComponents
*/


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import './ListLearningPlanComponent.css';

const ListLearningPlanComponent = () => {
    const [learningPlans, setLearningPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const API_URL = 'http://localhost:8081/api/users';

    useEffect(() => {
        fetchLearningPlans();
    }, []);

    const fetchLearningPlans = async () => {
        try {
            setLoading(true);
            // Replace with your actual API endpoint
            const response = await fetch('http://localhost:8081/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch learning plans');
            }
            const data = await response.json();
            setLearningPlans(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const addNewLearningPlan = () => {
        navigate('/add-NewLearningPlan');
    };

    const handleUpdate = (id) => {
        navigate(`/update-learning-plan/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this learning plan?')) {
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`http://localhost:8081/api/users/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Failed to delete learning plan');
                }

                // Remove the deleted plan from state
                setLearningPlans(learningPlans.filter(plan => plan.id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) {
        return <div className="loading-container">Loading learning plans...</div>;
    }

    if (error) {
        return <div className="error-container">Error: {error}</div>;
    }

    return (
        <div className="learning-plans-container">
            <h1 className="learning-plans-title">Learning Plans</h1>
            
            <div className="add-plan-button-container">
                <button className="add-plan-button" onClick={addNewLearningPlan}>
                    Add New Learning Plan
                </button>
            </div>
            
            {learningPlans.length === 0 ? (
                <div className="no-plans-message">
                    No learning plans found. Create one to get started!
                </div>
            ) : (
                <div className="learning-plans-table-wrapper">
                    <table className="learning-plans-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Topics Covered</th>
                                <th>Resources</th>
                                <th>Start Date</th>
                                <th>Target Completion Date</th>
                                <th>Estimated Time</th>
                                <th>Difficulty Level</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {learningPlans.map(plan => (
                                <tr key={plan.id}>
                                    <td>{plan.title}</td>
                                    <td>{plan.description}</td>
                                    <td>
                                        <ul className="topics-list">
                                            {plan.topicsCovered?.map((topic, index) => (
                                                <li key={index}>{topic}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul className="resources-list">
                                            {plan.resources?.map((resource, index) => (
                                                <li key={index}>
                                                    <strong>{resource.type}:</strong>{' '}
                                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                                        {resource.name || resource.url}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{new Date(plan.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(plan.targetCompletionDate).toLocaleDateString()}</td>
                                    <td>{plan.estimatedTime}</td>
                                    <td>{plan.difficultyLevel}</td>
                                    <td>
                                        <span className={`status-badge status-${plan.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                            {plan.status}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <button 
                                            className="update-button" 
                                            onClick={() => handleUpdate(plan.id)}
                                            aria-label="Update"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button 
                                            className="delete-button" 
                                            onClick={() => handleDelete(plan.id)}
                                            aria-label="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ListLearningPlanComponent;