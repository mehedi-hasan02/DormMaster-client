import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import useAxiosSecure from '../../../Hook/useAxiosSecure'
import useAuth from "../../../Hook/useAuth";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AdminUpcomingMeals = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [sortOrder, setSortOrder] = useState(null);
    const { users } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const mealItem = {
                title: data.mealTitle,
                category: data.category,
                image: res.data.data.display_url,
                price: parseFloat(data.price),
                ingredients: data.ingredients,
                rating: parseFloat(data.rating),
                like: parseInt(data.like),
                review: parseInt(data.review),
                description: data.description,
                mealStatus: 'Upcoming',
                adminName: users.displayName,
                adminEmail: users.email,
            }

            const mealRes = await axiosSecure.post('/upcomingMeal', mealItem);
            if (mealRes.data.insertedId) {
                reset();
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Meal item added successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    const { data: upcomingMeals = [], refetch } = useQuery({
        queryKey: ['upcomingAdminMeals', sortOrder],
        queryFn: async () => {
            const res = await axiosSecure.get('/upcomingMeal');
            let mealsData = res.data;
            if (sortOrder === 'like') {
                mealsData = mealsData.sort((a, b) => b.like - a.like);
            }
            return mealsData;
        }
    })

    const handelPublish = async (id) => {
        const res = await axiosSecure.get(`/upcomingMeal/${id}`);
        const publishMeals = res.data;
        // const adminName = users?.displayName;
        // const adminEmail = users?.email;

        const { title, category, image, price, ingredients, rating, like, description } = publishMeals;
        const mealItem = {
            title: title,
            category: category,
            image: image,
            price: price,
            ingredients: ingredients,
            rating: rating,
            like: like,
            // review: review,
            description: description,
            adminName: users?.displayName,
            adminEmail: users?.email,

        }

        const mealRes = await axiosSecure.post('/meal', mealItem);
        if (mealRes.data.insertedId) {
            reset();
            Swal.fire({
                icon: "success",
                title: "Meal item publish successful",
                showConfirmButton: false,
                timer: 1500
            });

            axiosSecure.delete(`/upcomingMeal/${id}`)
                .then(() => {
                    refetch();
                    console.log('delete success');
                })
        }
    }


    const buttonStyle = {
        background: 'linear-gradient(90deg, #835D23 0%, #B58130 100%)',
    };
    return (
        <div>
            <SectionTitle
                subHeading='New Meal'
                heading='Upcoming Meals'
            ></SectionTitle>
            <div className="flex justify-between items-center mx-8">
                <div>
                    <details className="dropdown">
                        <summary className="m-1 btn bg-orange-400 text-white hover:bg-orange-400">Sort By</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-black/50 text-white rounded-box w-52">
                            <li>
                                <button onClick={() => setSortOrder('like')}>Like</button>
                            </li>
                        </ul>
                    </details>
                </div>
                <div>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn bg-orange-400 text-white hover:bg-orange-400" onClick={() => document.getElementById('my_modal_1').showModal()}>Add Upcoming Meal</button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box relative">
                            <div className="">
                                <form className="bg-[#F3F3F3] p-14 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Meal name</span>
                                        </div>
                                        <input type="text" placeholder="Meal Title" className="input input-bordered w-full" {...register('mealTitle', { required: true })} />
                                        {errors.mealTitle && <span className="text-red-500">This field is required</span>}
                                    </label>

                                    <div className="flex gap-8">
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Category</span>
                                            </div>
                                            <select defaultValue='default' className="select select-bordered w-full" {...register('category', { required: true })}>
                                                <option disabled value='default'>Select Category</option>
                                                <option value='Breakfast'>Breakfast</option>
                                                <option value='Lunch'>Lunch</option>
                                                <option value='Dinner'>Dinner</option>
                                            </select>
                                            {errors.category && <span className="text-red-500">This field is required</span>}
                                        </label>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Price</span>
                                            </div>
                                            <input type="number" placeholder="Price" className="input input-bordered w-full" {...register('price', { required: true })} />
                                            {errors.price && <span className="text-red-500">This field is required</span>}
                                        </label>

                                    </div>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Ingredients</span>
                                        </div>
                                        <input type="text" placeholder="Ingredients" className="input input-bordered w-full" {...register('ingredients', { required: true })} />
                                        {errors.ingredients && <span className="text-red-500">This field is required</span>}
                                    </label>
                                    <div className="flex gap-8">
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Rating</span>
                                            </div>
                                            <input type="number" placeholder="Rating" className="input input-bordered w-full" {...register('rating', { required: true })} />
                                            {errors.rating && <span className="text-red-500">This field is required</span>}
                                        </label>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Like</span>
                                            </div>
                                            <input type="number" placeholder="Like" className="input input-bordered w-full" {...register('like', { required: true })} />
                                            {errors.like && <span className="text-red-500">This field is required</span>}
                                        </label>

                                    </div>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Review</span>
                                        </div>
                                        <input type="number" placeholder="Review" className="input input-bordered w-full" {...register('review', { required: true })} />
                                        {errors.review && <span className="text-red-500">This field is required</span>}
                                    </label>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Description</span>
                                        </div>
                                        <textarea type="text" placeholder="Description" className="textarea textarea-bordered w-full" {...register('description', { required: true })} />
                                        {errors.description && <span className="text-red-500">This field is required</span>}
                                    </label>
                                    <div>
                                        <input type="file" className="file-input file-input-ghost w-full max-w-xs" {...register('image')} />
                                    </div>
                                    <div className="text-center">
                                        <button style={buttonStyle} className="btn text-white">Add Meal <FaUtensils /></button>
                                    </div>
                                </form>
                            </div>
                            <div >
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn btn-xl bg-orange-400 text-white hover:bg-orange-400 absolute top-0 right-0"><RxCrossCircled /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table text-center">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Like</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                upcomingMeals.map((meals, index) =>
                                    <tr key={meals._id}>
                                        <th>{index + 1}</th>
                                        <td>{meals.title}</td>
                                        <td>${meals.price}</td>
                                        <td>{meals.rating}</td>
                                        <td>{meals.like}</td>
                                        <td>
                                            <button
                                                disabled={meals.like < 10}
                                                onClick={() => handelPublish(meals._id)}
                                                className="btn bg-orange-400 text-white hover:bg-orange-400">
                                                Publish
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUpcomingMeals;