import { FaGoogle } from 'react-icons/fa';
import UseAuth from '../../Hooks/UseAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {googleSignIn} = UseAuth()
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handeleGoogleSignIn =()=>{
        googleSignIn()
        .then(result =>{
            console.log(result.user)
            const userInfo ={
                email: result.user?.email,
                name: result.user?.displayName,
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate('/');
            })
        })
    }

    return (
        <div>
            <div className="divider">or</div>
            <div className="flex my-3 ml-14">
                <button onClick={handeleGoogleSignIn} className='btn'><FaGoogle></FaGoogle> Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;