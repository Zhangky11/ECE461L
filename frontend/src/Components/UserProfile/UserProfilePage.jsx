import React, { useState, useEffect, useCallback} from 'react';
import './UserProfilePage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateProject from '../Modals/CreateProject';
import JoinProject from '../Modals/JoinProject';
import Message from '../Modals/Message';

const UserProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [projects, setProjects] = useState([{}]);

    // Modal state

    const [message, setMessage] = useState(false);
    const [join, setJoin] = useState(false);
    const [create, setCreate] = useState(false);

    // Wrap the fetchUserAndProjects function with useCallback
    const fetchUserAndProjects = useCallback(async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/return_user/', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data && response.data.username) {
                setUser(response.data.username);
                if (response.data.projects != null) {
                    setProjects(response.data.projects);
                }
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }, [navigate]); // Include navigate as a dependency

    // Use the memoized fetchUserAndProjects function in useEffect
    useEffect(() => {
        fetchUserAndProjects();
    }, [fetchUserAndProjects]);

    const navigateToProject = (projectId, name) => {
        navigate(`/projects/${projectId}/${name}`);
    };

    const logoutHandler = () => {
        localStorage.clear();
        setUser(null);
        navigate('/login');
    };

    // Function to handle the project creation
    const handleProjectCreate = async () => {
        await fetchUserAndProjects();  // Re-fetch the projects list
    };

    const handleProjectJoin = async () => {
        await fetchUserAndProjects();  // Re-fetch the projects list
    };


    return (
        <div className='page'>
            <div className='bar'>
                <div className='bar-text'>ECE461L PROJECT</div>
                <div className='username'>{user}</div>
            </div>
            <div className='project-table-container1'>
                <div className='project-table-header'>Your Projects</div>
                <div className='table-container'>
                    <table className='project-table'>
                        <thead>
                            <tr className='table-header'>
                                <th className='projectIDdisplay'>Project ID</th>
                                <th>Project Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr className='table-rows' key={project.id} onClick={() => navigateToProject(project.id, project.name)}>
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='button-container1'>
                    <button className='button' onClick={() => setJoin(true)}>Join</button>
                    <button className='button' onClick={() => setCreate(true)}>Create</button>
                    <button className='button' onClick={logoutHandler}>Logout</button>
                </div>
            </div>
            <CreateProject modal={create} setModal={setCreate} onProjectCreate={handleProjectCreate} />
            <JoinProject modal={join} setModal={setJoin} onProjectJoin={handleProjectJoin} />
        </div>
    );
};

export default UserProfilePage;
