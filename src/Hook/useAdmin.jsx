import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { users } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', users?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${users.email}`)
            return res.data?.admin
        }
    })
    return [isAdmin,isAdminLoading]
};

export default useAdmin;