import React, {useState, useContext, Fragment} from 'react'
import { UserContext } from '../../App'
import './UserProfilePage.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext)


  const exampleProject = {
    id:'0',
    name:'ExampleProject1',
    details:'This is an example project that is hardcoded to test out capabilities on the front end. In the final project, this will be gotten from the backend',
    members:['Kevin', 'Vikram', 'Kyrie', 'Jeffrey', 'David'],
    hwSet:[{name:'hwSet 1', capacity:100}, {name:'hwSet 2', capacity:100}],
    hwTake:[20,20]
  }

  const LogoutHandler = () => {
    navigate('/login');
  }

  const modalTest = () => {
    navigate('/popups')
  }

  return (
    <Fragment>
    <div>
        <div className='bar'>
          <div className='bar-text'>ECE461L PROJECT</div>
          <div className='username'>{user}</div>
        </div>
        <div className='project-table-container'>
          <div className='project-table-header'>Your Projects</div>
          <table className='project-table'>
            <tr className='table-header'>
              <th>Project ID</th>
              <th>Project Name</th>
            </tr>
            <tr className='table-rows'>
              <td>{exampleProject.id}</td>
              <td><Link to={`/projects/${exampleProject.id}`}>{exampleProject.name}</Link></td>
            </tr>
            
          </table>
        </div>
        <button onClick={LogoutHandler}>Logout</button>
        <button onClick={modalTest}>Modal Test</button>
    </div>
    </Fragment>
  )
}

export default UserProfilePage