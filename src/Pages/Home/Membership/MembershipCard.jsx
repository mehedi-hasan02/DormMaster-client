import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MembershipCard = ({ plan }) => {
    return (
        <div className="w-full px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800 h-64">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <span className="text-2xl font-light text-gray-800 dark:text-gray-400">{plan?.name}</span>
                    <p className="text-xl font-light text-white dark:text-white">${plan?.price}</p>
                </div>
                <Link to={`checkOut/${plan?.name}`}>
                    <button className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">Upgrade</button>
                </Link>
            </div>

            <div className="dark:text-white space-y-2 mb-5">
                {
                    plan?.benefits?.map(benefit =>
                        <p key={benefit} className="flex items-center gap-1"><FaCircleCheck className="dark:text-white" />{benefit}</p>
                    )
                }
            </div>
        </div>
    );
};

export default MembershipCard;