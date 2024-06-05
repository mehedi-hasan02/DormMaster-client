import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const ServeMeals = () => {
    const axiosSecure = useAxiosSecure();

    const { data: serveMeals = [], refetch } = useQuery({
        queryKey: ['serveMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/mealRequest');
            return res.data;
        }
    });

    const handelServe = async (id) => {
        console.log(id);
        const status = 'Delivered';
        const res = await axiosSecure.patch(`/mealRequest/${id}`, { status });
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Delivery Successful",
                showConfirmButton: false,
                timer: 1500
            });

        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="table text-center">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Meal Title</th>
                        <th>User Email</th>
                        <th>User Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        serveMeals.map((meal, index) =>
                            <tr key={meal._id}>
                                <th>{index + 1}</th>
                                <td>{meal.mealTitle}</td>
                                <td>{meal.userEmail}</td>
                                <td>{meal.userName}</td>
                                <td>{meal.status}</td>
                                <td>
                                    <button 
                                    disabled = {meal.status === 'Delivered'}
                                     onClick={() => handelServe(meal?._id)} className="btn bg-orange-400 hover:bg-orange-400 text-white">Serve</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ServeMeals;