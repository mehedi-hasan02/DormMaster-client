import { useForm } from "react-hook-form";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";


const AddMeal = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async(data)=>{
        console.log(data);
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
                        <input type="text" placeholder="Meal name" className="input input-bordered w-full" {...register('recipeName', { required: true })} />
                        {errors.recipeName && <span className="text-red-500">This field is required</span>}
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
                        <input type="text" placeholder="Ingredients" className="input input-bordered w-full" {...register('recipeName', { required: true })} />
                        {errors.recipeName && <span className="text-red-500">This field is required</span>}
                    </label>
                    <div className="flex gap-8">
                    <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Rating</span>
                            </div>
                            <input type="number" placeholder="Rating" className="input input-bordered w-full" {...register('price', { required: true })} />
                            {errors.price && <span className="text-red-500">This field is required</span>}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Like</span>
                            </div>
                            <input type="number" placeholder="Like" className="input input-bordered w-full" {...register('price', { required: true })} />
                            {errors.price && <span className="text-red-500">This field is required</span>}
                        </label>

                    </div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <textarea type="text" placeholder="Description" className="textarea textarea-bordered w-full" {...register('recipe', { required: true })} />
                        {errors.recipe && <span className="text-red-500">This field is required</span>}
                    </label>
                    <div>
                        <input type="file" className="file-input file-input-ghost w-full max-w-xs" {...register('image', { required: true })} />
                    </div>
                    <div className="text-center">
                        <button style={buttonStyle} className="btn text-white">Add Item <FaUtensils /></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMeal;