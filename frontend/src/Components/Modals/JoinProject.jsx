import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';
import { backendEndpoint } from '../../App';

const JoinProject = ({ modal, setModal, onProjectJoin }) => {
    const [projectId, setProjectId] = useState('');

    const handleJoin = async () => {
        const token = localStorage.getItem('jwtToken');
        const config = {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const bodyParameters = {
            project_id: projectId
        };

        try {
            const response = await axios.post(
                backendEndpoint + "/api/project/join_proj", 
                bodyParameters,
                config
            );
            // If the request is successful, call the onProjectJoin callback
            if (response.status === 200) {
                onProjectJoin();
                setModal(false); // Close the modal
            } else {
                // Handle any non-200 status codes here, if necessary
                console.error('Unexpected status code received:', response.status);
            }
        } catch (error) {
            // Reset the projectId and show an alert if there's an error
            setProjectId('');
            alert(`Error joining the project: ${error.response?.data?.message || error.message}`);
            console.error('Error joining the project:', error);
        }
    };

    return (
        <>
            {modal && (
                <div className='modal'>
                    <div className='overlay' onClick={() => setModal(false)}></div>
                    <div className='modal-content'>
                        <h2>Join Project</h2>
                        <div>
                            <h3>Project ID</h3>
                            <input 
                                type="text" 
                                value={projectId}
                                onChange={e => setProjectId(e.target.value)}
                                placeholder="Enter Project ID" 
                            />
                        </div>
                        <div className='modal-buttons'>
                            <button onClick={() => setModal(false)}>Back</button>
                            <button onClick={handleJoin}>Join</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default JoinProject;
