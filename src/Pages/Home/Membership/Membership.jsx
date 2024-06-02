import { FaCircleCheck } from "react-icons/fa6";

const Membership = () => {
    return (
        <div className="my-8">
            <div className="mb-8">
                <h3 className="text-4xl font-bold text-center">Upgrade Membership</h3>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="w-full px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <span className="text-2xl font-light text-gray-800 dark:text-gray-400">Silver</span>
                            <p className="text-xl font-light text-white dark:text-white">$10</p>
                        </div>
                        <button className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">Upgrade</button>
                    </div>

                    <div className="dark:text-white space-y-2 mb-5">
                        <p className="flex items-center gap-1"><FaCircleCheck className="dark:text-white" /> Enjoy a small discount on all meals</p>
                        <p className="flex items-center gap-1"><FaCircleCheck className="dark:text-white" /> Reserve meals in advance</p>
                        <p className="flex items-center gap-1"><FaCircleCheck className="dark:text-white" /> Weekly set meals at a discounted rate</p>
                    </div>
                </div>
                <div className="w-full px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <span className="text-2xl font-light text-gray-800 dark:text-gray-400">Gold</span>
                            <p className="text-xl font-light text-white dark:text-white">$30</p>
                        </div>
                        <button className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">Upgrade</button>
                    </div>

                    <div className="dark:text-white space-y-2 mb-5">
                        <p className="flex items-center gap-1"><FaCircleCheck className="dark:text-white" /> Larger discount on all meals purchased</p>
                        <p className="flex items-center gap-1"><FaCircleCheck className="dark:text-white" /> Extra weekly meals with carry-over option</p>
                        <p className="flex items-center gap-1"><FaCircleCheck className="dark:text-white" /> Add options and sides to your meals</p>
                        <p className="flex items-center gap-1"><FaCircleCheck className="dark:text-white" /> Bring a guest at a discounted rate</p>
                    </div>
                </div>
                <div className="w-full px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <span className="text-2xl font-light text-gray-800 dark:text-gray-400">Platinum</span>
                            <p className="text-xl font-light text-white dark:text-white">$50</p>
                        </div>
                        <button className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">Upgrade</button>
                    </div>

                    <div className="dark:text-white space-y-2 mb-5">
                        <p className="flex items-center gap-1"><FaCircleCheck className="dark:text-white" /> Maximum discount on all meals purchased</p>
                        <p className="flex items-center gap-1"><FaCircleCheck className="dark:text-white" /> No restrictions on the number of meals per week</p>
                        <p className="flex items-center gap-1"><FaCircleCheck className="dark:text-white" /> Faster service to reduce wait times</p>
                        <p className="flex items-center gap-1"><FaCircleCheck className="dark:text-white" /> Access to meals by a personal chef for special occasions</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Membership;