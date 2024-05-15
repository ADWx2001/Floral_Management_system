import { useState } from "react";
import { useSelector} from "react-redux";



export default function Checkout() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    order_id: "",
    items: "",
    currency: "",
    amount: "",
  });

  const cart = useSelector((state) => state.cart);

  const {currentUser} = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const form = document.getElementById('checkout-form');
    form.submit();
    // Handle form submission logic (e.g., send data to server)
    console.log("Form submitted:", formData);
  };
  
  return ( 
  // <div classNameName="container mx-auto px-4 py-8 ">
  //     <h1 classNameName="text-3xl font-semibold pt-5 text-red-600">Checkout</h1>
  //   <div classNameName="flex flex-wrap -mx-4 pt-1 pb-14">
  //     {/* User Details */}
  //     <div classNameName="w-full md:w-1/2 px-4 mb-4 md:mb-0 ">
  //       {/* <h2 classNameName="text-2xl font-semibold mb-4">User Details</h2> */}
  //       <form classNameName="space-y-2 rounded-xl shadow-xl bg-white p-10">
  //         <div classNameName="flex flex-wrap -mx-2">
  //           <div classNameName="w-full md:w-1/2 px-2 mb-2">
  //             <label htmlFor="firstName" classNameName="block mb-1">First Name</label>
  //             <input type="text" id="firstName" name="firstName" value={currentUser.firstName} classNameName="w-full border border-gray-300 rounded-md px-4 py-2" required />
  //           </div>
  //           <div classNameName="w-full md:w-1/2 px-2 mb-4">
  //             <label htmlFor="lastName" classNameName="block mb-1">Last Name</label>
  //             <input type="text" id="lastName" name="lastName" value={currentUser.lastName} classNameName="w-full border border-gray-300 rounded-md px-4 py-2" required />
  //           </div>
  //         </div>
  //         <div classNameName="mb-4">
  //           <label htmlFor="email" classNameName="block mb-1">Email</label>
  //           <input type="email" id="email" name="email" value={currentUser.email} classNameName="w-full border border-gray-300 rounded-md px-4 py-2" required />
  //         </div>
  //         <div classNameName="mb-4">
  //           <label htmlFor="address" classNameName="block mb-1">Address Line 1</label>
  //           <input type="text" id="address" name="address" value={currentUser.addressLiine1} classNameName="w-full border border-gray-300 rounded-md px-4 py-2" required />
  //         </div>
  //         <div classNameName="mb-4">
  //           <label htmlFor="address" classNameName="block mb-1">Address Line 2</label>
  //           <input type="text" id="address" name="address" value={currentUser.addressLine2} classNameName="w-full border border-gray-300 rounded-md px-4 py-2" required />
  //         </div>
  //         <div classNameName="mb-4">
  //           <label htmlFor="phone number" classNameName="block mb-1">Phone number</label>
  //           <input type="number" id="phone_number" name="phone_number" value={currentUser.phoneNumber} classNameName="w-full border border-gray-300 rounded-md px-4 py-2" required />
  //         </div>
  //         <br />
  //         <hr />
  //         <h1 classNameName="text-2xl py-5 font-semibold">Payment Details <span classNameName="justify-stretch"><box-icon type='solid' name='lock' color='green' ></box-icon></span></h1>

  //         <div classNameName="mb-4">
  //           {/* <label htmlFor="address" classNameName="block mb-1">Address Line 1</label> */}
  //           <input type="text" id="address" name="address" value={currentUser.addressLiine1} classNameName="w-full border border-gray-300 rounded-md px-4 py-2" placeholder="Credit Card Number" required />
  //         </div>
          
  //         <div classNameName="flex flex-wrap -mx-2">
  //           <div classNameName="w-full md:w-1/2 px-2 mb-2">
              
  //             <input type="date" id="firstName" name="firstName" value={currentUser.firstName} classNameName="w-full border border-gray-300 rounded-md px-4 py-2" placeholder="11/23" required />
  //           </div>
  //           <div classNameName="w-full md:w-1/2 px-2 mb-4">
             
  //             <input type="number" id="lastName" name="lastName" value={currentUser.lastName} classNameName="w-full border border-gray-300 rounded-md px-4 py-2" placeholder="CCV" required />
  //           </div>
  //         </div>

  //         <div classNameName="flex flex-wrap">
  //           <box-icon name='visa' type='logo' color='blue' size='lg'></box-icon>
  //           <box-icon name='mastercard' type='logo'  size='lg'></box-icon>
  //         </div>

  //         <div classNameName="flex justify-end">
  //           <button type="submit" classNameName="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 mx-auto w-full">Submit</button>
  //         </div>

          

  //       </form>
  //     </div>

  //     {/* Item Details */}
  //     <div classNameName="w-auto md:w-1/2  mx-auto rounded-md shadow-xl bg-white p-10">
  //       <h2 classNameName="text-2xl font-semibold mb-4 text-red-600">Item Details</h2>
  //       {/* Add your item details here */}
      
  //       {cart.cartItems?.map((cartItem) => (
  //         <>
  //           <div classNameName="flex flex-wrap justify-self-center">

  //           <div classNameName="p-3">
  //             <img src={cartItem.images} alt={cartItem.name} classNameName="max-w-16"/>
  //           </div>

  //           <table classNameName="">
  //             <tr>
  //               <td><h1>Item name</h1></td>
  //               <td><h1 classNameName="px-16">: {cartItem.name}</h1></td>
  //             </tr>
  //             <tr>
  //               <td><h1>Unit Price:</h1></td>
  //               <td><h1 classNameName="px-16">: {cartItem.price}</h1></td>
  //             </tr>
  //             <tr>
  //               <td><h1>Quantity:</h1></td>
  //               <td><h1 classNameName="px-16">: x{cartItem.cartTotalQuantity}</h1></td>
  //             </tr>
  //             <tr>
  //               <td><h1>Total:</h1></td>
  //               <td><h1 classNameName="px-16">: Rs. {cartItem.price * cartItem.cartTotalQuantity}</h1></td>
  //             </tr>
  //           </table>
  //           </div>
  //         </>
  //       ))}

  //       <div classNameName="flex  my-8 justify-start px-28">
  //         <h1 classNameName="text-xl font-semibold">Subtotal <span classNameName="mx-8"> : Rs. {cart.cartTotalAmount}</span></h1>
  //       </div>
        
  //     </div>
  //   </div>
  // </div>
  <>
    
  </>
              
  );
}
