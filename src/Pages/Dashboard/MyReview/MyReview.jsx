import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { RxCrossCircled } from "react-icons/rx";
import { useForm } from "react-hook-form";

const MyReview = () => {
    const axiosSecure = useAxiosSecure();
    const { users } = useAuth();
    const [selectedReview, setSelectedReview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    });

    const myReviews = reviews.filter(review => review.userEmail === users?.email);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleEdit = (review) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    const onSubmit = async (data) => {
        const res = await axiosSecure.patch(`/review/${selectedReview?._id}`, data);
        if (res.data.modifiedCount > 0) {
            reset();
            refetch();
            setIsModalOpen(false);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Review update successful",
                showConfirmButton: false,
                timer: 1500
              });
        }

    };

    const handleDelete = async (id) => {
        const res = await axiosSecure.delete(`/review/${id}`);
        if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your review successfully deleted",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const buttonStyle = {
        background: 'linear-gradient(90deg, #835D23 0%, #B58130 100%)',
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
                                        onClick={() => handleEdit(myReview)}
                                        className="btn btn-sm bg-orange-400 hover:bg-orange-400 text-white"
                                    >
                                        <FaRegEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(myReview._id)}
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

            {isModalOpen && (
                <dialog className="modal" open>
                    <div className="modal-box relative">
                        <form className="bg-[#F3F3F3] p-14 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Your Review</span>
                                </div>
                                <input
                                    type="text"
                                    defaultValue={selectedReview.review}
                                    placeholder="Enter your review"
                                    className="input input-bordered w-full"
                                    {...register('review', { required: true })}
                                />
                                {errors.review && <span className="text-red-500">This field is required</span>}
                            </label>
                            <div className="text-center">
                                <button style={buttonStyle} className="btn text-white">Update Review</button>
                            </div>
                        </form>
                        <div className="modal-action">
                            <button
                                className="btn btn-xl bg-orange-400 text-white hover:bg-orange-400 absolute top-0 right-0"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <RxCrossCircled />
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyReview;
