import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { users } = useAuth();

    const { data: manageUsers = [], refetch } = useQuery({
        queryKey: ['manageUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handelMakeAdmin = async (id) => {
        const res = await axiosSecure.patch(`/users/admin/${id}`);
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${users.displayName} is Admin now`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handelDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `${users.displayName} has been deleted`,
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    return (
        <div className="overflow-x-auto">
            <table className="table text-center">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Membership</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        manageUsers.map((user, index) =>
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' :
                                        <button
                                            onClick={() => handelMakeAdmin(user._id)}
                                            className="btn btn-lg bg-orange-500 hover:bg-orange-500 text-white">
                                            <FaUsers></FaUsers>
                                        </button>}
                                </td>
                                <td>{user.membership}</td>
                                <td>
                                    <button
                                        onClick={() => handelDeleteUser(user._id)}
                                        className="btn btn-lg bg-red-500 hover:bg-red-500 text-white">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;