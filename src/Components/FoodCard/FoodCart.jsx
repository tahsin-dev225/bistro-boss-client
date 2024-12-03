
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";


const FoodCart = ({item}) => {
    const {image,price,recipe,name, _id} = item;
    const {user} = UseAuth();
    const navigate = useNavigate();
    const location = useLocation()
    const axiosSecure = useAxiosSecure();
    const [,refetch] = useCart()

    const handleAddToCart = () =>{
        if(user && user.email){
            // send item to the database
            const cartItem = {
                menuId : _id,
                email: user.email,
                name,
                image,
                price,
            }
            axiosSecure.post('/carts', cartItem) 
            .then(res =>{
                console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} added to the cart`,
                        showConfirmButton: false,
                        timer: 1000
                      });
                    // refetch the cart to update the items count
                    refetch()
                }
            })
        }
        else{
            Swal.fire({
                title: "You are not logged in",
                text: "Please login to add to cart ",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state:{from : location}})
                }
              });
        }
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img src={image} />
            </figure>
            <div className="text-center text-white bg-black px-1 py-[1px] absolute right-5 top-5">{price}</div>
            <div className="card-body">
                <h2 className="card-title text-center mx-auto">{name}</h2>
                <p className=" font-thin">{recipe}</p>
                <div className="card-actions justify-center">
                <button onClick={ handleAddToCart} className="btn btn-primary btn-outline">Add To Card</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;