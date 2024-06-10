import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";


const Main = () => {
    const location = useLocation();

    const pathName = location.pathname.includes('login') || location.pathname.includes('register');
    return (
        <div>
            <div>
                {pathName || <Navbar />}
                <Outlet />
                <Toaster/>
            </div>
            {pathName || <Footer/>}
        </div>
    );
};

export default Main;