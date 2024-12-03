import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div>
            <footer className="mt-12 border-t-[1px] border-r-[1px] border-l-[1px] border-slate-500 text-neutral-content ">
                <div className="grid grid-cols-2 ">
                    <div className="bg-[#1F2937] flex justify-end">
                        <div className="p-10 pr-20">
                            <h1 className="my-4 text-center text-2xl uppercase font-medium">CONTACT US</h1>
                            <div className="font-thin text-center">
                                <p className="">
                                123 ABS Street, Uni 21, Bangladesh
                                </p>
                                <p className="">+88 123456789</p>
                                <p className="">Mon - Fri: 08:00 - 22:00</p>
                                <p className="">Sat - Sun: 10:00 - 23:00</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#111827] flex">
                        <div className="p-10 pl-20">
                            <h1 className="my-4 text-center text-2xl uppercase font-medium">Follow US</h1>
                            <p className="font-thin text-center">Join us on social media</p>
                            <div className="flex justify-center text-white gap-4 my-2">
                                <h1 className="text-2xl "><FaFacebookF /></h1>
                                <h1 className="text-2xl "><FaInstagram /></h1>
                                <h1 className="text-2xl "><FaTwitter /></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer bg-black footer-center text-gray-300 p-4">
                    <aside>
                        <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
                    </aside>
                </div>
            </footer>
        </div>
    );
};

export default Footer;