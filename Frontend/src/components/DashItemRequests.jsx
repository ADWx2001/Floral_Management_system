import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import 'boxicons/css/boxicons.min.css';
import { Link } from "react-router-dom";

export default function DashItemRequests() {
    const { currentUser } = useSelector((state) => state.user);
    const [Requests, setRequests] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModel2 , setShowModel2] = useState(false);
    const [requestIdToDelete, setRequestIdToDelete] = useState('');

  //fetch all the orders from database
    useEffect(() => {

      //fetch requests places for seller
      const fetchRequests = async () => {
        try {
          const res = await fetch(`/api/order/get-item-requests`);
          const data = await res.json();
          if (res.ok) {
            setRequests(data);
            if (data.length < 9) {  
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log("error in fetching", error);
        }
      };
      if (currentUser) {
        fetchRequests();
      }



    }, [currentUser]);

    
    //delete request record
    const handleDeleteRequest = async()=>{
      setShowModel2(false);
      try {
        const res = await fetch(
          `/api/order/delete/seller-item-request/${requestIdToDelete}`,
          {
            method: 'DELETE',
          }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message); 
        } else {
          setRequests((prev) =>
            prev.filter((request) => request._id !== requestIdToDelete)
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <div className="flex flex-wrap gap-4">
      <Link to={`/req-items-seller`}>
        <Button gradientDuoTone='purpleToBlue'>Request Items</Button>
      </Link>
      </div>

      <h1 className="pt-6 px-4 font-semibold">Item Requests</h1>
      { Array.isArray(Requests) && Requests.length > 0 ? (
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Seller</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
            {/* <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Subtotal</Table.HeadCell>
            <Table.HeadCell>Delivery Fee</Table.HeadCell>
            <Table.HeadCell>Payment</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell> */}
          </Table.Head>
          {Requests.map((request)=>(
            <Table.Body className='divide-y' key={request._id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>

                <Table.Cell>
                  {request.title}
                </Table.Cell>

                <Table.Cell>
                  {/* <img
                    src={order.profilePicture}
                    alt={order.username}
                    className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                  /> */}
                  {request.category}
                </Table.Cell>

                <Table.Cell>{request.description}</Table.Cell>

                <Table.Cell>{request.quantity}</Table.Cell>

                <Table.Cell>{request.email}</Table.Cell>

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
                  {request.supplier}
                </Table.Cell>
                {/* <Table.Cell>{orders.address},{orders.state},{orders.zip}</Table.Cell>
                <Table.Cell>Rs.{orders.subtotal}.00</Table.Cell>
                <Table.Cell>Rs.{orders.deliveryfee}.00</Table.Cell>
                <Table.Cell>Rs.{orders.totalcost}.00</Table.Cell> */}
                <Table.Cell>
                  <div className="flex flex-row gap-2">
                    <Link to={`/update-request/${request._id}`}>
                      <button><box-icon name='edit-alt' color='#65B741'></box-icon></button>
                    </Link>
                    <button onClick={() => {
                              setShowModel2(true);
                              setRequestIdToDelete(request._id);
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
      <Modal show={showModel2} onClose={()=>setShowModel2(false)} popup size='md'>
          <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to Delete this Request Record</h3>
            </div>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteRequest}>
                Yes, I am sure
              </Button>
              <Button color='gray' onClick={() => setShowModel2(false)}>
                No, cancel
              </Button>
            </div>
          </Modal.Body>
      </Modal>

  </div>
  )
  
}
