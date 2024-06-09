import { useState } from 'react';
import useAxiosPublic from '../Hook/useAxiosPublic';
import { useQuery } from "@tanstack/react-query";

const useMeal = () => {
    const axiosPublic = useAxiosPublic();
    const [filter, setFilter] = useState('');
    const [searchText, setSearchText] = useState('');
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const { data: meals = [], refetch } = useQuery({
        queryKey: ['meals',filter,search,minPrice,maxPrice],
        queryFn: async () => {
            // const res = await axiosPublic.get('/meal')
            const res = await axiosPublic.get(`/meal?filter=${filter}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
            return res.data;
        }
    })

    return [meals, refetch,filter,setFilter,setSearch,searchText,setSearchText,minPrice,setMinPrice,maxPrice,setMaxPrice];
};

export default useMeal;