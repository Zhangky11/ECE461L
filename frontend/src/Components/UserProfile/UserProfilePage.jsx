import React, {useState, useContext} from 'react'
import { UserContext } from '../../App'
import './UserProfilePage.css'
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext)
  const LogoutHandler = () => {
    navigate('/login');
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
            <tr className='table-header'>
              <th>Project ID</th>
              <th>Project Name</th>
            </tr>
            <tr className='table-rows'>
              <td>001</td>
              <td>Example Project 1</td>
            </tr>
            
          </table>
        </div>
        <button onClick={LogoutHandler}>Logout</button>
    </div>
  )
}

export default UserProfilePage