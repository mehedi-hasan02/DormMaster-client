import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";


const UserRequestMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { users } = useAuth();

    const { data: requestMeals = [], refetch } = useQuery({
        queryKey: ['requestMeals', users?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/mealRequest/${users?.email}`);
            return res.data;
        }
    });

    const handelRemove = async (id) => {
        const res = await axiosSecure.delete(`/mealRequest/${id}`);
        if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Remove Request Meal",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Like</th>
                            <th>Review</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requestMeals.map((meal, index) =>
                                <tr key={meal._id}>
                                    <th>{index + 1}</th>
                                    <td>{meal.mealTitle}</td>
                                    <td>{meal.mealLike}</td>
                                    <td>{meal.mealReview}</td>
                                    <td>{meal.status}</td>
                                    <td>
                                        <button
                                            onClick={() => handelRemove(meal._id)}
                                            disabled={meal?.status === 'Delivered'}
                                            className="btn btn-sm bg-orange-400 text-white hover:bg-orange-400">
                                            <MdCancel />
                                        </button>
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

export default UserRequestMeals;