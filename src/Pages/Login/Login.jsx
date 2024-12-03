import { useContext, useEffect,  useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
    // console.log('stat in the location login page', location.state)
    // console.log(from)

    const {signIn} = useContext(AuthContext)

    useEffect(()=>{
        loadCaptchaEnginge(6)
    },[])

    const handleLogin =e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)
        signIn(email,password)
        .then(result => {
            const user = result.user;
            console.log(user)
            Swal.fire({
                title: "User login Succesful",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster ` },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster ` }
              });
              navigate(from)
        })
    }

    const handleValidateCaptcha = (e) =>{
        // const user_captcha_value =captchaRef.current.value;
        const user_captcha_value =e.target.value;
        console.log(user_captcha_value)
        if (validateCaptcha(user_captcha_value) === true) {
            setDisabled(false)
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login Now</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 lg:w-1/2 max-w-sm  shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input onBlur={handleValidateCaptcha} type="text"  name="captcha" placeholder="Type the text above " className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            {/* TODO : apply disable for re-captcha */}
                            <input disabled={false} type="submit" className="btn cursor-not-allowed btn-primary" value="Login" />
                        </div>
                    </form>
                    <h1 className=" px-10">New here <Link to='/SignUp' className='link text-blue-400'>SignUp</Link></h1>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;