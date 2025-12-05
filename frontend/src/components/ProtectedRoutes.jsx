import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ element }) => {
    const { user } = useAuth();
    if (!user.role) {
        return <h1>Loading</h1>
    }
    return user.role == "admin" ? <Outlet /> : <Navigate to="/" />;
};