import { useQuery } from "@tanstack/react-query";
import { FaCircleCheck } from "react-icons/fa6";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import MembershipCard from "./MembershipCard";

const Membership = () => {
    const axiosPublic = useAxiosPublic();

    const { data: plans = [] } = useQuery({
        queryKey: ['plans'],
        queryFn: async () => {
            const res = await axiosPublic.get('/plan');
            return res.data;
        }
    })
    return (
        <div className="my-8">
            <div className="mb-8">
                <h3 className="text-4xl font-bold text-center">Upgrade Membership</h3>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
                {
                    plans.map(plan=> <MembershipCard key={plan._id} plan={plan}></MembershipCard>)
                }
            </div>
        </div>
    );
};

export default Membership;