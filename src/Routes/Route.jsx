import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AllMeals from "../Pages/AllMeals/AllMeals";
import MealDetails from "../Pages/MealDetails/MealDetails";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import AddMeal from "../Pages/Dashboard/AddMeal/AddMeal";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: 'meals',
                element: <AllMeals/>,
            },
            {
                path: 'mealDetail/:id',
                element: <MealDetails/>,
                // loader: ({params})=>fetch(`meals.json/${params.id}`)
            },
            {
                path: 'login',
                element: <Login/>,
            },
            {
                path: 'register',
                element: <Register/>,
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard/>,
        children: [
            //admin route
            {
                path: 'addMeal',
                element: <AddMeal/>
            }
        ]
    }
])

export default router;