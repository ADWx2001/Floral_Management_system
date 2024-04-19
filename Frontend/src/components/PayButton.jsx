
import {useSelector} from 'react-redux';
import {useNavigate } from "react-router-dom";


const PayButton = ({cartItems}) =>{
    const navigate = useNavigate();
    const {currentUser} = useSelector((state) =>state.user);
    // const cart = useSelector((state) => state.cart);

    const handleCheckout = async () => {
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

        // axios.post(`http://localhost:5173/api/stripe/create-checkout-session`, {
        //     cartItems,
        //     userId: currentUser._id,
        // }).then((res) => {
        //     if (res.data.url) {
        //         navigate('/order-pay-success');
        //     }
        // }).catch((err) => console.log(err));

    };
    

    return(
        <>
            <button className="rounded-full py-4 px-6 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100" onClick={()=>handleCheckout()}>Pay Now</button>
        </>
    )
}

export default PayButton;