import React, { useState } from 'react';
import './App.css';
import LoginPage from './Components/Login/LoginPage';
import UserProfilePage from './Components/UserProfile/UserProfilePage';

function App() {
  const adminUser = {
    username: "admin",
    password: "admin123"
  }
  const [user, setUser] = useState({username: ""})
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if (details.username == adminUser.username && details.password == adminUser.password) {
      console.log("Logged in");
      setUser({
        username: details.username
      });
      setError("");
    } else {
      console.log("Incorrect username or password");
      setError("Incorrect username or password")
    }
  }

  const Logout = () => {
    setUser({ username: "" });
  }

  return (
    <div>
      {(user.username != "") ? (
        <UserProfilePage username={user.username} Logout={Logout}/>
      ) : (
        <LoginPage Login={Login} error={error}/>
      )}
    </div>
  );
}

export default App;
