import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Cover from "../Shared/Cover/Cover";
import allMealsCover from '../../assets/banner/cover1.jpg';
import MealCard from "../Shared/MealCard/MealCard";

const UpcomingMeals = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const {data: upcomingMeals = []} = useQuery({
        queryKey: ['upcomingMeal'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/upcomingMeal');
            return res.data;
        }
    })


    return (
        <div>
            <Cover
                img={allMealsCover}
                title='CHOOSE YOUR MEAL'
            />
            <div className="grid lg:grid-cols-3 gap-8">
                {
                    upcomingMeals.map(upcomingMeal=><MealCard key={upcomingMeal._id} meal={upcomingMeal}></MealCard>)
                }
            </div>
        </div>
    );
};

export default UpcomingMeals;