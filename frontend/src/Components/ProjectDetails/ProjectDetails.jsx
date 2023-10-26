import React, {useContext, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetails.css'
import { UserContext } from '../../App';


const ProjectDetails = () => {
    const {projectName} = useParams();
    const [user, setUser] = useContext(UserContext)
    const [error, setError] = useState('');
    const navigate = useNavigate();

    console.log("details page")
    
    return (
        <div className='wrapper'>
            <div className='bar'>
                <div className='bar-text'>ECE461L PROJECT</div>
            </div>
            <div className='container'>
                <div className='header'>
                    <div className='text'>{projectName}</div>
                </div>
                {(error != "") ? (
                    <div className='error-text'>{error}</div>
                ) : ""}
            </div>
        </div>
    )
}

export default ProjectDetails
