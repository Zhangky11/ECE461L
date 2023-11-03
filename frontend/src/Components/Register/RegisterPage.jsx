import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [details, setDetails] = useState({username: "", password: "", confirmPassword: "",});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault()
        if (details.password == ""){
            (setError("password is empty"))
        } else if (details.username == ""){
            (setError("username is empty"))
        } else if (details.password !== details.confirmPassword) {
            (setError("passwords do not match"))
        } else {
            setError('')
            // register username and password into mongoDB
            try {
                const apiEndpoint = "http://127.0.0.1:5000/auth/register";
                const response = await axios.post(apiEndpoint, details);
                console.log(response.data)
                console.log(response.status)
                if (response.status === 200) {
                    navigate('/login');
                } else {
                    setError(response.data.message);
                }   
            } catch (err) {
                setError("Failed to login. Please try again.");
            }
        }
        
    }

    return (
        <div>
            <div className='wrapper'>
                <div className='bar'>
                    <div className='bar-text'>ECE461L PROJECT</div>
                </div>
                <div className='container'>
                    <div className='header'>
                        <div className='text'>Sign Up</div>
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
                        <div className='input-container'>
                            <div className='text2'>Confirm Password:</div>
                            <div className='input'>
                                <input type='Password' onChange={e => setDetails({...details, confirmPassword: e.target.value})} value = {details.confirmPassword}/>
                            </div>
                        </div>
                    </div>
                    <div className='button-container'>
                        <div className='button' onClick={register}>Sign Up</div>
                    </div>
                    {(error != "") ? (
                    <div className='error-text'>{error}</div>
                    ) : ""}
                </div>
            </div>
        </div>
    )
}

export default RegisterPage