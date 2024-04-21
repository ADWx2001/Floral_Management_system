import { Button, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineCurrencyDollar, HiOutlineExclamationCircle, HiOutlineShoppingBag} from "react-icons/hi";
import { useSelector } from "react-redux";
import 'boxicons/css/boxicons.min.css';
import { Link } from "react-router-dom";
import html2pdf from 'html2pdf.js';

export default function DashDeliveries() {
    const { currentUser } = useSelector((state) => state.user);
    const [Deliveries, setDeliveries] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModel , setShowModel] = useState(false);
    const [deliverIdToDelete, setDeliverIdToDelete] = useState('');
    const [searchName, setSearchName] = useState('');
    const [totalDeliveries, setTotalDeliveries] = useState(0);
    const [processingItems, setProcessingItems] = useState(0);
    const [shippedItems, setShippedItems] = useState(0);
    const [deliveredItems, setDeliveredItems] = useState(0);



  //fetch all the deliveries from database
    useEffect(() => {

      const fetchDeliveries = async () => {
        try {
          const res = await fetch(`/api/delivery/getalldeliveries`);
          const data = await res.json();
        //   const length = data.length;

        //   setTotalOrders(length);
          if (res.ok) {
            setDeliveries(data);

            let total = 0;
            let processing = 0;
            let shipped = 0;
            let delivered = 0;

            data.forEach((delivery) => {
              const status = delivery.status.toLowerCase();
              total++;
              switch (status) {
                case 'processing':
                  console.log(status);
                  processing++;
                  break;
                case 'shipped':
                  console.log(status);
                  shipped++;
                  break;
                case 'delivered':
                  console.log(status);
                  delivered++;
                  break;
                default:
                  break;
              }
            });

          console.log('Total Deliveries:', total);
          console.log('Processing Items:', processing);
          console.log('Shipped Items:', shipped);
          console.log('Delivered Items:', delivered);


          setTotalDeliveries(total);
          setProcessingItems(processing);
          setShippedItems(shipped);
          setDeliveredItems(delivered);



            if (data.length < 9) {  
              setShowMore(false);

            }
          }

        } catch (error) {
          console.log("error in fetching", error);
        }
      };
      if (currentUser) {
        fetchDeliveries();
      }
    } ,[currentUser]);

    const generatePDFReport = () => {
      const content = `
        <style>
          table {
            margin:0 auto;
            width: 90%;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
            font-size: 10px; 
          }
          td {
            font-size: 10px; 
          }
          .report-title{
            text-align:center;
            font-size:18px;
          }
          .details{
            margin-top:50px;
            margin-left:30px;

          }
        </style>

        <h1 class="report-title"><b>Delivery Details Report</b></h1>
        <div class="details">
          <p>Total Deliveries: ${totalDeliveries}</p>
          <p>Total Processing  : ${processingItems}</p>
          <p>Total Shipped: ${shippedItems}</p>
          <p>Total Delivered: ${deliveredItems}</p>
        </div>
        <br>
        <br>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Items</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Tracking</th>
              <th>Status</th>
              <th>Service</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            ${Deliveries.map((delivery) => `
              <tr>
                <td>${delivery._id}</td>
                <td>
                  ${delivery.items}
                </td>
                <td>${delivery.first_name}</td>
                <td>${delivery.last_name}</td>
                <td>${delivery.address}, ${delivery.state}, ${delivery.zip}</td>
                <td>${delivery.trackingnumber}</td>
                <td>${delivery.status}</td>
                <td>${delivery.deliveryservice}</td>
                <td>${delivery.deliverycontactno}</</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    
      html2pdf().from(content).set({ margin: 1, filename: 'delivery_report.pdf' }).save();
    };
    
    
    const handleGenerateReport = () => {
      generatePDFReport();
    
    };

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
      
      <div className="">
        <Button
            gradientDuoTone='purpleToBlue'
            outline
            onClick={handleGenerateReport}
            className=""
          >
            Generate Report
        </Button>
      </div>

        <div className='flex-wrap flex gap-4 justify-center'>
          
          <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
              <div className=''>
                <h3 className='text-gray-500 text-md uppercase'>Total Deliveries</h3>
                <p className='text-2xl'>{totalDeliveries}</p>
              </div>

              <HiOutlineShoppingBag className='bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg' />

            </div>
            <div className='flex gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiOutlineShoppingBag/>
              </span>
              <div className='text-gray-500'>Processing</div>
            </div>
          </div>
          
          <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
              <div className=''>
                <h3 className='text-gray-500 text-md uppercase'>
                  Processing Items
                </h3>
                <p className='text-2xl'>{processingItems}</p>
              </div>

              <HiOutlineCurrencyDollar className='bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg' />

            </div>
            <div className='flex gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiOutlineCurrencyDollar />
                
              </span>
              <div className='text-gray-500'></div>
            </div>
          </div>

          <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
              <div className=''>
                <h3 className='text-gray-500 text-md uppercase'>
                  Shipped Items
                </h3>
                <p className='text-2xl'>{shippedItems}</p>
              </div>

              <HiOutlineCurrencyDollar className='bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg' />

            </div>
            <div className='flex gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiOutlineCurrencyDollar />
               
              </span>
              <div className='text-gray-500'>All the time</div>
            </div>
          </div>

          <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
              <div className=''>
                <h3 className='text-gray-500 text-md uppercase'>
                  Delivered Items
                </h3>
                <p className='text-2xl'>{deliveredItems}</p>
              </div>

              <HiOutlineCurrencyDollar className='bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg' />

            </div>
            <div className='flex gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiOutlineCurrencyDollar />
               
              </span>
              <div className='text-gray-500'>All the time</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-5">
        
      </div>
      <h1 className="pt-6 px-4 font-semibold">Deliveries created</h1>
    { Array.isArray(Deliveries) && Deliveries.length > 0 ? (
    <>
    <div className="flex ">
      <TextInput
          type='text'
          placeholder='Search a order by (Order ID or User ID)'
          required
          id='title'
          className='flex-1'
          style={{ width: 700, marginTop: 30, marginBottom: 30, marginLeft: 250 }}
          onChange={(e) => setSearchName(e.target.value)}
        />

    </div>

    <Table hoverable className='shadow-md'>
      <Table.Head>
        <Table.HeadCell>User ID</Table.HeadCell>
        <Table.HeadCell>Order ID</Table.HeadCell>
        <Table.HeadCell>Items</Table.HeadCell>
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

      {Deliveries.filter((delivery) => {
        const searchQuery = searchName.toLowerCase();
        const id = delivery._id.toLowerCase().includes(searchQuery);
        const userId = delivery.userId.toLowerCase().includes(searchQuery);
        

        // Return true if any of the search criteria match
        return id || userId;
        }).map((delivery) => (

        
        <Table.Body className='divide-y' key={delivery._id}>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>

            <Table.Cell>
              {delivery.userId}
            </Table.Cell>

            <Table.Cell>
              {/* <img
                src={order.profilePicture}
                alt={order.username}
                className='w-10 h-10 object-cover bg-gray-500 rounded-full'
              /> */}
              {delivery._id}
            </Table.Cell>
              <Table.Cell>{delivery.items} <br /></Table.Cell>
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
