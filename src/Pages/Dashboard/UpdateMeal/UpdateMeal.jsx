import { useForm } from "react-hook-form";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateMeal = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [updateImg, setUpdateImg] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const { data: updateMeal = [] } = useQuery({
        queryKey: ['updateMeal', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meal/${id}`)
            return res.data
        }
    });
    useEffect(() => {
        if (updateMeal.image) {
            setUpdateImg(updateMeal.image);
        }
        if (updateMeal.category) {
            setSelectedCategory(updateMeal.category)
        }
    }, [updateMeal])

    // const oldCategory = updateMeal?.category;
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // console.log(updateImg);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        let imageUrl = updateImg;

        if (data.image.length > 0) {
            const formData = new FormData();
            formData.append('image', data.image[0]);

            const res = await axiosPublic.post(image_hosting_api, formData);
            if (res.data.success) {
                imageUrl = res.data.data.display_url;
                setUpdateImg(imageUrl);
            }
        }

        const mealItem = {
            title: data.mealTitle,
            category: selectedCategory,
            image: imageUrl,
            price: data.price,
            ingredients: data.ingredients,
            rating: data.rating,
            like: data.like,
            description: data.description,
        };

        const mealRes = await axiosSecure.patch(`/meal/${id}`, mealItem);
        if (mealRes.data.modifiedCount > 0) {
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Meal item update successful",
                showConfirmButton: false,
                timer: 1500
            });
        }
        console.log(mealRes.data);
    };

    // const onSubmit = async (data) => {
    //     const imageFile = { image: data.image[0] };
    //     const res = await axiosPublic.post(image_hosting_api, imageFile, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
    //     if (res.data.success) {
    //         setUpdateImg(res.data.data.display_url);
    //     }
    //     const mealItem = {
    //         title: data.mealTitle,
    //         category: data.category,
    //         image: updateImg,
    //         price: data.price,
    //         ingredients: data.ingredients,
    //         rating: data.rating,
    //         like: data.like,
    //         description: data.description,
    //     }
    //     const mealRes = await axiosSecure.patch(`/meal/${id}`, mealItem)
    //     if (mealRes.data.modifiedCount > 0) {
    //         reset()
    //         Swal.fire({
    //             position: "top-end",
    //             icon: "success",
    //             title: "Mealc item update successful",
    //             showConfirmButton: false,
    //             timer: 1500
    //         });
    //     }
    //     console.log(mealRes.data);
    //     console.log(res.data);
    // }

    const buttonStyle = {
        background: 'linear-gradient(90deg, #835D23 0%, #B58130 100%)',
    };
    return (
        <div>
            <SectionTitle heading='Update Meal' subHeading="What's new?" />

            <div className="lg:ml-28">
                <form className="bg-[#F3F3F3] p-14 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Meal name</span>
                        </div>
                        <input type="text" placeholder="Meal Title" defaultValue={updateMeal?.title} className="input input-bordered w-full" {...register('mealTitle', { required: true })} />
                        {errors.mealTitle && <span className="text-red-500">This field is required</span>}
                    </label>

                    <div className="flex gap-8">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category</span>
                            </div>
                            <select className="select select-bordered w-full " onChange={handleCategoryChange} value={selectedCategory} required>
                            <option value='Breakfast'>Breakfast</option>
                                <option value='Lunch'>Lunch</option>
                                <option value='Dinner'>Dinner</option>

                            </select>
                            {/* <select
                                className="select select-bordered w-full"
                                onChange={handleCategoryChange}
                                value={selectedCategory}
                                required
                            >
                                <option value='Breakfast'>Breakfast</option>
                                <option value='Lunch'>Lunch</option>
                                <option value='Dinner'>Dinner</option>
                            </select> */}
                            {/* {errors.category && <span className="text-red-500">This field is required</span>} */}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input type="number" placeholder="Price" defaultValue={updateMeal?.price} className="input input-bordered w-full" {...register('price', { required: true })} />
                            {errors.price && <span className="text-red-500">This field is required</span>}
                        </label>

                    </div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Ingredients</span>
                        </div>
                        <input type="text" placeholder="Ingredients" defaultValue={updateMeal?.ingredients} className="input input-bordered w-full" {...register('ingredients', { required: true })} />
                        {errors.ingredients && <span className="text-red-500">This field is required</span>}
                    </label>
                    <div className="flex gap-8">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Rating</span>
                            </div>
                            <input type="number" placeholder="Rating" defaultValue={updateMeal?.rating} className="input input-bordered w-full" {...register('rating', { required: true })} />
                            {errors.rating && <span className="text-red-500">This field is required</span>}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Like</span>
                            </div>
                            <input type="number" placeholder="Like" defaultValue={updateMeal?.like} className="input input-bordered w-full" {...register('like', { required: true })} />
                            {errors.like && <span className="text-red-500">This field is required</span>}
                        </label>

                    </div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <textarea type="text" placeholder="Description" defaultValue={updateMeal?.description} className="textarea textarea-bordered w-full" {...register('description', { required: true })} />
                        {errors.description && <span className="text-red-500">This field is required</span>}
                    </label>
                    <div>
                        <input type="file" defaultValue={updateMeal?.image} className="file-input file-input-ghost w-full max-w-xs" {...register('image')} />
                    </div>
                    <div className="text-center">
                        <button style={buttonStyle} className="btn text-white">Update Meal <FaUtensils /></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMeal;