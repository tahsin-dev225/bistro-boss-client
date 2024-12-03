import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";
import MenuCategory from "../../Menu/MenuCategory";


const PopulerMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')
    // const [menu, setMenu] = useState([]);
    // useEffect(()=>{
    //     fetch('menu.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const popularItems = data.filter(item => item.category === 'popular')
    //         setMenu(popularItems)
    //     })
    // },[])
    return (
        <div className="mb-10">
            <SectionTitle heading={'FROM OUR MENU'} subHeading={'---Check it out---'}></SectionTitle>
            <MenuCategory items={popular}></MenuCategory>
            <button className="py-2 hover:bg-slate-700 mx-auto text-center  my-3 px-4 border-b-2 rounded-md">Read More</button>
        </div>
    );
};

export default PopulerMenu;