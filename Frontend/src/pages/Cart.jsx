import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, clearCart, decreaseCart, getCartTotal, removeFromCart } from "../redux/cart/cartSlice";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getCartTotal());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  }

  const handleDecreaseCart = (cartItem) =>{
    dispatch(decreaseCart(cartItem));
  }

  const handleIncreaseCart = (cartItem) =>{
    dispatch(addToCart(cartItem));
  }

  const handleClearCart = () => {

    const confirmation = window.confirm('Are you sure want to clear the cart?');

    if(confirmation){
      dispatch(clearCart());
    }else{
      console.log("Cart is not cleared!");
    }
  }

  return (
    <div className="text-center pt-10 pb-20">
      <h1 className="text-2xl font-semibold">Shopping Cart</h1>
      {cart.cartItems.length === 0 ? (
        <div className="pt-4 text-center">
          <p className="font-semibold ">Your cart is empty</p>
          <div className="pt-10 pb-10">
               <Link to="/">
                 <span className="p-2 bg-gray-200 rounded px-5 hover:bg-green-400 hover:text-white">
                   Start Shopping
               </span>
               </Link>
             </div>
        </div>
      ) : (
        <div className="mx-auto">
          <table className="w-10/12 mt-10">
            <thead className="text-center">
              <tr className="border-b">
                <th className="py-2">Product</th>
                <th className="py-2">Price</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.cartItems?.map((cartItem) => (
                <tr key={cartItem._id} className="border-b">

                  <td className="py-2 flex gap-4 px-52">
                    <img src={cartItem.images} alt={cartItem.name} className="max-w-24" />
                    <div className="text-left max-w-52">
                      <h3 className="font-semibold pb-1 text-rose-500">{cartItem.name}</h3>
                      <p className="text-sm pb-3">{cartItem.description}</p>
                      <button className="bg-gray-300 p-1 rounded px-4 hover:bg-red-600 hover:text-white text-xs" onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                    </div>
                  </td>

                  <td className="py-2">${cartItem.price}</td>
                  
                  <td className="py-2 max-w-32">
                    <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                    <p>{cartItem.cartTotalQuantity}</p>
                    <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                  </td>

                  <td className="py-2">${cartItem.price * cartItem.cartTotalQuantity}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-wrap justify-between gap-32 px-52 pt-10">
            <div className="">
              <button onClick={() => handleClearCart()} className="p-3 hover:bg-red-600 bg-gray-300 rounded-md text-sm text-black hover:text-white"> Clear Cart</button>
            </div>

            <div className="text-left">
              <span className="text-xl font-semibold">Subtotal : Rs. {cart.cartTotalAmount}</span>
              <p className="text-xs text-left pt-1 pb-2"><span className="text-red-700">*</span>Taxes and shipping calculated at checkout</p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-gray-200 p-3 rounded hover:bg-green-400 hover:text-white text-sm">Continue Shopping</button>
                <button className="bg-green-400 p-3 rounded hover:bg-green-500 hover:text-white text-md text-white">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
