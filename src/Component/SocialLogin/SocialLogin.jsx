import { useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
    const { googleLogin } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handelGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    membership: 'Bronze'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        toast.success('Login successful')
                        navigate('/')
                    })

            })
    }
    return (
        <div>
            <div>
                <button onClick={handelGoogleLogin} className="btn">
                    <FaGoogle />
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;