import React, {useContext, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetails.css'
import { UserContext } from '../../App';


const ProjectDetails = () => {
    const {id} = useParams();
    const [user, setUser] = useContext(UserContext)

    //example project for now
    // TODO: implement context for projects that we can search for the one want and display it
    const exampleProject = {
        id:'0',
        name:'ExampleProject1',
        details:'This is an example project that is hardcoded to test out capabilities on the front end. In the final project, this will be gotten from the backend',
        members:['Kevin', 'Vikram', 'Kyrie', 'Jeffrey', 'David'],
        hwSet:[{name:'hwSet 1', capacity:100}, {name:'hwSet 2', capacity:100}],
        hwTake:[20,20]
    }
    const [error, setError] = useState('');
    const navigate = useNavigate();

    console.log("details page")
    
    return (
        <div className='wrapper'>
            <div className='bar'>
                <div className='bar-text'>ECE461L PROJECT</div>
                <div className='username'>{user}</div>
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