import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

;

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const {createUser,updateUserProfile} = useContext(AuthContext)
    const { register, handleSubmit,reset, formState: { errors } } = useForm()
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data)

        createUser(data.email , data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
            updateUserProfile(data.name,data.photo)
            .then(()=>{
                const userInfo ={
                    name: data.name,
                    email: data.email,
                }
                axiosPublic.post('/users', userInfo)
                .then(res =>{
                    if(res.data.insertedId){
                        reset();
                        console.log('get inderted id ')
                        Swal.fire({
                            position:'top-end',
                            icon:'success',
                            title:'user created successfully',
                            showConfirmButton: false,
                            timer:1500
                        })
                        navigate('/')
                    }
                })
            })
        })
    };

    return (
        <div className="hero py-20 bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up Now</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 lg:w-1/2 max-w-sm  shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name",{ required: true })} placeholder="Name" name="name" className="input input-bordered" />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type="text" {...register("photo",{ required: true })} placeholder="Photo url" name="photo" className="input input-bordered" />
                            {errors.photo && <span className="text-red-500">Photo url is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password",{ required: true ,minLength:6,})} placeholder="password" name="password" className="input input-bordered"/>
                            {errors.password?.type === 'required' && <span className="text-red-500">password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-500">password should above 6 characters</span>}
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn cursor-not-allowed btn-primary" value="Sign up" />
                        </div>
                    </form>
                    <h1 className=" px-10">Already have account? <Link to='/login' className='link text-blue-400'>Login</Link></h1>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default SignUp;