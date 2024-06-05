import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AllMeals from "../Pages/AllMeals/AllMeals";
import MealDetails from "../Pages/MealDetails/MealDetails";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import AddMeal from "../Pages/Dashboard/AddMeal/AddMeal";
import AdminAllMeals from "../Pages/Dashboard/AdminAllMeals/AdminAllMeals";
import UpdateMeal from "../Pages/Dashboard/UpdateMeal/UpdateMeal";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import AdminUpcomingMeals from "../Pages/Dashboard/AdminUpcomimgMeals/AdminUpcomingMeals";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals";
import AllReviews from "../Pages/Dashboard/AllReviews/AllReviews";
import ServeMeals from "../Pages/Dashboard/ServeMeals/ServeMeals";
import useAdmin from "../Hook/useAdmin";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";

// const isAdmin = useAdmin();

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'meals',
                element: <AllMeals />,
            },
            {
                path: 'mealDetail/:id',
                element: <MealDetails />,
                loader: ({ params }) => fetch(`http://localhost:8000/meal/${params.id}`),
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'upcomingMeal',
                element: <UpcomingMeals/>,
            },
            
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
            //admin route
            // ...(isAdmin) ? [
                {
                    path: 'addMeal',
                    element: <AddMeal />
                },
                {
                    path: 'allMeals',
                    element: <AdminAllMeals />,
                },
                {
                    path: 'updateMeal/:id',
                    element: <UpdateMeal />,
                    loader: ({ params }) => fetch(`http://localhost:8000/meal/${params.id}`),
                },
                {
                    path: 'profile',
                    element: <AdminProfile/>
                },
                {
                    path: 'upcomingMeals',
                    element: <AdminUpcomingMeals/>,
                },
                {
                    path: 'allReviews',
                    element: <AllReviews/>,
                },
                {
                    path: 'serveMeals',
                    element: <ServeMeals/>,
                },
                {
                    path: 'manageUsers',
                    element: <ManageUsers/>
                },
            // ] 
            // :
            // [
                {
                    path: 'profile',
                    element: <UserProfile/>
                }
            ]
            
        // ]
    }
])

export default router;