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
import UserRequestMeals from "../Pages/Dashboard/UserRequestMeals/UserRequestMeals";
import MyReview from "../Pages/Dashboard/MyReview/MyReview";
import CheckOut from "../Pages/CheckOut/CheckOut";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ErrorPage from "../Component/ErrorPage/ErrorPage";

// const isAdmin = useAdmin();

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage/>,
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
                element: <PrivateRoute><MealDetails /></PrivateRoute>,
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
            {
                path: 'checkOut/:name',
                element: <PrivateRoute><CheckOut/></PrivateRoute>,
                loader: ({params})=>fetch(`http://localhost:8000/plan/${params?.name}`)
            }
            
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
                    element: <AdminRoute><AddMeal /></AdminRoute>
                },
                {
                    path: 'allMeals',
                    element: <AdminRoute><AdminAllMeals /></AdminRoute>,
                },
                {
                    path: 'updateMeal/:id',
                    element: <AdminRoute><UpdateMeal /></AdminRoute>,
                    loader: ({ params }) => fetch(`http://localhost:8000/meal/${params.id}`),
                },
                {
                    path: 'adminProfile',
                    element: <AdminRoute><AdminProfile/></AdminRoute>
                },
                {
                    path: 'upcomingMeals',
                    element: <AdminRoute><AdminUpcomingMeals/></AdminRoute>,
                },
                {
                    path: 'allReviews',
                    element: <AdminRoute><AllReviews/></AdminRoute>,
                },
                {
                    path: 'serveMeals',
                    element: <AdminRoute><ServeMeals/></AdminRoute>,
                },
                {
                    path: 'manageUsers',
                    element: <AdminRoute><ManageUsers/></AdminRoute>
                },
            // ] 
            // :
            // [
                {
                    path: 'userProfile',
                    element: <PrivateRoute><UserProfile/></PrivateRoute>
                },
                {
                    path : 'requestMeals',
                    element: <PrivateRoute><UserRequestMeals/></PrivateRoute>,
                },
                {
                    path: 'myReview',
                    element: <PrivateRoute><MyReview/></PrivateRoute>,
                },
                {
                    path: 'paymentHistory',
                    element: <PrivateRoute><PaymentHistory/></PrivateRoute>
                }
            ]
            
        // ]
    }
])

export default router;