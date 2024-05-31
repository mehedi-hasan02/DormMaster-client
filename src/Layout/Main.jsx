import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";


const Main = () => {
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <Outlet/>
        </div>
    );
};

export default Main;