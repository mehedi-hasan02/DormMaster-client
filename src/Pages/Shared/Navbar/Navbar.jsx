import { Link, NavLink } from "react-router-dom";


const Navbar = () => {

    // const navigate = useNavigate();

    // const handelLogout = () => {
    //     logOut();
    // }

    const navOptions = <>
        <li className="text-white"><Link to='/'>Home</Link></li>
        <li className="text-white"><Link to='/meals'>Meals</Link></li>
        <li className="text-white"><Link to='/upcomingMeals'>Upcoming Meals</Link></li>
        
    </>

    return (
        <div className="navbar fixed z-10 bg-black/30 text-white max-w-screen-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[20] p-2 shadow rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">DormMaster</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            {/* <div className="navbar-end">
                {
                    users ?
                        <div>
                            <Link onClick={handelLogout} className="btn">Logout</Link>
                        </div>
                        :
                        <div>
                            <Link to='/login' className="btn">Login</Link>
                            <Link to='/register' className="btn">Register</Link>
                        </div>
                }

            </div> */}
        </div>
    );
};

export default Navbar;