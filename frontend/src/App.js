import React, { useState, createContext } from 'react';
import './App.css';
// import LoginPage from './Components/Login/LoginPage';
// import UserProfilePage from './Components/UserProfile/UserProfilePage';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterConfig from './RouterConfig';

export const UserContext = createContext();
const backendEndpoint = 'https://ece461l-something-39e3a26d7e75.herokuapp.com/';

function App() {



  return (
      <Router>
        <RouterConfig />
      </Router>

  );
}

export { backendEndpoint };

export default App;
