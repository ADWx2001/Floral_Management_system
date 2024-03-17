import { useState } from "react";
import { useSelector} from "react-redux";

export default function Ordersummary() {
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
      const deliveryfee = 300;
    
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
    <>
    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
            <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="/cart"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></a>
                <span className="font-semibold text-gray-900">Cart</span>
                </li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></a>
                  <span className="font-semibold text-gray-900">Order Summary</span>
                  </li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                <span className="font-semibold text-gray-500">Payment</span>
                </li>
                </ul>
            </div>
        </div>
    </div>

    {/* <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">*/}
    <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <div className="px-4 pt-8">
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">Check your items.before placing the order.</p>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
      {cart.cartItems?.map((cartItem) => (
        <>
        <div key={cartItem.name} className="flex flex-col rounded-lg bg-white sm:flex-row">
          <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={cartItem.images} alt="" />
          <div className="flex w-full flex-col px-4 py-4">
            <span className="font-semibold">{cartItem.name}</span>
            <span className="float-right text-gray-400">{cartItem.description}</span>
            <p className="text-lg font-bold">{cartItem.price}</p>
          </div>
        </div>
        </>
      ))}
        
      </div>
    </div>

        
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Shipping Details</p>
            <p className="text-gray-400">Complete your order by providing your details.</p>
            <div className="">
            <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">First Name</label>
            <div className="relative">
                <input type="text" id="email" name="text" className="w-full rounded-md border border-gray-200 px-4  pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your First Name" />
            </div>

            <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Last Name</label>
            <div className="relative">
                <input type="text" id="email" name="text" className="w-full rounded-md border border-gray-200 px-4  pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your First Name" />
            </div>

            <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
            <div className="relative">
                <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your Email" />
            </div>

            <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Phone</label>
            <div className="relative">
                <input type="number" id="" name="" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your Phone Number" />
            </div>

            <div className="flex">
                
            </div>
            <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Address</label>
            <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                    <input type="text" id="billing-address" name="billing-address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/b570febe9d96977515795be73e7bb057.svg" alt="" />
                    </div>
                </div>
                <input type="text" name="" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="State"/>
               
                <input type="text" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
            </div><br />
            <input type="hidden" name="country" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" value="Sri Lanka" />

        
            <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">Rs.{cart.cartTotalAmount}</p>
                </div>
                <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Delivery fee</p>
                <p className="font-semibold text-gray-900">Rs.{deliveryfee}</p>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">Rs.{cart.cartTotalAmount + deliveryfee}</p>
            </div>
            </div>
            <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
        </div>
        </div>

  </>
  )
}
