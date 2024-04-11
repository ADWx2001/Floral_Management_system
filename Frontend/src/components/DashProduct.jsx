import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiGift, HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashProduct() {
  const { currentUser } = useSelector((state) => state.user);
  const [userProduct, setUserProduct] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [lastMonthProducts, setlastMonthProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products/getproducts`);
        const data = await res.json();
        if (res.ok) {
          setUserProduct(data.products);
          setTotalProducts(data.totalProducts)
          setlastMonthProducts(data.lastMonthProducts)
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async () => {
    setShowModel(false);
    try {
      const res = await fetch(
        `/api/products/deleteproduct/${productIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserProduct((prev) =>
          prev.filter((product) => product._id !== productIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Products</h3>
              <p className='text-2xl'>{totalProducts}</p>
            </div>
            <HiGift className='bg-red-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>
                Last Month Products
              </h3>
              <p className='text-2xl'>{lastMonthProducts}</p>
            </div>
            <HiGift className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
        </div>
      </div>
      {currentUser.isAdmin && userProduct.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Product Image</Table.HeadCell>
              <Table.HeadCell>Product Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Supplier</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userProduct.map((product) => (
              <Table.Body className='divide-y' key={product._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(product.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/product/${product.slug}`}>
                      {product.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{product.category}</Table.Cell>
                  <Table.Cell>{product.supplier}</Table.Cell>
                  <Table.Cell>
                    <span className='font-medium text-red-500 hover:underline cursor-pointer'
                      onClick={() => {
                        setShowModel(true);
                        setProductIdToDelete(product._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='text-teal-500 hover:underline' to={`/update-product/${product._id}`}>
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no products to show</p>
      )}
      <Modal show={showModel} onClose={() => setShowModel(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to Delete this Product</h3>
          </div>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={handleDeleteProduct}>
              Yes, I am sure
            </Button>
            <Button color='gray' onClick={() => setShowModel(false)}>
              No, cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
