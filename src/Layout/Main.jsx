import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";


const Main = () => {
    return (
        <div>
            <div>
                <Navbar />
                <Outlet />
                <Toaster/>
            </div>
            <Footer/>
        </div>
    );
};

export default Main;