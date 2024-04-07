//Products fetch API
import { useGetAllProductsQuery } from "../redux/product/productApi";
import { addToCart } from "../redux/cart/cartSlice";
import  { useDispatch } from "react-redux";

export default function Products() {
  const dispatch = useDispatch();
  const {data, error, isLoading} = useGetAllProductsQuery();
   
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log(data);
  const productsArray = data.products;
  // if (!data) {
  //   return <p>No data available</p>;
  // }
  
  // if (!Array.isArray(data)) {
  //   return <p>Data is not in the expected format</p>;
  // }

  const handleAddToCart = (product) =>{
    dispatch(addToCart(product));
  }
  return (

    <div className="flex flex-wrap gap-10 max-w-screen-xl mx-auto mt-16 mb-10 justify-center">
        {/* Image card */}
        {productsArray.map((singleProduct) => (
          <>
            <div id={singleProduct._id} className="max-w-96 w-full rounded overflow-hidden shadow-lg hover:border flex flex-col">
              <img className="w-96 h-48 object-cover rounded-2xl" src={singleProduct.image} alt="Sunset in the mountains" />
              <div className="px-6 py-4 text-center flex-grow">
                <div className="font-bold text-xl mb-2 text-rose-500">{singleProduct.title}</div>
                <span className="text-base text-black">{singleProduct.description}</span><br />
                <span className="text-base text-rose-600">{singleProduct.category} day</span><br />
                <span className="text-base text-green-600">Delivery in {singleProduct.deliveryTime} day</span><br />
                <span className={`text-base ${singleProduct.quantity ? 'text-green-600' : 'text-red-600'}`}>
                  {singleProduct.quantity ? 'In Stock' : 'Out of Stock'}
                </span><br />
                <span className="text-base text-slate-400">from</span><br />
                <span className="text-lg text-red-600 font-semibold">Rs. {singleProduct.price}.00</span>
              </div>
              <div className="flex p-3 justify-between">
                <button className="p-3 bg-black mx-3 rounded-lg text-white hover:bg-rose-500">Details</button>
                <button className="p-3 bg-green-500 mx-3 rounded-lg text-white hover:bg-green-600" onClick={() => handleAddToCart(singleProduct)}>Add to Cart</button>
              </div>
            </div>

          </>
      ))}


      </div>
  )
}
