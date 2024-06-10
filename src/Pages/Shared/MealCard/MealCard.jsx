import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";


const MealCard = ({ meal }) => {
    return (
        <div className="card bg-base-100 shadow-xl mb-5">
            <figure><img className="object-cover object-center w-full h-64" src={meal.image} alt="Meals" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {meal.title}
                </h2>
                <div className="flex gap-5">
                    <p>Price: ${meal.price}</p>
                    <p className="flex items-center">Rating: {meal.rating}<FaStar className="text-amber-500" /></p>
                </div>
                <div>
                    {
                        meal.description.length > 100 ?
                        <p>{meal.description.slice(0,100)}...</p>:
                        <p>{meal.description}</p>
                    }
                </div>
                <div className="card-actions justify-end">
                    <Link to={`/mealDetail/${meal._id}`}>
                        <button className="badge badge-outline">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MealCard;