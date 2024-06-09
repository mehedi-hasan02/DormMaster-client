import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hook/useAdmin";
import useAuth from "../Hook/useAuth";

const AdminRoute = ({ children }) => {
    const { users, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (users && isAdmin) {
        return children;
    }
    if (loading || isAdminLoading) {
        return <div className="text-center">
            <progress className="progress w-56"></progress>
        </div>
    }

    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;