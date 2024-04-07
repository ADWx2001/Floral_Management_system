import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import 'boxicons/css/boxicons.min.css';
import { Link } from "react-router-dom";

export default function DashOrders() {
    const { currentUser } = useSelector((state) => state.user);
    const [Orders, setOrders] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModel , setShowModel] = useState(false);
    const [orderIdToDelete, setOrderIdToDelete] = useState('');

    const [totalOrders, setTotalOrders] = useState(0);
    const [totalSale, setTotalSale] = useState(0);



  //get total sales
  const calculateTotalSale = () => {
    const total = Orders.reduce((accumulator, currentOrder) => {
      return accumulator + parseFloat(currentOrder.totalcost);
    }, 0);
    setTotalSale(total);
  };
  
   //fetch all the orders from database
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/order/getorders`);
        const data = await res.json();
        const length = data.length;
  
        setTotalOrders(length);
        if (res.ok) {
          setOrders(data);
          if (data.length < 9) {  
            setShowMore(false);
          }
          calculateTotalSale(); // Call calculateTotalSale here
        }
      } catch (error) {
        console.log("error in fetching", error);
      }
    };
    
    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser, Orders]); 
  

    //delete order by id
    const handleDeleteOrder = async () => {
      setShowModel(false);
      try {
        const res = await fetch(
          `/api/order/deleteorder/${orderIdToDelete}`,
          {
            method: 'DELETE',
          }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message); 
        } else {
          setOrders((prev) =>
            prev.filter((orders) => orders._id !== orderIdToDelete)
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

  
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <div className="flex flex-wrap gap-5">
        <p>Total orders:{totalOrders}</p>
        <p>Total Sales:Rs.{totalSale}.00</p>
        <p>Created at: </p>
      </div>
      <h1 className="pt-6 px-4 font-semibold">Orders recieved</h1>
    { Array.isArray(Orders) && Orders.length > 0 ? (
    <>
    <Table hoverable className='shadow-md'>
      <Table.Head>
        <Table.HeadCell>User ID</Table.HeadCell>
        <Table.HeadCell>Order ID</Table.HeadCell>
        <Table.HeadCell>First Name</Table.HeadCell>
        <Table.HeadCell>Last Name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Phone</Table.HeadCell>
        <Table.HeadCell>Address</Table.HeadCell>
        <Table.HeadCell>Subtotal</Table.HeadCell>
        <Table.HeadCell>Delivery Fee</Table.HeadCell>
        <Table.HeadCell>Payment</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
      </Table.Head>
      {Orders.map((orders)=>(
        <Table.Body className='divide-y' key={orders._id}>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>

            <Table.Cell>
              {orders.userId}
            </Table.Cell>

            <Table.Cell>
              {/* <img
                src={order.profilePicture}
                alt={order.username}
                className='w-10 h-10 object-cover bg-gray-500 rounded-full'
              /> */}
              {orders.productsId}
            </Table.Cell>

            <Table.Cell>{orders.first_name},{orders.createdAt}</Table.Cell>

            <Table.Cell>{orders.last_name}</Table.Cell>

            <Table.Cell>{orders.email}</Table.Cell>

            <Table.Cell>
              {/* <span
                onClick={() => {
                  setShowModal(true);
                  setOrderIdToDelete(order._id);
                }}
                className='font-medium text-red-500 hover:underline cursor-pointer'
              >
                Remove
              </span> */}
              {orders.phone}
            </Table.Cell>
            <Table.Cell>{orders.address},{orders.state},{orders.zip}</Table.Cell>
            <Table.Cell>Rs.{orders.subtotal}.00</Table.Cell>
            <Table.Cell>Rs.{orders.deliveryfee}.00</Table.Cell>
            <Table.Cell>Rs.{orders.totalcost}.00</Table.Cell>
            <Table.Cell>
              <div className="flex flex-row gap-2">
                <Link to={`/update-order/${orders._id}`}>
                  <button><box-icon name='edit-alt' color='#65B741'></box-icon></button>
                </Link>
                

                <Link to={`/create-delivery-record/${orders._id}`}>
                  <button><box-icon name='package' color='#5755FE'></box-icon></button>
                </Link>

                <button onClick={() => {
                          setShowModel(true);
                          setOrderIdToDelete(orders._id);
                        }} ><box-icon name='x-circle' color='#D20062'></box-icon></button>
              </div>
            </Table.Cell>
          </Table.Row>
          
        </Table.Body>
      ))}
    </Table>

    {showMore && (
      <button
        onClick=""
        className='w-full text-teal-500 self-center text-sm py-7'
      >
        Show more
      </button>
    )}
    
  </>
      ):(
        <p>Haven't any orders to show</p>
      )}

      <Modal show={showModel} onClose={()=>setShowModel(false)} popup size='md'>
          <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to Delete this Order</h3>
            </div>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteOrder}>
                Yes, I am sure
              </Button>
              <Button color='gray' onClick={() => setShowModel(false)}>
                No, cancel
              </Button>
            </div>
          </Modal.Body>
      </Modal>
    
      

  </div>
  )
  
}