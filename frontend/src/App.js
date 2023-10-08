import React, { useState, createContext } from 'react';
import './App.css';
// import LoginPage from './Components/Login/LoginPage';
// import UserProfilePage from './Components/UserProfile/UserProfilePage';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterConfig from './RouterConfig';

export const UserContext = createContext();

function App() {

  const [user, setUser] = useState("")

  const setUsername = (username) => {
    setUser(username)
  }

  return (
    // <div>
    //   {(user.username != "") ? (
    //     <UserProfilePage username={user.username} Logout={Logout}/>
    //   ) : (
    //     <LoginPage Login={Login} error={error}/>
    //   )}
    // </div>
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <RouterConfig />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
