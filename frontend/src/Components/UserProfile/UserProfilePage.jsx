import React, {useState, useContext} from 'react'
import { UserContext } from '../../App'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext)
  const LogoutHandler = () => {
    navigate('/login');
  }
  return (
    <div>
        <div>Welcome, {user}</div>
        <button onClick={LogoutHandler}>Logout</button>
    </div>
  )
}

export default UserProfilePage