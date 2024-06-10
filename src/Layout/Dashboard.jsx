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
    return (
        <div className="flex">
             {/* Hamburger Button */}
             <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? (
                    <CiCircleRemove className="h-5 w-5 text-white" />
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                )}
            </div>
            <div
                className={`w-64 min-h-screen bg-orange-400 p-2 ${
                    isSidebarOpen ? "block" : "hidden"
                } lg:block absolute top-0 left-0 z-20`}
            >
                <ul className="menu">
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
                                        <FaList/>
                                        All Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/allReviews'>
                                        <MdOutlineReviews/>
                                        All Reviews
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/serveMeals'>
                                        <CgServer/>
                                        Serve Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/upcomingMeals'>
                                        <MdOutlineUpcoming/>
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

                    <div className="divider text-white"></div>
                    <li>
                        <NavLink to='/'>
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;