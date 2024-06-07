import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";


const UserProfile = () => {
    const { users } = useAuth();
    const axiosSecure = useAxiosSecure();
    const headingStyle = {
        color: '#151515',
        fontFamily: 'Cinzel',
        fontSize: '32px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
    };

    const { data: userData } = useQuery({
        queryKey: ['userData', users?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${users?.email}`);
            return res.data;
        }
    });

    return (
        <div className="mt-10 ml-20">
            <h3 style={headingStyle}>Welcome! {users?.displayName}</h3>
            <div className="flex mt-6">
                <div className="bg-[#FFEDD5] w-1/2 p-24 flex flex-col gap-4 justify-center items-center relative">
                    <p className="absolute top-2 right-2 badge badge-outline border border-primary">{userData?.membership}</p>
                    <div className="avatar">
                        <div className="w-36 rounded-full">
                            <img src={users?.photoURL} />
                        </div>
                    </div>
                    <div>
                        <h1 style={headingStyle}>{users?.displayName}</h1>
                        <p>{users?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;