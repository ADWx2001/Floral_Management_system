import Slider from "../components/Slider";
import CardSlider from "../components/CardSlider";
import {Card} from 'flowbite-react';
import { addToCart } from "../redux/cart/cartSlice";
import  { useDispatch } from "react-redux";


// Test Sample Product API
// import { useGetAllProductsQuery } from "../redux/product/productApi";



export default function Home() {

// import { useHistory } from 'react-router-dom';
  const dispatch = useDispatch();

  const handleAddToCart = (product) =>{
    dispatch(addToCart(product));
  }

  // const {data, error, isLoading} = useGetAllProductsQuery();
  

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  // console.log(data);

  return (
    
    <div className="mx-auto">
        <Slider/>
      <div className="text-left pt-14 px-28">
        <h1 className="text-3xl text-rose-700 uppercase font-semibold mb-2">Our top selling items</h1>
        <CardSlider />
      </div>

      <div className="flex flex-wrap gap-10 max-w-screen-xl mx-auto mt-16 mb-10 justify-center">
        {/* Image card */}
        {/* {data.map((singleProduct) => (
          <ProductTile
            key={singleProduct._id} // Make sure to use a unique key for each product
            img={singleProduct.images} // Assuming the first image in the array is the main image
            productName={singleProduct.name}
            deliveryTime="Delivery in 2 days"
            availability={singleProduct.availability ? "In Stock" : "Out of Stock"}
            price={`$${singleProduct.price}`}
          />
      ))} */}
          {/* {productData.map((singleProduct) => (<ProductTile item={singleProduct} key={singleProduct._id}/>))} */}


      </div>

      <div>

        <h1 className="text-3xl text-rose-700 uppercase font-semibold mb-5 px-28">Why Us</h1>
        <div className="flex flex-wrap justify-center gap-14 pt-5 pb-5 ">
          <Card
            className="max-w-sm border-none h-80" 
          >
            <img src="/why-us/spring.gif" className="mx-auto w-32" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Farm fresh quality.
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              Sourced from our very own farms, our flowers stay fesh longer.
            </p>
          </Card>

          <Card
            className="max-w-sm borde border-none h-80"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            
          >
             <img src="/why-us/truck.gif" className="mx-auto w-32" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Fast delivery service.
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
            From last-minute celebrations to the most important moments of the year, we deliver flowers when it counts.
            </p>
          </Card>

          <Card
            className="max-w-sm border-none h-80"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            
          >
             <img src="/why-us/fresh.gif" className="mx-auto w-32" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Artisan bouquets
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
            Our handcrafted creations feature exquisite flowers nurtured in our farms, designed to meet global floral standards.
            </p>
          </Card>
        </div>

      </div>

      <div className="pb-10 pt-20">
        <h1 className="text-3xl text-rose-700 uppercase font-semibold mb-5 px-28">Gallery</h1>
        <div className="flex flex-wrap justify-center bg-white gap-12 pb-7 pt-8 dark:bg-slate-800">

          <div className="w-52 ">
            <div >
              <img src="/gallery/2.jpg" alt="" className="rounded-xl"/>
            </div>
          </div>

          <div className="w-52 ">
            <div >
              <img src="/gallery/3.jpg" alt="" className="rounded-xl"/>
            </div>
          </div>

          <div className="w-52 ">
            <div >
              <img src="/gallery/5.jpg" alt="" className="rounded-xl"/>
            </div>
          </div>

          <div className="w-52 ">
            <div>
              <img src="/gallery/1.jpg" alt="" className="rounded-xl"/>
            </div>
          </div>

          <div className="w-52 ">
            <div>
              <img src="/gallery/9.jpg" alt="" className="rounded-xl"/>
            </div>
          </div>

        </div> 

        <div className="flex flex-wrap justify-center bg-white gap-12 dark:bg-slate-800">

          <div className="w-52">
            <div >
              <img src="/gallery/10.jpg" alt="" className="rounded-xl"/>
            </div>
          </div>

          <div className="w-52">
            <div >
              <img src="/gallery/11.jpg" alt="" className="rounded-xl"/>
            </div>
          </div>

          <div className="w-52">
            <div >
              <img src="/gallery/3.jpg" alt="" className="rounded-xl"/>
            </div>
          </div>

          <div className="w-52">
            <div>
              <img src="/gallery/2.jpg" alt="" className="rounded-xl"/>
            </div>
          </div>

          <div className="w-52">
            <div>
              <img src="/gallery/3.jpg" alt="" className="rounded-xl"/>
            </div>
          </div>

        </div> 
      </div>

      <div className="relative w-full bg-red-200 h-96 rounded-xl overflow-hidden pb-10">
        <img src="/sample/3.jpg" alt="" className="w-full h-full object-cover absolute inset-0" />

        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-20">
            <div>
              <h1 className="font-semibold text-3xl text-white">We want every event to be as unique as our last</h1><br />
              <span className="text-white text-lg">Capture the beauty of every special occation with handcrafted <br />floral arrangements.</span>

            </div>

            {/* <form className="w-full max-w-lg p-4  rounded-xl">
                <div>
                    <div className="mb-2 block">
                        <label htmlFor="email1" className="font-bold text-white">Your email</label>
                    </div>
                    <input id="email1" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" placeholder="yourname@gmail.com" required />
                </div>
                <div>
                    <div className="mb-2 block pt-3">
                        <label htmlFor="password1" className="font-bold text-white">Your Full Name</label>
                    </div>
                    <input id="password1" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
                </div>
                <div>
                    <div className="mb-2 block pt-3">
                        <label htmlFor="subject" className="font-bold text-white">Brief Message</label>
                    </div>
                    <textarea id="subject" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
                </div>
                
                <button type="submit" className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out">Submit</button>
            </form> */}

        </div>
    </div>




    </div>
  )
}


        