import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useMeal from "../../../Hook/useMeal";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllReviews = () => {
    const axiosSecure = useAxiosSecure();
    const [meals] = useMeal();

    // const {data: allReviews = []} = useQuery({
    //     queryKey: ['allReviewAdmin'],
    //     queryFn: async()=>{
    //         const res = await axiosSecure.get('/reviews');
    //         return res.data;
    //     }
    // })

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Total Reviews</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            meals.map((meal, index) =>
                                <tr key={meal._id}>
                                    <th>{index + 1}</th>
                                    <td>{meal.title}</td>
                                    <td>{meal.like}</td>
                                    <td>{meal.review}</td>
                                    <td>
                                        <button className="btn btn-sm bg-red-500 text-white">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                    <td>
                                        <Link to={`/mealDetail/${meal._id}`}>
                                            <button className="btn bg-orange-400 text-white">
                                                View Meal
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReviews;