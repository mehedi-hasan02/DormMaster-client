import { useForm } from "react-hook-form";
import { RxCrossCircled } from "react-icons/rx";

const ReviewModal = ({ review, onClose, onSubmit }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleFormSubmit = (data) => {
        onSubmit(data);
        reset();
        onClose();
    };

    const buttonStyle = {
        background: 'linear-gradient(90deg, #835D23 0%, #B58130 100%)',
    };

    return (
        <dialog id="my_modal_1" className="modal" open>
            <div className="modal-box relative">
                <div className="">
                    <form className="bg-[#F3F3F3] p-14 space-y-5" onSubmit={handleSubmit(handleFormSubmit)}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Your Review</span>
                            </div>
                            <input type="text" placeholder="Enter your review" defaultValue={review?.review} className="input input-bordered w-full" {...register('review', { required: true })} />
                            {errors.review && <span className="text-red-500">This field is required</span>}
                        </label>
                        <div className="text-center">
                            <button style={buttonStyle} className="btn text-white">Update Review</button>
                        </div>
                    </form>
                </div>
                <div>
                    <div className="modal-action">
                        <button className="btn btn-xl bg-orange-400 text-white hover:bg-orange-400 absolute top-0 right-0" onClick={onClose}>
                            <RxCrossCircled />
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
};

export default ReviewModal;
