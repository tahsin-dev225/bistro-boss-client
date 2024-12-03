import { useContext } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaCartPlus } from "react-icons/fa6";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";


const Navbar = () => {
    const {user,logOut} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isAdmin] = useAdmin();
    const [cart] = useCart();

    const handleLogOUt =() =>{
        logOut()
        .then(() => {
            console.log('user logged out')
            navigate('/')
        })
        .catch( error =>{
            console.error(error)
        })
    }

    const navOptions = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/menu'>Our Menu</NavLink></li>
    {
        user && isAdmin && <li><NavLink to='/dashboard/adminHome'>Dashboard</NavLink></li>
    }
    {
        user && !isAdmin && <li><NavLink to='/dashboard/userHome'>Dashboardd</NavLink></li>
    }
    <li><NavLink to='/order/salad'>Our Shop</NavLink></li>
    <li >
        <NavLink className='' to='/dashboard/cart'>
            <button className="flex items-center justify-center gap-1 ">
                <FaCartPlus ></FaCartPlus>
                <div className="badge badge-secondary">+{cart.length}</div>
            </button>
        </NavLink>
    </li>
    {
        user ?<>
           <button className="hover:bg-red-900 hover:px-3 hover:rounded" onClick={handleLogOUt}>Log out</button>
        </>:
        <> <li><NavLink to='/login'>Login</NavLink></li></>
        }
    </>

    return (
        
            <div className="navbar justify-center bg-black fixed left-0 right-0 z-10 bg-opacity-25 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navOptions}
                    </ul>
                    </div>
                    <a className="btn btn-ghost text-white text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu text-white menu-horizontal px-1">
                    {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Get started</a>
                </div>
            </div>
        
    );
};

export default Navbar;