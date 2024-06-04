import { AiOutlineLike } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const UpcomingMealCard = ({ meal }) => {
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
                    <button className="flex items-center">
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