import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Login/LoginPage';
import UserProfilePage from './Components/UserProfile/UserProfilePage';
import ProjectDetails from './Components/ProjectDetails/ProjectDetails';


const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/projects/:projectName" element={<ProjectDetails/>} />
        </Routes>
    );
}

export default RouterConfig;
