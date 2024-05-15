import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import 'boxicons/css/boxicons.min.css';
import { Link } from "react-router-dom";

export default function DashDeliveries() {
    const { currentUser } = useSelector((state) => state.user);
    const [Deliveries, setDeliveries] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModel , setShowModel] = useState(false);
    const [deliverIdToDelete, setDeliverIdToDelete] = useState('');

    // const [totalOrders, setTotalOrders] = useState(0);
    // const [totalSale, setTotalSale] = useState(0);



  //fetch all the orders from database
    useEffect(() => {

      const fetchDeliveries = async () => {
        try {
          const res = await fetch(`/api/delivery/getalldeliveries`);
          const data = await res.json();
        //   const length = data.length;

        //   setTotalOrders(length);
          if (res.ok) {
            setDeliveries(data);
            if (data.length < 9) {  
              setShowMore(false);

            }
          }
        } catch (error) {
          console.log("error in fetching", error);
        }

        // const calculateTotalSale = () => {
        //   const total = Orders.reduce((accumulator, currentOrder) => {
        //     return accumulator + parseFloat(currentOrder.totalcost);
        //   }, 0);
        //   setTotalSale(total);
        // };
    
        // calculateTotalSale();
      };
      if (currentUser) {
        fetchDeliveries();
      }
    } ,[currentUser]);

    //delete order by id
    const handleDeleteOrder = async () => {
      setShowModel(false);
      try {
        const res = await fetch(
          `/api/delivery/deletedelivery/${deliverIdToDelete}`,
          {
            method: 'DELETE',
          }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message); 
        } else {
          setDeliveries((prev) =>
            prev.filter((orders) => orders._id !== deliverIdToDelete)
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

  
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <div className="flex flex-wrap gap-5">
        
      </div>
      <h1 className="pt-6 px-4 font-semibold">Deliveries created</h1>
    { Array.isArray(Deliveries) && Deliveries.length > 0 ? (
    <>
    <Table hoverable className='shadow-md'>
      <Table.Head>
        <Table.HeadCell>First Name</Table.HeadCell>
        <Table.HeadCell>Last Name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Phone</Table.HeadCell>
        <Table.HeadCell>Address</Table.HeadCell>
        <Table.HeadCell>Tracking Number</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Service</Table.HeadCell>
        <Table.HeadCell>Contact No</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
      </Table.Head>
      {Deliveries.map((delivery)=>(
        <Table.Body className='divide-y' key={delivery._id}>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>

            {/* <Table.Cell>
              {delivery.userId}
            </Table.Cell> */}

            {/* <Table.Cell>
              {delivery.orderId}
            </Table.Cell> */}

            <Table.Cell>{delivery.first_name}</Table.Cell>

            <Table.Cell>{delivery.last_name}</Table.Cell>

            <Table.Cell>{delivery.email}</Table.Cell>

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
              {delivery.phone}
            </Table.Cell>
            <Table.Cell>{delivery.address},{delivery.state},{delivery.zip}</Table.Cell>
            <Table.Cell>{delivery.trackingnumber}</Table.Cell>
            <Table.Cell>{delivery.status}</Table.Cell>
            <Table.Cell>{delivery.deliveryservice}</Table.Cell>
            <Table.Cell>{delivery.deliverycontactno}</Table.Cell>

            <Table.Cell>
              <div className="flex flex-row gap-2">
                <Link to={`/update-delivery/${delivery._id}`}>
                  <button><box-icon name='edit-alt' color='#65B741'></box-icon></button>
                </Link>

                <button onClick={() => {
                          setShowModel(true);
                          setDeliverIdToDelete(delivery._id);
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
        <p>Haven't any deliveries to show</p>
      )}

      <Modal show={showModel} onClose={()=>setShowModel(false)} popup size='md'>
          <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to Delete this record</h3>
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
