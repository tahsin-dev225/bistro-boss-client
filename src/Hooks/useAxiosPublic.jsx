import axios from "axios";


const axiosPublic = axios.create({
    baseURL:'https://bistro-boss-server-kappa-ivory.vercel.app',
    withCredentials:true
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;