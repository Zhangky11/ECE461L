import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'
import { UserContext } from '../../App';


// const LoginPage = ({ Login, error }) => {
const LoginPage = () => {
    const [user, setUser] = useContext(UserContext)
    const [details, setDetails] = useState({username: "", password: ""});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    console.log("login page")
    const LoginHandler = async (e) => {
        e.preventDefault();
        try {
            const apiEndpoint = "http://127.0.0.1:5000/auth/login";
            const response = await axios.post(apiEndpoint, details);
            if (response.status === 200) {
                setUser(details.username)
                const token = response.data.access_token;
                localStorage.setItem('token', token);
                navigate('/profile');
            } else {
                setError(response.data.message);
            }
            
        } catch (err) {
            setError("Failed to login. Please try again.");
        }
    }
    const SignUpHandler = e => {
        navigate('/register');
    }
    
    return (
        <div className='wrapper'>
            <div className='bar'>
                <div className='bar-text'>ECE461L PROJECT</div>
            </div>
            <div className='container'>
                <div className='header'>
                    <div className='text'>Login</div>
                </div>
                <div className='inputs'>
                    <div className='input-container'>
                        <div className='text2'>Username:</div>
                        <div className='input'>
                            <input type='username' onChange={e => setDetails({...details, username: e.target.value})} value = {details.username}/>
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className='text2'>Password:</div>
                        <div className='input'>
                            <input type='Password' onChange={e => setDetails({...details, password: e.target.value})} value = {details.password}/>
                        </div>
                    </div>
                </div>
                <div className='button-container'>
                    <div className='button' onClick={LoginHandler}>Log In</div>
                    <div className='button' onClick={SignUpHandler}>Sign Up</div>
                </div>
                {(error != "") ? (
                    <div className='error-text'>{error}</div>
                ) : ""}
            </div>
        </div>
    )
}

export default LoginPage
