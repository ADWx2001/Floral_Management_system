import { Button, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineCurrencyDollar, HiOutlineExclamationCircle, HiOutlineShoppingBag} from "react-icons/hi";
import { useSelector } from "react-redux";
import 'boxicons/css/boxicons.min.css';
import { Link } from "react-router-dom";
import html2pdf from 'html2pdf.js';

export default function DashEventBooking() {
    const { currentUser } = useSelector((state) => state.user);
    const [Records, setRecords] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModel , setShowModel] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState('');

    const [searchName, setSearchName] = useState('');


  
   //fetch all the orders from database
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch(`/api/events/get-event-requests`);
        const data = await res.json();
        
        if (res.ok) {
          setRecords(data);
          if (data.length < 9) {  
            setShowMore(false);
          }
          
        }
      } catch (error) {
        console.log("error in fetching", error);
      }
    };
    
    if (currentUser) {
      fetchRecords();
    }
  }, [currentUser, Records]); 
  

    //delete order by id
    const handleDeleteRecord = async () => {
      setShowModel(false);
      try {
        const res = await fetch(
          `/api/events/delete-event-request/${recordIdToDelete}`,
          {
            method: 'DELETE',
          }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message); 
        } else {
          setRecords((prev) =>
            prev.filter((record) => record._id !== recordIdToDelete)
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const generatePDFReport = () => {
    
      const currentDate = new Date();

      const formattedDate = currentDate.toLocaleString();
    
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
          .report{
            margin-left:30px;
            font-size:10px;
            margin-bottom:10px;
          }
        </style>
    
        <h1 class="report-title"><b>Event Booking Details Report</b></h1>
        <div class="details">
          
        </div>
        <br>
        <br>
        
        <table>
          <thead>
          <!--<p class="report">Report Date: ${formattedDate}</p>--!>
            <tr>
              <th>Client Name</th>
              <th>Phone</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Guest Count</th>
              <th>Budget</th>
              <th>Arrangements</th>
              
            </tr>
          </thead>
          <tbody>
            ${Records.map((record) => `
              <tr>
                <td>${record.name}</td>
                <td>${record.phone}</td>
                <td>${record.time}</td>
                <td>${record.venue}</td>
                <td>${record.guestCount}</td>
                <td> Rs.${record.budget}.00</td>
                <td>${record.arrangements}</td>
              </tr>
            `).join('')}
            
          </tbody>
        </table>
        
      `;
    
      html2pdf().from(content).set({ margin: 1, filename: 'event_bookings_report.pdf' }).save();
    };
    
    
    
    const handleGenerateReport = () => {
      generatePDFReport();
    
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

      </div>
      <h1 className="pt-6 px-4 font-semibold">Event Bookings recieved</h1>
    { Array.isArray(Records) && Records.length > 0 ? (
    <>
    <div className="flex ">
      <TextInput
          type='text'
          placeholder='Search a record by (budget or client)'
          required
          id='title'
          className='flex-1'
          style={{ width: 700, marginTop: 30, marginBottom: 30, marginLeft: 250 }}
          onChange={(e) => setSearchName(e.target.value)}
        />

    </div>

    <Table hoverable className='shadow-md'>
      <Table.Head>
        <Table.HeadCell>Client Name</Table.HeadCell>
        <Table.HeadCell>Phone</Table.HeadCell>
        <Table.HeadCell>Event Date</Table.HeadCell>
        <Table.HeadCell>Event Description</Table.HeadCell>
        <Table.HeadCell>Time</Table.HeadCell>
        <Table.HeadCell>Venue</Table.HeadCell>
        <Table.HeadCell>Guest Count</Table.HeadCell>
        <Table.HeadCell>Theme/Color</Table.HeadCell>
        <Table.HeadCell>Client Budget</Table.HeadCell>
        <Table.HeadCell>Flower Arrangements</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
      </Table.Head>

      {Records.filter((record) => {
        const searchQuery = searchName.toLowerCase();
        const name = record.name.toLowerCase().includes(searchQuery);
        //const budget = record.budget.toLowerCase().includes(searchQuery);
        //const phone = record.phone.toLowerCase().includes(searchQuery);

        // Return true if any of the search criteria match
        return name ;
        }).map((record) => (

        <Table.Body className='divide-y' key={record._id}>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell>{record.name}</Table.Cell>
            <Table.Cell >{record.phone}</Table.Cell>
            <Table.Cell>{new Date(record.date).toLocaleDateString()}</Table.Cell>
            <Table.Cell>{record.description}</Table.Cell>
            <Table.Cell>{record.time}</Table.Cell>
            <Table.Cell>{record.venue}</Table.Cell>
            <Table.Cell>{record.guestCount}</Table.Cell>
            <Table.Cell>{record.themeColor}</Table.Cell>
            <Table.Cell>{record.budget}</Table.Cell>
            <Table.Cell>{record.arrangements}</Table.Cell>
            
            <Table.Cell>
              <div className="flex flex-row gap-2">
                <Link to={`/update-event-record/${record._id}`}>
                  <button><box-icon name='edit-alt' color='#65B741'></box-icon></button>
                </Link>


                <button onClick={() => {
                          setShowModel(true);
                          setRecordIdToDelete(record._id);
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
        <p>You have not any bookings yet</p>
      )}

      <Modal show={showModel} onClose={()=>setShowModel(false)} popup size='md'>
          <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to Delete this Record</h3>
            </div>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteRecord}>
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