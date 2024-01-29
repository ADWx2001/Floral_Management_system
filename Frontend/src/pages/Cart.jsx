import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, decreaseCart, removeFromCart } from "../redux/cart/cartSlice";

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
    dispatch(addToCart(cartItem));
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
    // <div className="mx-auto pt-10">
    //   <div className="text-center">
    //     <h1 className="text-2xl font-semibold">Shopping Cart</h1>
    //     {cart.cartItems.length === 0 ? (
    //       <div className="pt-4 text-center">
    //         <p className="font-semibold ">Your cart is empty</p>
    //         <div className="pt-10 pb-10">
    //           <Link to="/">
    //             <span className="p-2 bg-gray-200 rounded px-5 hover:bg-green-400 hover:text-white">
    //               Start Shopping
    //             </span>
    //           </Link>
    //         </div>
    //       </div>
    //     ) : (
    //       <> 
    //         <div className="flex justify-center gap-64 pt-10">
    //           <h3 className="text-lg -mx-14">Product</h3>
    //           <h3 className="text-lg px-3">Price</h3>
    //           <h3 className="text-lg ">Quantity</h3>
    //           <h3 className="text-lg">Total</h3>
    //         </div>
    //         <br />
    //         <hr />
    //         <div className="pb-2 justify-center gap-10">
    //           {cart.cartItems?.map((cartItem) => (
    //             <div className="px-4 md:px-10 lg:px-20 flex" key={cartItem._id}>

    //               <div className="flex flex-wrap gap-5">
    //                 <img src={cartItem.images} className="max-w-24 pt-1"></img>
    //                 <div className="text-left max-w-52 pt-1 text-sm">
    //                   <h3 className="font-semibold ">{cartItem.name}</h3>
    //                   <p>{cartItem.description}</p>
    //                   <button onClick={() => handleRemoveFromCart(cartItem)} className="p-2 mt-1 bg-gray-300 rounded px-3 hover:bg-red-600 text-xs hover:text-white">
    //                     Remove
    //                   </button>
    //                 </div>
    //               </div>

    //               <div className="flex justify-center mx-44 gap-60">
    //                 <div className="flex pt-1 -mx-2">
    //                   <h2>${cartItem.price}</h2>
    //                 </div>

    //                 <div className="flex pt-1">
    //                   <button onClick={() => handleDecreaseCart(cartItem)} className="flex">-</button>
    //                   <p className="mx-2">{cartItem.cartTotalQuantity}</p>
    //                   <button onClick={() => handleIncreaseCart(cartItem)} className="flex">+</button>
    //                 </div>

    //                 <div className="flex pt-1">
    //                   <h2>{cartItem.price * cartItem.cartTotalQuantity}</h2>
    //                 </div>
    //               </div>

    //             </div>
    //           ))}
    //           <div className="flex justify-center gap-72 px-28">
    //             <button className=" hover:bg-red-500 bg-gray-300 rounded-md text-sm text-black hover:text-white">
    //               Clear Cart
    //             </button>
                // <div className="mx-32">
                //   <span className="text-xl">Subtotal:</span>
                //   <p className="text-xs text-left">
                //     Taxes and shipping calculated at checkout
                //   </p>
                //   <button className="bg-gray-200 p-3 rounded hover:bg-green-400 hover:text-white text-sm">
                //     Continue Shopping
                //   </button>
                // </div>
    //           </div>
    //         </div>
    //       </>
    //     )}
    //   </div>
    // </div>
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
              <button className="p-3 hover:bg-red-600 bg-gray-300 rounded-md text-sm text-black hover:text-white"> Clear Cart</button>
            </div>

            <div className="text-left">
              <span className="text-xl font-semibold">Subtotal:</span>
              <p className="text-xs text-left pt-1 pb-2">Taxes and shipping calculated at checkout</p>
              <button className="bg-gray-200 p-3 rounded hover:bg-green-400 hover:text-white text-sm">Continue Shopping</button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
