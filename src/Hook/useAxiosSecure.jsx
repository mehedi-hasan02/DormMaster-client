import axios from "axios";

const axiosSecure = axios.create({
    // baseURL: 'https://hostel-management-system-server-tau.vercel.app'
    baseURL: 'http://localhost:8000'
})
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;