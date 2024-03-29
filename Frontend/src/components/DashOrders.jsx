import { Table, Button } from 'flowbite-react';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashOrders() {
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
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
        <Table.HeadCell>Payment</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
      </Table.Head>
      {/* {orders.map((order) => ( */}
        <Table.Body className='divide-y'>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>

            <Table.Cell>
              
            </Table.Cell>

            <Table.Cell>
              {/* <img
                src={order.profilePicture}
                alt={order.username}
                className='w-10 h-10 object-cover bg-gray-500 rounded-full'
              /> */}
            </Table.Cell>

            <Table.Cell></Table.Cell>

            <Table.Cell></Table.Cell>

            <Table.Cell>
              {/* {order.isAdmin ? ( */}
                <FaCheck className='text-green-500' />
              {/* ) : ( */}
                <FaTimes className='text-red-500' />
              {/* )} */}
            </Table.Cell>

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
            </Table.Cell>

          </Table.Row>
          
        </Table.Body>
      {/* ))} */}
    </Table>
    {/* {showMore && (
      <button
        onClick=""
        className='w-full text-teal-500 self-center text-sm py-7'
      >
        Show more
      </button>
    )} */}
  </>
  </div>
  )
}



// import { Modal, Table, Button } from 'flowbite-react';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { HiOutlineExclamationCircle } from 'react-icons/hi';
// import { FaCheck, FaTimes } from 'react-icons/fa';

// export default function DashOrders() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [orders, setOrders] = useState([]);
 
//   return (

//   );
// }
