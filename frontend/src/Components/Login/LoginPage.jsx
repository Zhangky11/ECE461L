import React, {useState} from 'react'
import './LoginPage.css'


const LoginPage = ({ Login, error }) => {

    const [details, setDetails] = useState({username: "", password: ""});

    const LoginHandler = e => {
        e.preventDefault();

        Login(details);
    }
    
    return (
        <div>
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
                    <div className='button'>Sign Up</div>
                </div>
                {(error != "") ? (
                    <div className='error-text'>{error}</div>
                ) : ""}
            </div>
        </div>
    )
}

export default LoginPage
