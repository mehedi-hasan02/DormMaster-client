import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AllMeals from "../Pages/AllMeals/AllMeals";
import MealDetails from "../Pages/MealDetails/MealDetails";

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
            }
        ]
    }
])

export default router;