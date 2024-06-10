import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useMeal from "../../../Hook/useMeal";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";

const AllReviews = () => {
    const axiosSecure = useAxiosSecure();
    // const [meals] = useMeal();

    const { data: allReviews = [], refetch } = useQuery({
        queryKey: ['allReviewAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    })

    const handelDelete = async (id) => {
        const res = await axiosSecure.delete(`/review/${id}`);
        if (res.data.deletedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Review successfully deleted",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <SectionTitle
                    subHeading='Total Review'
                    heading='All Reviews'
                ></SectionTitle>
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
                            allReviews.map((review, index) =>
                                <tr key={review._id}>
                                    <th>{index + 1}</th>
                                    <td>{review.mealTitle}</td>
                                    <td>{review.like}</td>
                                    <td>{review.reviewCount}</td>
                                    <td>
                                        <button
                                            onClick={() => handelDelete(review._id)}
                                            className="btn btn-sm bg-red-500 text-white">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                    <td>
                                        <Link to={`/mealDetail/${review.mealId}`}>
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