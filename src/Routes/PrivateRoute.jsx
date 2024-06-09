import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";


const PrivateRoute = ({children}) => {
    const { users, loading } = useAuth();
    const location = useLocation();
    if (users) {
        return children;
    }
    if (loading) {
        return <div className="text-center">
            <progress className="progress w-56"></progress>
        </div>
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;