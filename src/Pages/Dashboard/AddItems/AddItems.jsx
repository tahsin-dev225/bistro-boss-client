import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddItems = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async(data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        } )
        if(res.data.success){ 
            // now send the menu item data to the server with the image
            const menuItem = {
                name: data.name,
                category: data.category,
                price:parseInt(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url,
            }
            // now 
            const menuRes = await axiosSecure.post('/menu', menuItem);
            if(menuRes.data.insertedId){
                // show success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} added in the menu database`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset();
            }
            console.log(menuRes.data)
        }
        console.log('with ig url',res.data)
    }

    return (
        <div>
            <SectionTitle subHeading="What's new?" heading="Add an item"></SectionTitle>
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe name?</span>
                        </div>
                        <input type="text" placeholder="Recipe Name"
                        {...register('name' ,{required:true})}
                        className="input input-bordered w-full" />
                    </label>
                    <div className="flex gap-4">
                        {/* category */}
                        <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">category*</span>
                        </div>
                        <select defaultValue={'defalt'} {...register('category' ,{required:true})}
                            className="select select-bordered w-full">
                            <option disabled value="defalt">Select a category.</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="desert">Desert</option>
                            <option value="drinks">Drinks</option>
                        </select>
                        </label>

                        {/* price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input type="number" placeholder="Recipe Name"
                            {...register('price',{required:true})}
                            className="input input-bordered w-full" />
                        </label>
                    </div>
                    {/* Items details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea {...register('recipe',{required:true})} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                        
                    </label>
                    <div className="form-control w-full my-6">
                        <input {...register('image',{required:true})} type="file" className="file-input w-full " />
                    </div>
                    <button className="btn text-white bg-gradient-to-r from-[#865F24] to-[#B58130]">
                        Add Item <FaUtensils className="ml-2"></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;