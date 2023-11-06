import React, { useState, createContext } from 'react';
import './App.css';
// import LoginPage from './Components/Login/LoginPage';
// import UserProfilePage from './Components/UserProfile/UserProfilePage';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterConfig from './RouterConfig';

export const UserContext = createContext();

function App() {



  return (
    // <div>
    //   {(user.username != "") ? (
    //     <UserProfilePage username={user.username} Logout={Logout}/>
    //   ) : (
    //     <LoginPage Login={Login} error={error}/>
    //   )}
    // </div>

      <Router>
        <RouterConfig />
      </Router>

  );
}

export default App;
