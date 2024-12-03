import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = (item) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                // console.log(res.data);
                if(res.data.deletedCount > 0){
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `You have deleted ${item.name}`,
                        showConfirmButton: false,
                        timer: 1000
                      });
                }
            }
          });
    }

    return (
        <div>
            <SectionTitle heading="Manage All items" subHeading="---- Hurry up ----"></SectionTitle>
            <div className="">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                        <tr>
                            <th className="text-2xl">
                            #
                            </th>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            menu.map((item,idx)=><tr key={item._id}>
                            <th>
                                {idx + 1}
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                        src={item.image} />
                                    </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                            {item.name}
                            </td>
                            <td>${item.price}</td>
                            <td>
                                <Link to={`/dashboard/updateItem/${item._id}`}>
                                    <button className="btn btn-sm bg-orange-300 text-white  btn-ghost ">
                                        <FaEdit></FaEdit>
                                    </button>
                                </Link>
                            </td>
                            <td>
                            <button onClick={()=>handleDeleteItem(item)} className="btn btn-ghost ">
                                <FaTrashAlt></FaTrashAlt>
                            </button>
                            </td>
                        </tr>)
                        }
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;