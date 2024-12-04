import axios from "axios";


const axiosPublic = axios.create({
    baseURL:'https://bistro-boss-server-rho-two.vercel.app',
    withCredentials:true
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;