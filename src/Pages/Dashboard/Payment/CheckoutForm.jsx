import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const [error,setError] =useState();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {user} = UseAuth();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total,item) => total + item.price , 0);
    const navigate = useNavigate();


    useEffect(() =>{
        if(totalPrice > 0){
            axiosSecure.post('/create-payment-intent', {price: totalPrice})
            .then(res =>{
                console.log(res.data);
                setClientSecret(res.data.clientSecret);
            })
        }
    },[axiosSecure, totalPrice]);

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement)
        if(card === null){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card
        })

        if(error){
            console.log('payment error', error);
            setError(error.message);
        }else{
            console.log('Payment method', paymentMethod);
            setError('');
        }

        // confirm payment
        const {paymentIntent, error : confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.name || 'anonymous'
                }
            }
        });

        if(confirmError){
            console.log('confirm error');
        }else{
            console.log('payment intent', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to convert the time
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId ),
                    status:'pending',
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved',res)
                refetch();
                if(res.data.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your payment has succesfull",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    navigate('/dashboard/paymentHistory')
                }

            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                style: {
                    base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                    },
                    invalid: {
                    color: '#9e2146',
                    },
                },
                }}
            />
            <button type="submit"
                disabled={!stripe || !clientSecret }
              className="btn my-3 btn-primary btn-sm text-white">
                Pay
            </button>
            <p className="bg-cyan-950 text-red-500 py-3 px-5">{error ? error : ''}</p>
            {transactionId && <p className="text-green-400">Your transaction id : {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;