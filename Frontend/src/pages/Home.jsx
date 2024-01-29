import ProductTile from "../components/ProductTile";
import Slider from "../components/Slider";


// Test Sample Product API
import { useGetAllProductsQuery } from "../redux/product/productApi";



export default function Home() {

  const {data, error, isLoading} = useGetAllProductsQuery();
  

  if (isLoading) {
    return <p>Loading...fuck</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log(data);

  return (
    <div className="mx-auto justify-center">
      <Slider/>
      <div className="text-center pt-3">
        <h1 className="text-3xl text-rose-700 uppercase font-semibold">Flower Items</h1>
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
          {data.map((singleItem) => (<ProductTile item={singleItem} key={singleItem._id}/>))}
      </div>
    </div>
  )
}


        