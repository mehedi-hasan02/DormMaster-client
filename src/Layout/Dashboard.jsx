import { CgProfile, CgServer } from "react-icons/cg";
import { FaHome, FaList, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { MdOutlineReviews, MdOutlineUpcoming } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    const isAdmin = true;
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400 p-2">
                <ul className="menu">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to='/dashboard/profile'>
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
                                    <NavLink to='/dashboard/profile'>
                                        <CgProfile />
                                        My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/reservation'>
                                        <VscGitPullRequestGoToChanges />
                                        Request Meal
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/paymentHistory'>
                                        <MdOutlineReviews />
                                        My Reviews
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/cart'>
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