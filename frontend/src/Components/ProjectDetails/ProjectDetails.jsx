import React, {useContext, useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetails.css'
import { UserContext } from '../../App';


const ProjectDetails = () => {
    const { id } = useParams();
    const username = "";
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
      const fetchProjectDetails = async () => {
        if (!token) return;
  
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParameters = {
          project_id: id
        };
  
        try {
          const response = await axios.post(
            'http://127.0.0.1:5000/api/project/display_proj',
            bodyParameters,
            config
          );
          // unpack the response.data here to obtain the data needed
          username = response.data.username
        } catch (error) {
          console.error('Error fetching project details:', error);
        }
      };
      fetchProjectDetails();
    }, [id, token]);
    
    const exampleProject = {
        id:'0',
        name:'ExampleProject0',
        details:'This is an example project that is hardcoded to test out capabilities on the front end. In the final project, this will be gotten from the backend',
        members:['Kevin', 'Vikram', 'Kyrie', 'Jeffrey', 'David'],
        hwSet:[{name:'hwSet 1', capacity:100}, {name:'hwSet 2', capacity:100}],
        hwTake:[20,20]
      }

    // "exampleProject" below needs to be replaced with data from response.data
    return (
        <div className='wrapper'>
            <div className='bar'>
                <div className='bar-text'>ECE461L PROJECT</div>
                <div className='username'>{username}</div>
            </div>
            <div className='container'>
                <div className='text'>{exampleProject.name}</div>
                <div className='body'>
                    <div className='projectFeature'>
                        <b>Description: </b> {exampleProject.details}
                    </div>
                    <div>
                        <b>Members: </b> 
                        <ul>
                            {exampleProject.members.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    
                    
                </div>
            </div>
            
        </div>
    )
}

export default ProjectDetails
