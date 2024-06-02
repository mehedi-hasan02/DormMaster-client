import { Link, NavLink } from "react-router-dom";


const Navbar = () => {

    const users = true;

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
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black/50 rounded-box w-52">
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
                {/* <div>
                    <Link to='/login' className="btn">Join us</Link>
                </div> */}
                {
                    users ?
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-black/50 rounded-box w-52">
                                <li>
                                    <p>Mehedi Hasan</p>
                                </li>
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <li><button>Logout</button></li>
                            </ul>
                        </div>
                        :
                        <div>
                            <Link to='/login' className="btn">Join us</Link>
                        </div>
                }

            </div>
        </div>
    );
};

export default Navbar;