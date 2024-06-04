import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const AllReviews = () => {
    const axiosSecure = useAxiosSecure();

    const {data: allReviews = []} = useQuery({
        queryKey: ['allReviewAdmin'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    })

    return (
        <div>
            <h1>All reviews</h1>
        </div>
    );
};

export default AllReviews;