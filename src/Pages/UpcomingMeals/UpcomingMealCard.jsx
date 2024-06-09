import { AiOutlineLike } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";

const UpcomingMealCard = ({ meal, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { users } = useAuth();
    const handelLikeCount = async () => {
        const likeRes = await axiosSecure.patch(`upcomingMealLike/${meal._id}`);

        // if (meal.like >= 10) {
        //     const image = meal.image
        //     const title = meal.title
        //     const like = meal.like
        //     const review = meal.review
        //     const category = meal.category
        //     const price = meal.price
        //     const ingredients = meal.ingredients
        //     const rating = meal.rating
        //     const description = meal.description
        //     const adminName = meal.adminName
        //     const adminEmail = meal.adminEmail

        //     const mealItem = {
        //         title: title,
        //         category: category,
        //         image: image,
        //         price: price,
        //         ingredients: ingredients,
        //         rating: rating,
        //         like: like,
        //         review: review,
        //         description: description,
        //         adminName: adminName,
        //         adminEmail: adminEmail,
        //     }

        //     const mealRes = await axiosSecure.post('/meal', mealItem);
        //     console.log('Add meal',mealRes.data);

        //     const deleteUpcomingMeal = await axiosSecure.delete(`/upcomingMeal/${meal._id}`);
        //     console.log('Delete meal', deleteUpcomingMeal.data);
        // }
        refetch();
    }
    return (
        <div className="card bg-base-100 shadow-xl mb-5 mt-8">
            <img className="object-cover object-center w-full h-64" src={meal.image} alt="avatar" />
            <div className="card-body">
                <div className="flex items-center gap-14 h-14">
                    <h2 className="card-title">
                        {meal.title}
                    </h2>
                    <p className="badge badge-accent badge-outline">
                        {meal.mealStatus}
                    </p>
                </div>
                <div className="flex gap-14">
                    <button
                        onClick={handelLikeCount}
                        className="flex items-center">
                        <AiOutlineLike className="w-[20px] h-[20px]" />
                        {meal.like}
                    </button>
                    <p className="flex items-center gap-1">{meal.rating} <FaStar className="text-amber-500" /></p>
                </div>
                <p>Price: ${meal.price}</p>
                <p>Ingredients: {meal.ingredients}</p>
            </div>
        </div>
    );
};

export default UpcomingMealCard;