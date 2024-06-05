import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { users } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [users?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${users.email}`)
            // console.log(res.data);
            return res.data?.admin
        }
    })
    return [isAdmin,isAdminLoading]
};

export default useAdmin;