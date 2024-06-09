import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { FaCircleCheck } from "react-icons/fa6";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheckOut from "./PaymentCheckOut";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const CheckOut = () => {
    const { name } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: singlePlan } = useQuery({
        queryKey: ['singlePlan', name],
        queryFn: async () => {
            const res = await axiosSecure.get(`/plan/${name}`);
            return res.data;
        }
    })

    return (
        <div className="lg:min-h-[660px]">
            <div className="flex justify-center ">
                <div className="px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800 w-[400px] h-72 mt-16">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <span className="text-2xl font-light text-gray-800 dark:text-gray-400">{singlePlan?.name}</span>
                            <p className="text-xl font-light text-white dark:text-white">${singlePlan?.price}</p>
                        </div>

                        <button className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">Upgrade</button>

                    </div>

                    <div className="dark:text-white space-y-2 mb-5">
                        {
                            singlePlan?.benefits?.map(benefit =>
                                <p key={singlePlan?._id} className="flex items-center gap-1"><FaCircleCheck className="dark:text-white" />{benefit}</p>
                            )
                        }
                    </div>
                </div>

            </div>
            <div className="w-3/4 mx-auto mt-10">
                <Elements stripe={stripePromise}>
                    <PaymentCheckOut price={singlePlan?.price}/>
                </Elements>
            </div>
        </div>
    );
};

export default CheckOut;