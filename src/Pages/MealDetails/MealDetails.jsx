import { AiOutlineLike } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";

const MealDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const {users} = useAuth();

    const { data: mealDetail = [] } = useQuery({
        queryKey: ['mealDetails', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meal/${id}`);
            // console.log(res.data);
            return res.data;
        }
    });


    const handelReview = async (e) => {
        e.preventDefault();

        const form = e.target;
        const review = form.review.value;
        const mealId = mealDetail._id;


        const reviewData = { review, mealId };
        const res = await axiosSecure.post('/review', reviewData);
        refetch();
        form.reset();
        console.log(res.data);
    }

    const { data: allReview = [], refetch } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review/${mealDetail?._id}`);
            return res.data;
        }
    })

    const handelMealRequest = async() =>{
        const userEmail = users?.email;
        const mealTitle = mealDetail?.title;
        const mealLike = mealDetail?.like;
        const mealReview = allReview?.length;
        const status = 'Pending';

        const requestData = {userEmail,mealTitle,mealLike,mealReview,status};

        const res = await axiosSecure.post('/mealRequest', requestData);
        console.log(res.data);
    }

    // console.log(allReview);

    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto">
                    {/* <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">From the blog</h1> */}

                    <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
                        <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={mealDetail.image} alt="" />

                        <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                            <div className="flex items-center mt-6">
                                <img className="object-cover object-center w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="" />

                                <div className="mx-4">
                                    <h1 className="text-sm text-gray-700 dark:text-gray-200">Mehedi Hasan</h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Meal Distributor</p>
                                </div>
                            </div>
                            {/* <p className="text-sm text-blue-500 uppercase">Mehedi Hasan</p> */}

                            <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                                Description: {mealDetail.description}
                            </p>

                            <p className="text-white">
                                Ingredients: {mealDetail.ingredients}
                            </p>
                            <div className="text-white flex gap-5">
                                <button className="flex items-center">
                                    <AiOutlineLike /> {mealDetail.like}
                                </button>
                                <p className="flex items-center gap-2">
                                    {mealDetail.rating} <FaStar className="text-amber-500" />
                                </p>
                                <p>
                                    Total review: {allReview.length}
                                </p>
                            </div>
                            <div className="text-white">
                                <button onClick={handelMealRequest} className="btn btn-outline border border-white text-white">
                                    Request Meal
                                </button>
                            </div>


                        </div>
                    </div>
                </div>

            </section>
            <div className="mt-10">
                <form onSubmit={handelReview} className="relative">
                    {/* <label className="label">
                        <span className="label-text text-xl font-semibold">Comment</span>
                    </label> */}
                    <textarea name="review" placeholder="Add Review" className="textarea border-b-2 border-black w-full h-[50px]" required></textarea>
                    <button className="btn absolute right-0 text-white bg-red-500 hover:bg-red-500">Add Review</button>
                </form>
            </div>
            {/* <div className="mt-5 mb-5">
                {
                    allReview?.map(review =>
                        <div key={review?._id} className="flex items-center gap-x-5 space-y-5">
                            <img className="object-cover w-16 h-16 rounded-full bg-cover bg-center" src={review?.image} alt="" />

                            <div className="">
                                <h1 className="text-xl font-semibold  capitalize ">{review?.name}</h1>
                                <p className="text-black">{review?.review}</p>
                            </div>
                        </div>
                    )
                }
            </div> */}
        </div>
    );
};

export default MealDetails;