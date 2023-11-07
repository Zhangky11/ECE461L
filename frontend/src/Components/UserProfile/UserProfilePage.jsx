import { UserContext } from '../../App'
import React, {useState, useEffect, Fragment} from 'react'
import './UserProfilePage.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateProject from '../Modals/CreateProject';
import JoinProject from '../Modals/JoinProject';
import Message from '../Modals/Message';


const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [projects, setProjects] = useState([{}]);

  const [message, setMessage] = useState(false);
  const [join, setJoin] = useState(false);
  const [create, setCreate] = useState(false);

  // TODO: display the modals as an instance of the name of the modal in the return function 

  useEffect(() => {
    const fetchUser = async () => {
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
            console.log(response.data.projects)
          }

          // response.data is the json includes user info
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [navigate]);

  const exampleProjects = [{
    id:'0',
    name:'ExampleProject0',
    details:'This is an example project that is hardcoded to test out capabilities on the front end. In the final project, this will be gotten from the backend',
    members:['Kevin', 'Vikram', 'Kyrie', 'Jeffrey', 'David'],
    hwSet:[{name:'hwSet 1', capacity:100}, {name:'hwSet 2', capacity:100}],
    hwTake:[20,20]
  },
 {
    id:'1',
    name:'ExampleProject1',
    details:'This is an example project that is hardcoded to test out capabilities on the front end. In the final project, this will be gotten from the backend',
    members:['Kevin', 'Vikram', 'Kyrie', 'Jeffrey', 'David'],
    hwSet:[{name:'hwSet 1', capacity:100}, {name:'hwSet 2', capacity:100}],
    hwTake:[20,20]
  },
  ];
  
  const navigateToProject = (projectId, name) => {
    navigate(`/projects/${projectId}/${name}`);
  };

  const LogoutHandler = () => {
    localStorage.clear();
    setUser(null); 
    navigate('/login')
  }

  return (
    <div className='page'>
        <div className='bar'>
          <div className='bar-text'>ECE461L PROJECT</div>
          <div className='username'>{user}</div>
        </div>
        <div className='project-table-container1'>
          <div className='project-table-header'>Your Projects</div>
          <table className='project-table'>
            <thead>
              <tr className='table-header'>
                <th>Project ID</th>
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
          <div className='button-container1'>
            <button className='button' onClick={() => setMessage(true)}>Message Test</button>
            <button className='button'onClick={() => setJoin(true)}>Join</button>
            <button className='button'onClick={() => setCreate(true)}>Create</button>
            <button className='button' onClick={LogoutHandler}>Logout</button>
          </div>
        </div>
        <CreateProject modal={message}>Create Project modal</CreateProject>
        <JoinProject modal={join}>Join Project modal</JoinProject>
        <Message modal={create} >Message modal</Message>
    </div>


  )
}

export default UserProfilePage