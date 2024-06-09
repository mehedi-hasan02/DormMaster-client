import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";
import { useRef, useState } from "react";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { users } = useAuth();
    const [searchText, setSearchText] = useState('');
    const [search, setSearch] = useState('');
    const formRef = useRef();

    const { data: manageUsers = [], refetch } = useQuery({
        queryKey: ['manageUsers', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
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

    const handleSearch = e => {
        e.preventDefault()
        setSearch(searchText);
        formRef.current.reset();
    }

    const handleReset = () => {
        setSearch('')
        setSearchText('')
    }

    return (
        <div className="overflow-x-auto">
            <div className="flex flex-col lg:flex-row md:flex-row gap-3">
                <form onSubmit={handleSearch} className="flex p-1 overflow-hidden border rounded-lg w-[300px] md:w-[330px] lg:w-[330px] mx-auto focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                    <input
                        className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                        type='text'
                        onChange={e => setSearchText(e.target.value)}
                        value={searchText}
                        name='search'
                        placeholder='Search'
                        aria-label='Search'
                    />
                    <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                        Search
                    </button>
                </form>
                <button onClick={handleReset} className='btn'>
                    Reset
                </button>
            </div>
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
                        manageUsers?.map((user, index) =>
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