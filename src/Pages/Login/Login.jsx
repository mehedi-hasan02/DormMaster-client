import loginImg from '../../assets/others/authentication2.png'
import loginBgImg from '../../assets/others/authentication.png'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../Hook/useAuth';
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SocialLogin from '../../Component/SocialLogin/SocialLogin';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuth();
    const [logInError, setLogInError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const { email, password, captcha } = data;
        if (validateCaptcha(captcha)) {
            setLogInError('')
            signIn(email, password)
                .then(result => {
                    const user = result.user
                    // console.log(user);
                    toast.success('Login Successful')
                    navigate(from, { replace: true })
                })
                .catch((error) => {
                    
                    {
                        toast.error('Invalid Email and Password');
                    }
                })
        } else {
            setLogInError('Captcha wrong');
        }
    }

    // const handelLogin = e => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     const captcha = form.captcha.value;
    //     if (validateCaptcha(captcha)) {
    //         signIn(email, password)
    //             .then(result => {
    //                 const user = result.user
    //                 // console.log(user);
    //                 toast.success('Login Successful')
    //                 navigate(from, { replace: true })
    //             })
    //             .catch((error) => {
    //                 setLogInError(error.message)
    //                 {
    //                     logInError && toast.error('Invalid Email and Password');
    //                 }
    //             })
    //     } else {
    //         alert('wrong')
    //     }



    // }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div style={{ backgroundImage: `url(${loginBgImg})` }} className="hero-content flex-col lg:flex-row shadow-2xl p-20">
                <div className="text-center lg:text-left">
                    <img src={loginImg} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm">
                    <h1 className="text-4xl text-center">Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="flex items-center w-full relative">
                                <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="input input-bordered w-full" {...register("password", { required: true })} />
                                <span onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash className="absolute top-4 right-2 cursor-pointer"></FaEyeSlash> : <FaEye className="absolute top-4 right-2 cursor-pointer" />}
                                </span>
                            </div>
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input type="text" name="captcha" placeholder="Type here" className="input input-bordered" {...register("captcha", { required: true })} />
                            {errors.captcha && <span className="text-red-500">This field is required</span>}
                            {logInError && <span className='text-red-500'>{logInError}</span>}
                        </div>
                        <div>
                            <p>Don't have an account <Link to='/register' className='text-blue-500'>Sign Up</Link></p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className='divider'></div>
                    <div className='text-center'>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;