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
  const [HWSets, setHWSets] = useState(null); // Initialize to null to check if data has loaded

  const handleHardwareChange = (hardwareName, newAmount, newAvailability) => {
    setHWSets(currentHWSets => {
      return currentHWSets.map(hwSet => {
        if (hwSet.hw_name === hardwareName) {
          return { ...hwSet, hw_amount: newAmount, total_availability: newAvailability };
        }
        return hwSet;
      });
    });
  };

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
      };

      try {
        const response = await axios.post(
          'http://127.0.0.1:5000/api/project/display_proj',
          bodyParameters,
          config
        );
        setUsername(response.data.username);
        setDescription(response.data.project_description);
        setMembers(response.data.project_member_list);
        setHWSets(response.data.Hardware_list);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };
    fetchProjectDetails();
  }, [id, token]);
  
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
                          {members.map((member, index) => (
                              <li key={index}>{member}</li>
                          ))}
                      </ul>
                  </div>
              </div>
              <br/>
              <div className='text'>Hardware Sets</div>
              <div className='project-body'>
                  <div className='hardware-area'>
                      {/* Conditional rendering based on HWSets */}
                      {HWSets ? (
                          HWSets.map((hwSet, index) => (
                            <HardwareSet 
                              key={index}
                              id={id}
                              name={hwSet.hw_name}
                              capacity='100' // Assuming capacity is always 100, adjust if necessary
                              amount={hwSet.hw_amount}
                              availability={hwSet.total_availability}
                              onHardwareChange={(newAmount, newAvailability) => handleHardwareChange(hwSet.hw_name, newAmount, newAvailability)}
                            />
                          ))
                      ) : (
                          <div>Loading Hardware Sets...</div> // Or any other placeholder
                      )}
                  </div>
              </div>
          </div>            
      </div>
  );
}

export default ProjectDetails;

