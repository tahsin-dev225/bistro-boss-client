import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'


const Featured = () => {
    return (
        <div className="md:bg-fixed py-10 my-10" style={{backgroundImage: `url(${featuredImg})`}}>
            <SectionTitle heading={'featured item'} subHeading={'---Check it out---'}></SectionTitle>
            <div className="flex bg-slate-900 bg-opacity-5 justify-center items-center gap-5 py-8 px-16">
                <div className="">
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10 text-white">
                    <p className="font-medium">Aug 20, 2029</p>
                    <p className="uppercase my-1">where can i get some</p>
                    <p className="uppercase my-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos numquam adipisci deserunt quos cupiditate omnis quasi, incidunt alias! Eaque eum deserunt quam, error rerum maxime illum illo repellendus. Odio, nostrum?</p>
                    <button className="py-2 hover:bg-slate-700 my-3 px-4 border-b-2 rounded-md">Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;