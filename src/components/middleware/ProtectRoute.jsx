import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = ({ isAuthenticated }) => {
    // Check if the user is authenticated (this logic would use your actual auth state)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectRoute;
