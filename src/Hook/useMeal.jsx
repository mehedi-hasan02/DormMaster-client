import useAxiosPublic from '../Hook/useAxiosPublic';
import { useQuery } from "@tanstack/react-query";

const useMeal = () => {
    const axiosPublic = useAxiosPublic();

    const { data: meals = [], refetch } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/meal')
            return res.data;
        }
    })

    return [meals, refetch];
};

export default useMeal;