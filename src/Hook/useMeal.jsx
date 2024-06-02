import useAxiosPublic from '../Hook/useAxiosPublic';
import { useQuery } from "@tanstack/react-query";

const useMeal = () => {
    const axiosPublic = useAxiosPublic();

    const {data: meals = []} = useQuery({
        queryKey: ['meals'],
        queryFn: async()=>{
            const res =await axiosPublic.get('/meals')
            return res.data;
        }
    })

    
    return [meals];
};

export default useMeal;