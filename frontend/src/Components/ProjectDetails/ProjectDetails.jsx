import React, {useContext, useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import HardwareSet from './HardwareSet/HardwareSet'
import HardwareSet from './Hardware/HardwareSet'
import './ProjectDetails.css'
import { UserContext } from '../../App';


const ProjectDetails = () => {
    const { id, name } = useParams();
    const token = localStorage.getItem('jwtToken');
    const [username, setUsername] = useState(null);
    const [description, setDescription] = useState("");
    const [members, setMembers] = useState([]);
    const [HWSets, setHWSets] = useState([]);

    useEffect(() => {
      const fetchProjectDetails = async () => {
        if (!token) return;
  
        const config = {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        const bodyParameters = {
          project_id: id,
          project_name: 'Example Project 2',
          project_description: 'example description'
        };
  
        try {
          const response = await axios.post(
            'http://127.0.0.1:5000/api/project/create_proj',
            bodyParameters,
            config
          );
          console.log(response);
          setUsername(response.data.username);
          // setData(response.data);
          setDescription(response.data.project_discription);
          setMembers(response.data.project_member_list);
          setHWSets(response.data.Hardware_lists);
          console.log('user: ' + response.data.username);
          // unpack the response.data here to obtain the data needed
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
            <div className='project-container'>
                <div className='text'>{name}</div>
                <div className='project-body'>
                    <div className='projectFeature'>
                        <b>Description: </b> {description}
                    </div>
                    <div>
                        <b>Members: </b> 
                        <ul>
                            {members.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <br/>
                <div className='text'>Hardware Sets</div>
                <div className='project-body'>
                    <div className='hardware-area'>
                        {HWSets}
                        <HardwareSet id={id} name="HW 1" capacity='100'/>
                        <HardwareSet id={id} name="HW 2" capacity='100'/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ProjectDetails
