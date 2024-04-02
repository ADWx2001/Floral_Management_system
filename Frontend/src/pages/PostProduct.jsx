import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import CallToAction from './CallToAction';
import Dashreviews from '../components/Dashreviews';

export default function PostProduct() {
  const { productSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);

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

            
            <div className='lg:w-1/2 p-16'>
              <div className='lg:flex lg:flex-row float-left'> 
                <div className='flex flex-col'>
                  <h1 className='p-1 font-serif'>Price: Rs. {product && product.price}</h1>
                  <h1 className='p-1 font-serif'>Category: {product && product.category}</h1>
                  <h1 className='p-1 font-serif'>Description: {product && product.description}</h1>
                </div>
              </div>
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
