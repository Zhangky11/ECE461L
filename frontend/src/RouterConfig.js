import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import LoginPage from './Components/Login/LoginPage';
import UserProfilePage from './Components/UserProfile/UserProfilePage';
import ProjectDetails from './Components/ProjectDetails/ProjectDetails';
import RegisterPage from './Components/Register/RegisterPage';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    if (!token) {
        return null;
    }

    return children;
};


const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={
                <ProtectedRoute>
                    <UserProfilePage />
                </ProtectedRoute>
            } />
            <Route path="/projects/:id" element={<ProjectDetails/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
            {/* Maybe we need an error page */}
            {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        </Routes>
    );
}

export default RouterConfig;
