import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://hostel-management-system-server-tau.vercel.app'
    // baseURL: 'http://localhost:8000'
})
const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log(token);
        config.headers.authorization = `Bearer ${token}`
        // console.log('request stop by interceptor ', token);
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')
        }
        console.log('permsion dinaied ', status);
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;