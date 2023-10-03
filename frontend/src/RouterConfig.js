import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Login/LoginPage';
import UserProfilePage from './Components/UserProfile/UserProfilePage';


const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
    );
}

export default RouterConfig;
