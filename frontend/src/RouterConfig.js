import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Login/LoginPage';
import UserProfilePage from './Components/UserProfile/UserProfilePage';
import ProjectDetails from './Components/ProjectDetails/ProjectDetails';
import RegisterPage from './Components/Register/RegisterPage';


const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/projects/:id" element={<ProjectDetails/>} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
}

export default RouterConfig;
