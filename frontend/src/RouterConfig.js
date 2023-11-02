import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Login/LoginPage';
import UserProfilePage from './Components/UserProfile/UserProfilePage';
import ProjectDetails from './Components/ProjectDetails/ProjectDetails';
import CreateProject from './Components/Modals/CreateProject';
import Message from './Components/Modals/Message';
import JoinProject from './Components/Modals/JoinProject';


const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/projects/:id" element={<ProjectDetails/>} />
        </Routes>
    );
}

export default RouterConfig;
