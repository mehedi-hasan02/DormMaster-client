import { Link } from "react-router-dom";
import useMeal from "../../../Hook/useMeal";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";


const AdminAllMeals = () => {
    const [meals] = useMeal();
    const {users} = useAuth();
    return (
        <div className="overflow-x-auto">
            <table className="table text-center">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Like</th>
                        <th>Review</th>
                        <th>Distributor</th>
                        <th>Action</th>
                        <th>Action</th>
                        <th>Action</th>
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
                                <td>{meal.adminName}</td>
                                <td>
                                    <Link to={`/dashboard/updateMeal/${meal._id}`}>
                                        <button className="btn btn-ghost btn-lg bg-orange-400"><FaRegEdit /></button>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-lg bg-red-500"><FaTrashAlt /></button>
                                </td>
                                <td>
                                    <Link>
                                        <button className="btn btn-ghost text-orange-400">View Meal</button>
                                    </Link>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AdminAllMeals;