import { useGetAllProductsQuery } from "../redux/product/productApi";
import { addToCart } from "../redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from 'flowbite-react'

export default function CardSlider() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useGetAllProductsQuery();

  useEffect(() => {
    refetch();
  }, []); 

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log(data);
  const productsArray = data.products;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  const handleDetailsClick = (slug) => {
    navigate(`/product/${slug}`);
  }
  return (
    <>
    <div className="h-56 sm:h-96 xl:h-96 2xl:h-96">
      <Carousel slideInterval={5000}>
        <div className='flex flex-wrap gap-5 justify-between font-cinzel'>
            {productsArray.map((singleProduct) => (
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={singleProduct._id}>
                <button onClick={() => handleDetailsClick(singleProduct.slug)}>
                    <img className="rounded-t-lg w-56 h-56" src={singleProduct.image} alt="" />
                </button>
                <div className="p-5">
                    
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{singleProduct.title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
                    <button onClick={() => handleAddToCart(singleProduct)} href="#" className="font-semibold inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add to cart</button>
                </div>
            </div>
            ))}
        </div>
      </Carousel>
    </div>
        
    </>
  )
}
