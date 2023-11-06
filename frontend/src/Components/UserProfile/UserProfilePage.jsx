import React, {useState, useEffect} from 'react'
import './UserProfilePage.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('')

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
  
  const navigateToProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const LogoutHandler = () => {
    localStorage.clear();
    setUser(null); 
    navigate('/login')
  }

  return (
    <div>
        <div className='bar'>
          <div className='bar-text'>ECE461L PROJECT</div>
          <div className='username'>{user}</div>
        </div>
        <div className='project-table-container'>
        <div className='project-table-header'>Your Projects</div>
        <table className='project-table'>
          <thead>
            <tr className='table-header'>
              <th>Project ID</th>
              <th>Project Name</th>
            </tr>
          </thead>
          <tbody>
            {exampleProjects.map((project) => (
              <tr className='table-rows' key={project.id} onClick={() => navigateToProject(project.id)}>
                <td>{project.id}</td>
                <td>{project.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={LogoutHandler}>Logout</button>
    </div>
  )
}

export default UserProfilePage