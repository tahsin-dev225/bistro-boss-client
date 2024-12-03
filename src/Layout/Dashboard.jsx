import { FaAirFreshener, FaBook, FaCalendar,  FaEnvelope, FaHome, FaList, FaShoppingCart, FaUsers } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { PiFileArrowUp } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import { IoFastFood } from "react-icons/io5";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {

    const [cart] = useCart();

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* dashboard side bar */}
           <div className="w-64 min-h-screen bg-[#D1A054]">
                <p className="text-3xl  text-center text-black font-serif mt-3 ">Bistro Boss</p>
                <p className="text-xl text-center tracking-[5px] gap mb-3 text-black font-serif ">Rastaurant</p>
                <ul className="menu space-y-4">
                    
                    {
                        isAdmin ? <>
                            <li><NavLink className="text-black font-medium text-base font-serif" to="/dashboard/adminHome"><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink className="text-black font-medium text-base font-serif" to="/dashboard/addItems"><IoFastFood></IoFastFood> Add Items </NavLink></li>
                            <li><NavLink className="text-black font-medium text-base font-serif" to="/dashboard/manageItems"><FaList></FaList> Manage Items</NavLink></li>
                            <li><NavLink className="text-black font-medium text-base font-serif" to="/dashboard/manageBookings"><FaBook></FaBook> Manage Bookings</NavLink></li>
                            <li><NavLink className="text-black font-medium text-base font-serif" to="/dashboard/allUsers"><FaUsers></FaUsers> All Users</NavLink></li>
                        </>
                        :
                        <>
                            <li><NavLink className="text-black font-medium text-base font-serif" to="/dashboard/cart"><FaShoppingCart></FaShoppingCart> My Cart ({cart.length})</NavLink></li>
                            <li><NavLink className="text-black font-medium text-base font-serif" to="/dashboard/userHome"><FaHome></FaHome> User Home</NavLink></li>
                            <li><NavLink className="text-black font-medium text-base font-serif" to="/dashboard/history"><FaCalendar></FaCalendar> Payment History </NavLink></li>
                            <li><NavLink className="text-black font-medium text-base font-serif" to="/dashboard/review"><PiFileArrowUp></PiFileArrowUp> Add Review</NavLink></li>
                            <li><NavLink className="text-black font-medium text-base font-serif" to="/dashboard/paymentHistory"><FaAirFreshener></FaAirFreshener> Real Payment History</NavLink></li>
                        </>
                    }

                    <div className="w-[95%] mx-auto h-[1px] my-6 bg-gray-300"></div>

                    {/* shared navlinks */}
                        <li><NavLink className='text-black font-medium text-base font-serif' to="/"><FaHome></ FaHome>Home</NavLink></li>
                        <li><NavLink className='text-black font-medium text-base font-serif' to="/"><MdMenu></MdMenu> Menu</NavLink></li>
                        <li><NavLink className='text-black font-medium text-base font-serif' to="/"><FaShop></FaShop> Shop</NavLink></li>
                        <li><NavLink className='text-black font-medium text-base font-serif' to="/order/contact"><FaEnvelope></FaEnvelope> Contact</NavLink></li> 
                </ul>
           </div>
           {/* dashboard content */}
           <div className="flex-1 p-8">
                <Outlet></Outlet>
           </div>
       </div>
    );
};

export default Dashboard;