import Image2 from "../assests/img/home2.jpg"
import Image3 from "../assests/img/home3.jpg"
import Image4 from "../assests/img/home4.jpg"
import ProductTile from "../components/ProductTile";
import Slider from "../components/Slider";

export default function Home() {
  return (
    <div className="mx-auto justify-center">
      <Slider/>
      <div className="text-center pt-3">
        <h1 className="text-3xl text-rose-700 uppercase font-semibold">Flower Items</h1>
      </div>
      <div className="flex gap-14 max-w-screen-xl mx-auto mt-16 mb-10">
        {/* Image card */}
        <ProductTile img={Image2} productName={"Rose Bucket"} deliveryTime={"Delivery in 2 days"} availability={"In Stock"} price={"$45"}/>
        <ProductTile img={Image3} productName={"Rose Bucket"} deliveryTime={"Delivery in 2 days"} availability={"Out of Stock"} price={"$24"}/>
        <ProductTile img={Image4} productName={"Rose Bucket"} deliveryTime={"Delivery in 2 days"} availability={"In Stock"} price={"$88"}/>
      </div>
    </div>
  )
}


        