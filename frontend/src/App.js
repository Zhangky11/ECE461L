import React, { useState, createContext } from 'react';
import './App.css';
// import LoginPage from './Components/Login/LoginPage';
// import UserProfilePage from './Components/UserProfile/UserProfilePage';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterConfig from './RouterConfig';

export const UserContext = createContext();
const backendEndpoint = 'http://127.0.0.1:5000';

function App() {



  return (
      <Router>
        <RouterConfig />
      </Router>

  );
}

export { backendEndpoint };

export default App;
