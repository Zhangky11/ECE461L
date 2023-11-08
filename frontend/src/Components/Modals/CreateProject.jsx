import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';

const CreateProject = ({ modal, setModal, onProjectCreate }) => {
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    const handleOk = async () => {
        const token = localStorage.getItem('jwtToken');
        const config = {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const bodyParameters = {
            project_id: projectId,
            project_name: projectName,
            project_description: projectDescription
        };

        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/api/project/create_proj',
                bodyParameters,
                config
            );
            // If the request is successful, call the onProjectCreate callback
            if (response.status === 200) {
                onProjectCreate();
                setModal(false); // Close the modal
            } else {
                // Non-200 status code, clear input fields and show error
                setProjectId('');
                setProjectName('');
                setProjectDescription('');
                alert(`Error creating the project: ${response.data.message || 'Unknown error occurred.'}`);
            }
        } catch (error) {
            // Error caught, clear input fields and show error
            setProjectId('');
            setProjectName('');
            setProjectDescription('');
            alert(`Error creating the project: ${error.response?.data?.message || error.message}`);
            console.error('Error creating the project:', error);
        }
    };

    return (
        <>
            {modal && (
                <div className='modal'>
                    <div className='overlay' onClick={() => setModal(false)}></div>
                    <div className='modal-content'>
                        <h2>Create Project</h2>
                        <div>
                            <h3>Project ID</h3>
                            <input 
                                type="text" 
                                value={projectId}
                                onChange={e => setProjectId(e.target.value)}
                                placeholder="Enter Project ID" 
                            />
                        </div>
                        <div>
                            <h3>Project Name</h3>
                            <input 
                                type="text" 
                                value={projectName}
                                onChange={e => setProjectName(e.target.value)}
                                placeholder="Enter Project Name" 
                            />
                        </div>
                        <div>
                            <h3>Project Description</h3>
                            <textarea 
                                value={projectDescription}
                                onChange={e => setProjectDescription(e.target.value)}
                                placeholder="Enter Project Description"
                            ></textarea>
                        </div>
                        <div className='modal-buttons'>
                            <button onClick={handleOk}>OK</button>
                            <button onClick={() => setModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateProject;
