import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Featured from "./Featured/Featured";
import PopulerMenu from "./PopulerMenu/PopulerMenu";
import Testimonials from "./Testimonials/Testimonials";


const Home = () => {
    return (
        <div className="">
            <Helmet>
                <title>Bistro Boss</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopulerMenu></PopulerMenu>
            <div className="flex justify-center items-center bg-black py-24 p-10 my-24 shadow-lg rounded w-full">
                <h1 className="text-6xl font-serif">Call Us: +88 0192345678910</h1>
            </div>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;