import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import Swal from "sweetalert2";

const MyReview = () => {
    const axiosSecure = useAxiosSecure();
    const { users } = useAuth();
    const [selectedReview, setSelectedReview] = useState(null);

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    });

    const myReviews = reviews.filter(review => review.userEmail === users?.email);

    const handleEdit = async (id) => {
        const response = await axiosSecure.get(`/review/${id}`);
        const result = await response.data;
        setSelectedReview(result);
    };

    const handleUpdate = async (data) => {
        await axiosSecure.patch(`/review/${selectedReview._id}`, data);
        setSelectedReview(null);
        refetch();
    };

    const handelDelete = async(id) =>{
        const res = await axiosSecure.delete(`/review/${id}`);
        if(res.data.deletedCount > 0)
            {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your review successfully deleted",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
    }

    const closeModal = () => {
        setSelectedReview(null);
    };


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Like</th>
                            <th>Review</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myReviews.map((myReview, index) => (
                            <tr key={myReview._id}>
                                <th>{index + 1}</th>
                                <td>{myReview.mealTitle}</td>
                                <td>{myReview.like}</td>
                                <td>{myReview.review}</td>
                                <td className="flex space-x-2">
                                    <button
                                    onClick={()=>handleEdit(myReview._id)}
                                        className="btn btn-sm bg-orange-400 hover:bg-orange-400 text-white"
                                    >
                                        <FaRegEdit />
                                    </button>
                                    <button
                                    onClick={()=>handelDelete(myReview._id)}
                                        className="btn btn-sm bg-red-600 hover:bg-red-600 text-white"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                    <Link to={`/mealDetail/${myReview.mealId}`}>
                                        <button className="btn btn-sm bg-orange-400 hover:bg-orange-400 text-white">
                                            View Meal
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedReview && (
                <ReviewModal
                    review={selectedReview}
                    onClose={closeModal}
                    onSubmit={handleUpdate}
                />
            )}
        </div>
    );
};

export default MyReview;
