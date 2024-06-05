import { Link, useNavigate } from 'react-router-dom';
import registerBgImg from '../../assets/others/authentication.png';
import registerImg from '../../assets/others/authentication2.png';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../../Hook/useAuth';
import useAxiosPublic from '../../Hook/useAxiosPublic';


const Register = () => {
    const { createUser, handleUpdateProfile, logOut } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        const { name, email, password, photo } = data;

        createUser(email, password)
            .then(res => {
                handleUpdateProfile(name, photo)
                    .then(() => {
                        const userInfo = {
                            name,
                            email,
                            membership: 'Bronze',
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    logOut()
                                    toast.success('User created successfully');
                                    navigate('/login')
                                }
                            })
                    })

            })
            .catch(error => {
            })


    }
    return (
        <div className="hero min-h-screen bg-base-200">
            {/* <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet> */}
            <div style={{ backgroundImage: `url(${registerBgImg})` }} className="hero-content flex-col lg:flex-row-reverse shadow-2xl p-20">
                <div className="text-center lg:text-left">
                    <img src={registerImg} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm">
                    <h1 className="text-4xl text-center">Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Type here" className="input input-bordered" {...register("name", { required: true })} />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="Type here" className="input input-bordered" {...register("photo", { required: true })} />
                            {errors.photo && <span className="text-red-500">This field is required</span>}
                        </div>
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
                                <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="input input-bordered w-full" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}/

                                })} />
                                <span onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash className="absolute top-4 right-2 cursor-pointer"></FaEyeSlash> : <FaEye className="absolute top-4 right-2 cursor-pointer" />}
                                </span>

                            </div>
                            {errors.password?.type === 'required' && <span className="text-red-500">This field is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-500">Password minimum 6 character</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-500">Password must have uppercase,Lowercase,special character and number</span>}
                        </div>
                        <div>
                            <p>Already have an account? <Link to='/login' className="text-blue-500" >Login</Link></p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <div className='divider'></div>
                    <div className='text-center'>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;