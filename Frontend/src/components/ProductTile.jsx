
export default function ProductTile({ img, productName, deliveryTime, availability, price }) {
  return (
    <div className="max-w-96 w-full rounded overflow-hidden shadow-xl hover:border">
      <img className="w-full rounded-2xl p-3" src={img} alt="Sunset in the mountains" />
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2 text-rose-500">{productName}</div>
        <span className="text-base text-green-600">{deliveryTime}</span><br />
        <span className="text-base text-green-600">{availability}</span><br />
        <span className="text-base text-slate-400">from</span><br />
        <span className="text-lg text-red-600 font-semibold">USD {price}</span>
      </div>
      <div className="flex p-3 mx-auto justify-between pb-8">
        <button className="p-3 bg-black mx-3 rounded-lg text-white hover:bg-rose-500">Buy Now</button>
        <button className="p-3 bg-green-500 mx-3 rounded-lg text-white hover:bg-green-600">Add to Cart</button>
      </div>
    </div>
  );
}

