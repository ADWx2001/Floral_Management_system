
import {useSelector} from 'react-redux';
import {useNavigate } from "react-router-dom";


const PayButton = ({cartItems}) =>{
    const navigate = useNavigate();
    const {currentUser} = useSelector((state) =>state.user);
    // const cart = useSelector((state) => state.cart);

    const handleCheckout = async () => {
        console.log(currentUser._id);
        try {
            const res = await fetch(`/api/stripe/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItems,
                    userId: currentUser._id,
                }),
            });
    
            if (!res.ok) {
                throw new Error('Failed to create checkout session');
            }
    
            const data = await res.json();
    
            if (data.url) {
                window.location.href = data.url;
                //console.log(data)
                // navigate('/order-pay-success');
            }
        } catch (error) {
            console.log(error);
        }

    };
    

    return(
        <>
            <button className="text-lg rounded-full font-semibold text-indigo-600 py-4 px-6 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100" onClick={()=>handleCheckout()}>Continue to Payment</button>
        </>
    )
}

export default PayButton;