import PropTypes from 'prop-types';

ProductTile.propTypes = {
      item: PropTypes.shape({
      _id:PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      deliveryTime: PropTypes.string.isRequired,
      availability: PropTypes.bool.isRequired,
      price: PropTypes.number.isRequired,
    // Add more prop types as needed
  }).isRequired,
};


// export default function ProductTile( item ) {
//   return (
//     <div className="max-w-96 w-full rounded overflow-hidden shadow-xl hover:border" key={singleProduct.key}>
//       <img className="w-full rounded-2xl p-3" src={singleProduct.images} alt="Sunset in the mountains" />
//       <div className="px-6 py-4 text-center">
//       {/* <div className="font-bold text-xl mb-2 text-rose-500">{item._id}</div> */}
//         <div className="font-bold text-xl mb-2 text-rose-500">{singleProduct.name}</div>
//         <span className="text-base text-green-600">{singleProduct.deliveryTime}</span><br />
//         <span className="text-base text-green-600">{singleProduct.availability}</span><br />
//         <span className="text-base text-slate-400">from</span><br />
//         <span className="text-lg text-red-600 font-semibold">USD {singleProduct.price}</span>
//       </div>
//       <div className="flex p-3 mx-auto justify-between pb-8">
//         <button className="p-3 bg-black mx-3 rounded-lg text-white hover:bg-rose-500">Details</button>
//         <button className="p-3 bg-green-500 mx-3 rounded-lg text-white hover:bg-green-600">Add to Cart</button>
//       </div>
//     </div>
//   );
// }

import { addToCart } from "../redux/cart/cartSlice";
import  { useDispatch } from "react-redux";
// import { useHistory } from 'react-router-dom';


export default function ProductTile({item}) {
  const dispatch = useDispatch();

  const handleAddToCart = (product) =>{
    dispatch(addToCart(product));
  }

  return (
    // <div id={item._id} className="max-w-96 w-full rounded overflow-hidden shadow-xl hover:border">
    //   <img className="w-96 h-48 object-cover rounded-2xl" src={item.images} alt="Sunset in the mountains" />
    //   <div className="px-6 py-4 text-center">
    //     <div className="font-bold text-xl mb-2 text-rose-500">{item.name}</div>
    //     <span className="text-base text-green-600">Delivery in {item.deliveryTime}</span><br />
    //     <span className={`text-base ${item.availability ? 'text-green-600' : 'text-red-600'}`}>
    //       {item.availability ? 'In Stock' : 'Out of Stock'}
    //     </span><br />
    //     <span className="text-base text-slate-400">from</span><br />
    //     <span className="text-lg text-red-600 font-semibold">USD {item.price}</span>
    //   </div>
    //   <div className="flex p-3 mx-auto justify-between pb-8">
    //     <button className="p-3 bg-black mx-3 rounded-lg text-white hover:bg-rose-500">Details</button>
    //     <button className="p-3 bg-green-500 mx-3 rounded-lg text-white hover:bg-green-600" onClick={() => handleAddToCart(item)}>Add to Cart</button>
    //   </div>
    // </div>

    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" id={item._id}>
                <a href="#">
                    <img className="rounded-t-lg" src={item.image} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.availability}</p>
                    
                </div>
        </div>
    </>

  );
}