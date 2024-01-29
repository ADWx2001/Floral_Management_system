import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { decreaseCart, removeFromCart } from "../redux/cart/cartSlice";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  }

  const handleDecreaseCart = (cartItem) =>{
    dispatch(decreaseCart(cartItem));
  }

  const handleIncreaseCart = (cartItem) =>{
    
  }

  return (
    // <div className='mx-auto pt-10'>
    //   <div className='text-center'>
    //     <h1 className='text-2xl font-semibold'>Shopping Cart</h1>
    //       {cart.cartItems.length === 0 ? (
    //       <div>
    //         <p>Your cart is empty</p>
    //         <div>
    //           <Link to='/'>
    //             <box-icon name='left-arrow-alt'></box-icon>
    //             <span>Start Shoppping</span>
    //           </Link>
    //         </div>
    //       </div>) : (
    //         <>
    //           <div className='flex justify-between gap-10 px-40 pt-10' alt='titles'>
    //             <h3 className='text-lg '>Product</h3>
    //             <h3 className='text-lg '>Price</h3>
    //             <h3 className='text-lg '>Quantity</h3>
    //             <h3 className='text-lg '>Total</h3>
    //           </div>

    //           <div className='pb-20'>
    //             {cart.cartItems?.map((cartItem) =>(
    //             // need to add flex property for this
    //             <div className='' key={cartItem._id}>

    //               <div className='px-32 flex'>

    //                 <div className='flex flex-wrap gap-5'>
    //                   <img src={cartItem.images} className='max-w-24 pt-10'></img>

    //                   <div className='text-left max-w-52 pt-10 text-sm'>
    //                     <h3 className='font-semibold'>{cartItem.name}</h3><br />
    //                     <p>{cartItem.description}</p>
    //                     <button className='p-2 mt-5 bg-gray-300 rounded px-3 hover:bg-red-600 text-xs hover:text-white'>Remove</button>
    //                   </div>

    //                 </div>

    //                 <div className='flex pt-10 px-24'>
    //                   <h2>${cartItem.price}</h2>
    //                 </div>

    //                 <div className='flex pt-10 px-64 gap-5'>
    //                   <button className='flex'>-</button>
    //                   <p>{cartItem.cartTotalQuantity}</p>
    //                   <button className='flex'>+</button>
    //                 </div>

    //                 <div className='flex pt-10'>
    //                   <h2>{cartItem.cartTotalAmount}</h2>
    //                 </div>

    //               </div>

    //               <div>

    //               </div>
    //             </div>

    //             ))}
    //           </div>
    //         </>
    //       )}
    //   </div>
    // </div>
    <div className="mx-auto pt-10">
      <div className="text-center">
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
          <>
            <div className="flex justify-between gap-9 md:px-10 lg:px-20 pt-10">
              <h3 className="text-lg">Product</h3>
              <h3 className="text-lg">Price</h3>
              <h3 className="text-lg">Quantity</h3>
              <h3 className="text-lg">Total</h3>
            </div>

            <div className="pb-2 justify-between gap-10">
              {cart.cartItems?.map((cartItem) => (
                <div className="px-4 md:px-10 lg:px-20 flex" key={cartItem._id}>
                  <div className="flex flex-wrap gap-5">
                    <img src={cartItem.images} className="max-w-24 pt-1"></img>
                    <div className="text-left max-w-52 pt-1 text-sm">
                      <h3 className="font-semibold">{cartItem.name}</h3>
                      <p>{cartItem.description}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)} className="p-2 mt-1 bg-gray-300 rounded px-3 hover:bg-red-600 text-xs hover:text-white">
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between gap-72">
                    <div className="flex pt-1 px-28">
                      <h2>${cartItem.price}</h2>
                    </div>

                    <div className="flex pt-1 gap-5">
                      <button onClick={() => handleDecreaseCart(cartItem)} className="flex">-</button>
                      <p>{cartItem.cartTotalQuantity}</p>
                      <button onClick={() => handleIncreaseCart(cartItem)} className="flex">+</button>
                    </div>

                    <div className="flex pt-1">
                      <h2>{cartItem.price * cartItem.cartTotalQuantity}</h2>
                    </div>
                  </div>
                </div>
              ))}
              <div className="justify-between gap-36">
                <button className="p-3 hover:bg-red-500 bg-gray-300 rounded-md text-sm text-black hover:text-white">
                  Clear Cart
                </button>
                <div>
                  <span className="text-xl">Subtotal:</span>
                  <p className="text-xs text-left">
                    Taxes and shipping calculated at checkout
                  </p>
                  <button className="bg-gray-200 p-3 rounded hover:bg-green-400 hover:text-white text-sm">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
