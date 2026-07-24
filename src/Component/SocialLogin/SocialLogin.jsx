import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handelGoogleLogin = async () => {
    try {
      const result = await googleLogin();

      const userInfo = {
        email: result.user.email,
        name: result.user.displayName,
        membership: "Bronze",
      };

      await axiosPublic.post("/users", userInfo);

      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (error) {
      //   console.error("Google Login Error:", error.code, error.message);

      if (error.code !== "auth/popup-closed-by-user") {
        toast.error(error.message);
      }
    }
  };
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
