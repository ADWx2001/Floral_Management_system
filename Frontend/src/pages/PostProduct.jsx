import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import CallToAction from './CallToAction';
import Dashreviews from '../components/Dashreviews';
import  {RatingStar}  from 'flowbite-react';
import { HiStar } from 'react-icons/hi';

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/getproducts?slug=${productSlug}`);
        const resStar = await fetch(`/api/reviews/getreviews`);

        if(resStar.ok){
          const starfilter = await resStar.json();
          setFivestar(starfilter.Fivestar);
          setFourstar(starfilter.Fourstar);
          setThreestar(starfilter.Threestar);
          setTwostar(starfilter.Twostar);
          setOnestar(starfilter.Onestar);
        }
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        const data = await res.json();

        setProduct(data.products[0]);
        setLoading(false);
        setError(false);
      

      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [productSlug]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  return (
    <div>
      <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        {error ? (
          <div>Error occurred while fetching data.</div>
        ) : (
          <>
          
            <h1 className='text-3xl mt-10 p-3 text-center font-cinzel max-w-2xl mx-auto lg:text-4xl'>{product && product.title}</h1>
            
            <div className='lg:flex lg:flex-row'>
  
            <div className='lg:w-1/2'>
              <div className='lg:flex lg:flex-row float-left'>
                <img src={product && product.image} alt={product && product.title} className='mt-10 p-3 max-h-[600px] w-[500px] object-cover' />
              </div>
            </div>

            
            <div className='lg:w-1/2 p-16 '>
              <div className='lg:flex lg:flex-row float-left'> 
                <div className='flex flex-col'>
                  <h1 className='p-1 font-serif'>Price: Rs. {product && product.price}</h1>
                  <h1 className='p-1 font-serif'>Category: {product && product.category}</h1>
                  <h1 className='p-1 font-serif'>Description: {product && product.description}</h1>
                </div>

              </div>
            </div>
            
            </div>
            <div className='flex-wrap flex gap-1  p-2'>
              <div className='flex justify-between '>
                  <div className=' bg-gray-100  dark:bg-slate-800 w-11 items-center p-1 m-1 rounded-md'><HiStar className='text-yellow-300 text-2xl'/>5[{Fivestar}]</div>
              </div>

              <div className='flex justify-between '>
                  <div className=' bg-gray-100  dark:bg-slate-800 w-11 items-center p-1 m-1 rounded-md'><HiStar className='text-yellow-300 text-2xl' />4[{Fourstar}]</div>
              </div>

              <div className='flex justify-between '>
                  <div className=' bg-gray-100  dark:bg-slate-800 w-11 items-center p-1 m-1 rounded-md'><HiStar className='text-yellow-300 text-2xl'/>3[{Threestar}]</div>
              </div>

              <div className='flex justify-between '>
                  <div className=' bg-gray-100  dark:bg-slate-800 w-11 items-center p-1 m-1 rounded-md'><HiStar className='text-yellow-300 text-2xl'/>2[{Twostar}]</div>
              </div>

              <div className='flex justify-between '>
                  <div className=' bg-gray-100  dark:bg-slate-800 w-11 items-center p-1 m-1 rounded-md'><HiStar className='text-yellow-300 text-2xl'/>1[{Onestar}]</div>
              </div>
            </div>
            

          <Dashreviews productId={product.title}/>
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
