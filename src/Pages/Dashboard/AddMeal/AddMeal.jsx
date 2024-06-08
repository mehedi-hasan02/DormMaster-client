import { useForm } from "react-hook-form";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddMeal = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { users } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

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
                adminName: users.displayName,
                adminEmail: users.email,

            }

            const mealRes = await axiosSecure.post('/meal', mealItem);
            if (mealRes.data.insertedId) {
                reset();
                Swal.fire({
                    icon: "success",
                    title: "Meal item added successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    const buttonStyle = {
        background: 'linear-gradient(90deg, #835D23 0%, #B58130 100%)',
    };
    return (
        <div>
            <SectionTitle heading='Add a Meal' subHeading="---What's new?---" />

            <div className="lg:ml-28">
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
                        <input type="file" className="file-input file-input-ghost w-full max-w-xs" {...register('image', { required: true })} />
                    </div>
                    <div className="text-center">
                        <button style={buttonStyle} className="btn text-white">Add Meal <FaUtensils /></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMeal;