import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import CallToAction from './CallToAction';
import Dashreviews from '../components/Dashreviews';
import { HiStar } from 'react-icons/hi';
import { addToCart } from "../redux/cart/cartSlice";
import { useGetAllProductsQuery } from "../redux/product/productApi";
import { useDispatch } from "react-redux";


export default function PostProduct() {
  const { productSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);
  const [Fivestar, setFivestar] = useState(0);
  const [Fourstar, setFourstar] = useState(0);
  const [Threestar, setThreestar] = useState(0);
  const [Twostar, setTwostar] = useState(0);
  const [Onestar, setOnestar] = useState(0);
  const [moderateRating, setmoderateRating] = useState(0);
  const { data } = useGetAllProductsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/getproducts?slug=${productSlug}`);
        
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        const data = await res.json();

        setProduct(data.products[0]);
        setLoading(false);
        setError(false);

        if (data.products[0]) {
          getModeratereviews(data.products[0]._id);
        }
      

      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [productSlug]);

  const getModeratereviews = async (productId) => {
    try {
      const resStar = await fetch(`/api/reviews/getModarateRating/${productId}`);
  
      if (resStar.ok) {
        const starfilter = await resStar.json();
        setFivestar(starfilter.Fivestar);
        setFourstar(starfilter.Fourstar);
        setThreestar(starfilter.Threestar);
        setTwostar(starfilter.Twostar);
        setOnestar(starfilter.Onestar);
        setmoderateRating(starfilter.moderateRating);
      }
  
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  return (
    <div>
      <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        {error ? (
          <div>Error occurred while fetching data.</div>
        ) : (
          <>
            <h1 className='text-3xl mt-10 p-3 justify-start items-start font-serif max-w-2xl lg:text-4xl '>{product && product.title}</h1>
            <span className='justify-start items-start font-serif mx-3'>SKU: N/A</span>
            <hr />
            
            <div className='lg:flex lg:flex-row'>
  
              <div className='lg:w-1/2'>
                <div className='lg:flex lg:flex-row float-left'>
                  <img src={product && product.image} alt={product && product.title} className='mt-10 p-3 max-h-[600px] w-[500px] object-cover' />
                </div>
              </div>
 
              <div className='lg:w-1/2 p-16 '>
                <div className='lg:flex lg:flex-row float-left'> 
                  <div className='flex flex-col'>
                  
                    <h1 className='p-1 font-bold font-sans text-green-700 text-3xl'>Rs. {product && product.price}.00</h1><hr />
                    <h1 className='p-1 underline font-serif lg:text-4xl text-lg mt-5'>{product && product.title}</h1>
                    <h1 className='p-1 text-md  font-sans'>{product && product.description}</h1>
                    <h1 className='p-1 '><span className='font-semibold text-md  font-sans'>Category :</span> {product && product.category}</h1>
                    <h1 className='p-1 font-semibold mb-2'>Delivery in :<span className='text-green-500'> {product && product.deliveryTime} Days.</span></h1>
                    {/* <div className='flex flex-wrap border border-gray-200 mb-3  bg-gray-100  dark:bg-slate-800 w-24  p-2 m-2 rounded-md'>
                      <HiStar className='text-yellow-300  text-4xl'/>
                      <p className ='pl-2'><span className='font-semibold text-lg  font-sans'> </span> {moderateRating}</p>
                    </div> */}
                    <hr />
                    <div className=''>
                      {product && (
                          <div className="flex justify-center mt-4">
                            <button className="block w-full text-center py-2 mt-2 bg-white border border-rose-400 text-rose-400 hover:bg-rose-400 rounded hover:border-rose-300 hover:text-white hover:font-semibold"
                              onClick={() => handleAddToCart(product)}>
                                Add to Cart
                            </button>
                          </div> 
                      )}
                    </div>
                  </div>
              
                </div>
              </div>
           </div>
            
            
            {/* <div className='flex-wrap flex gap-1  p-2'>
              <div className='flex flex-wrap justify-between bg-gray-100  dark:bg-slate-800 w-15 items-center p-1 m-1 rounded-md border border-gray-200'>
                  <HiStar className='text-yellow-300 text-2xl'/>
                  <div className='text-lg pl-1'>5[{Fivestar}]</div>
              </div>

              <div className='flex flex-wrap justify-between bg-gray-100  dark:bg-slate-800 w-15 items-center p-1 m-1 rounded-md border border-gray-200'>
                  <HiStar className='text-yellow-300 text-2xl'/>
                  <div className='text-lg pl-1'>4[{Fourstar}]</div>
              </div>

              <div className='flex flex-wrap justify-between bg-gray-100  dark:bg-slate-800 w-15 items-center p-1 m-1 rounded-md border border-gray-200'>
                  <HiStar className='text-yellow-300 text-2xl'/>
                  <div className='text-lg pl-1'>3[{Threestar}]</div>
              </div>

              <div className='flex flex-wrap justify-between bg-gray-100  dark:bg-slate-800 w-15 items-center p-1 m-1 rounded-md border border-gray-200'>
                  <HiStar className='text-yellow-300 text-2xl'/>
                  <div className='text-lg pl-1'>2[{Twostar}]</div>
              </div>

              <div className='flex flex-wrap justify-between bg-gray-100  dark:bg-slate-800 w-15 items-center p-1 m-1 rounded-md border border-gray-200'>
                  <HiStar className='text-yellow-300 text-2xl'/>
                  <div className='text-lg pl-1'>1[{Onestar}]</div>
              </div>
            </div> */}
            

            <Dashreviews productId={product && product._id} title={product && product.title} />

          <div className ='max-w-4xl mx-auto '>
            <CallToAction/>

          </div >
         
          </>
          
        )}
        <div className='flex flex-col'>
           
        </div>
        
      </main>
     
    </div>
  );
}
