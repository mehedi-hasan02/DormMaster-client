import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../Hook/useAuth";
import { IoMdNotificationsOutline } from "react-icons/io";


const Navbar = () => {

    // const users = true;
    const { users, logOut } = useAuth();
    // console.log(users);

    const navigate = useNavigate();

    const handelLogout = () => {
        logOut();
        navigate('/');
    }

    const navOptions = <>
        <li className="text-white"><Link to='/'>Home</Link></li>
        <li className="text-white"><Link to='/meals'>Meals</Link></li>
        <li className="text-white"><Link to='/upcomingMeal'>Upcoming Meals</Link></li>
        <li className="text-white"><Link><IoMdNotificationsOutline className="w-[20px] h-[20px]"/></Link></li>

    </>

    return (
        <div className="navbar bg-black text-white max-w-screen-xl h-16">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-black/50 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl">DormMaster</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                {

                    users ?
                        <div className="dropdown dropdown-end z-10">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={users?.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-black/50 rounded-box w-52">
                                <li>
                                    <p>Mehedi Hasan</p>
                                </li>
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <li><button onClick={handelLogout}>Logout</button></li>
                            </ul>
                        </div>
                        :
                        <div>
                            <Link to='/register' className="btn">Join us</Link>
                        </div>
                }

            </div>
        </div>
    );
};

export default Navbar;