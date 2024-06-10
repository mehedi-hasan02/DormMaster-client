import { CgProfile, CgServer } from "react-icons/cg";
import { FaHome, FaList, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { MdOutlineReviews, MdOutlineUpcoming } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hook/useAdmin";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const navData = <>
        {
            isAdmin ?
                <>
                    <li>
                        <NavLink to='/dashboard/adminProfile'>
                            <CgProfile />
                            Admin Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/manageUsers'>
                            <FaUsers />
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/addMeal'>
                            <FaUtensils />
                            Add Meal
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/allMeals'>
                            <FaList />
                            All Meals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/allReviews'>
                            <MdOutlineReviews />
                            All Reviews
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/serveMeals'>
                            <CgServer />
                            Serve Meals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/upcomingMeals'>
                            <MdOutlineUpcoming />
                            Upcoming Meals
                        </NavLink>
                    </li>
                </>
                :
                <>
                    <li>
                        <NavLink to='/dashboard/userProfile'>
                            <CgProfile />
                            My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/requestMeals'>
                            <VscGitPullRequestGoToChanges />
                            Request Meal
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/myReview'>
                            <MdOutlineReviews />
                            My Reviews
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/paymentHistory'>
                            <FaWallet />
                            Payment History
                        </NavLink>
                    </li>
                </>
        }
    </>

    return (
        <div className="flex mr-5">
            <div className="lg:w-64 lg:min-h-screen lg:bg-orange-400 lg:p-2 z-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm min-h-screen dropdown-content mt-3 z-[1] p-2 shadow bg-orange-400 rounded-box w-52">
                            {navData}
                            <div className="divider text-white"></div>
                            <li>
                                <NavLink to='/'>
                                    <FaHome />
                                    Home
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
                </div>
                <div className="hidden lg:flex">
                    <ul className="menu px-1">
                        {navData}
                        <div className="divider text-white"></div>
                        <li>
                            <NavLink to='/'>
                                <FaHome />
                                Home
                            </NavLink>
                        </li>
                    </ul>

                </div>

            </div>
            <div className="flex-1 lg:p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;