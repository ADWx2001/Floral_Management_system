import { useGetAllProductsQuery } from "../redux/product/productApi";
import { addToCart } from "../redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useGetAllProductsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20); // Number of products per page

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error in fetching products: {error.message}</p>;
  }

  const productsArray = data.products;

  // Calculate the indices of the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsArray.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  const handleDetailsClick = (slug) => {
    navigate(`/product/${slug}`);
  }


  return (
    <div className="max-w-screen-xl mx-auto mt-16 mb-10">
      <div className="font-serif">
        <select name="" id="" className=" rounded-xl" >
          <option value="">Sort</option>
          <option value="new" >Newest</option>
          <option value="high">Price High to Low</option>
          <option value="low">Low to High</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-10 justify-center">
        {currentProducts.map((singleItem) => (
          <div className="flex justify-center py-8" key={singleItem._id}>
            <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
              <span className="absolute m-2 bg-green-600 p-1 text-white rounded text-sm">{singleItem.price}%</span>
              <img className="w-full h-56 object-cover" src={singleItem.image} alt="" />
              <div className="px-5 pt-2 text-start">
                <h5 className="font-bold text-xl mb-2 text-black">{singleItem.title}</h5>
                <span className="text-xl text-pink-600 font-semibold">Rs. {singleItem.price}.00</span>
                <s className="text-sm px-2">Rs.{singleItem.price}.00</s><br />
                <span className="text-base text-green-600">{singleItem.category} day</span>
              </div>
              <div className="px-4 pb-4">
                <button className="block w-full text-center py-2 mt-2 bg-white border border-green-400 text-green-700 hover:bg-green-50 rounded"
                  onClick={() => handleDetailsClick(singleItem.slug)}>
                  Details
                </button>
                <button className="block w-full text-center py-2 mt-2 bg-white border border-rose-400 text-rose-400 hover:bg-rose-400 rounded hover:border-rose-300 hover:text-white hover:font-semibold"
                  onClick={() => handleAddToCart(singleItem)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={productsArray.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

//pagination component
const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const maxPageNumbersToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  const handleNextPage = () => {
    if (currentPage < totalPages) paginate(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };

 

  return (
    <nav className="flex justify-center mt-10">
      <ul className="flex list-none">
        
        {startPage > 1 && (
          <li className="mx-1">
            <button onClick={handlePrevPage} className="px-3 py-1 border border-rose-300 rounded hover:bg-rose-50">
              Prev
            </button>
          </li>
        )}
        {pageNumbers.slice(startPage - 1, endPage).map(number => (
          <li key={number} className={`mx-1 ${currentPage === number ? 'font-bold' : ''}`}>
            <button onClick={() => paginate(number)} className="px-3 py-1 border border-rose-300 rounded hover:bg-rose-50">
              {number}
            </button>
          </li>
        ))}
        {endPage < totalPages && (
          <li className="mx-1">
            <button onClick={handleNextPage} className="px-3 py-1 border border-rose-300 rounded hover:bg-rose-50">
              Next
            </button>
          </li>
        )}
        
      </ul>
    </nav>
  );
};
