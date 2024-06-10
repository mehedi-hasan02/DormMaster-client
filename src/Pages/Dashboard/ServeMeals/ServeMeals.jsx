import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const ServeMeals = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');
    const [search, setSearch] = useState('');

    const { data: serveMeals = [], refetch } = useQuery({
        queryKey: ['serveMeals', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/mealRequest?search=${search}`);
            return res.data;
        }
    });

    const handelServe = async (id) => {
        console.log(id);
        const status = 'Delivered';
        const res = await axiosSecure.patch(`/mealRequest/${id}`, { status });
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Delivery Successful",
                showConfirmButton: false,
                timer: 1500
            });

        }
    }

    const handleSearch = e => {
        e.preventDefault()
        setSearch(searchText);
    }

    const handleReset = () => {
        setSearch('')
        setSearchText('')
    }

    return (
        <div className="overflow-x-auto">
            <div className="flex flex-col lg:flex-row md:flex-row gap-3 mb-5">
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
                    <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-[#a97d51] rounded-md hover:bg-[#a97d51] focus:bg-[#a97d51] focus:outline-none'>
                        Search
                    </button>
                </form>
                <div className="text-center">
                    <button onClick={handleReset} className='btn bg-orange-400 hover:bg-orange-400 text-white lg:mr-12 w-40'>
                        Reset
                    </button>
                </div>
            </div>
            <table className="table text-center">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Meal Title</th>
                        <th>User Email</th>
                        <th>User Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        serveMeals.map((meal, index) =>
                            <tr key={meal._id}>
                                <th>{index + 1}</th>
                                <td>{meal.mealTitle}</td>
                                <td>{meal.userEmail}</td>
                                <td>{meal.userName}</td>
                                <td>{meal.status}</td>
                                <td>
                                    <button
                                        disabled={meal.status === 'Delivered'}
                                        onClick={() => handelServe(meal?._id)} className="btn bg-orange-400 hover:bg-orange-400 text-white">Serve</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ServeMeals;