import {
  DollarCircleOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import  html2pdf from "html2pdf.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


import { useSelector } from "react-redux";
import Suppliers from "./suppliers";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Content } from "antd/es/layout/layout";



export default function Supplierperfromance() {

  
  const [orders, setOrders] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const[scount,setscount]=useState(0);
  const[ocount,setocount]=useState(0);
  const[dcount,setdcount]=useState(0);
  const[totalost,settotalost]=useState(0);
  const [Suppliers,setsuppliers] = useState ([])
  const [reveneuData, setReveneuData] = useState({labels: [],datasets: [],});
  const [srecords,setrecords] = useState ([])
  const [showModel , setShowModel] = useState(false);
  const [IdToDelete, setIdToDelete] = useState('');
  const [rsuppliername,setrsuppliername]= useState();
  const [itemname,setitemname]= useState();
  const [quantity,setquantity]= useState();
  const [date,setdate]= useState();
  const [cost,setcost]= useState();
  const [dstatsu,setdstatus]= useState();
  
  
  
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Damaged/unaccurate item rates",
      },
    },
  };

  const generatePDFReport = () => {
    const content = `
      <style>
   
    div{
      height:800px;
      border: 2px solid #63ccf2;
    }

      h1{
        padding-left:25%;
        font-size:40px;
        padding-bottum:50px;
        color:#63ccf2;
        
      }
      h3{
        padding-left:40%;
        padding-bottum:50px;
      }
        table {
          width: 100%;
          border-collapse: collapse;
          padding-left:30px;
          padding-top:30px;
          padding-right:30px;
          pading-bottom:80px;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
          font-size: 14px; /* Adjust font size */
        }
        td {
          font-size: 12px; /* Adjust font size */
        }
        p{
          font-size: 14px;
         

        }


      </style>
      <div>
      <h6>DATE:${new Date().toLocaleDateString()}</h6>
      <h1><b>FLOWEWR SHOP Pvt ltd</b></h1><br>
      <h3><b>Delivery Confirmation Receipt</b></h3>

      <p><b>Supplier Name:</b>${rsuppliername}</p>
      <p><b>Owner name : </b>MR. Jayawardhana</p>
    
      <br>
      <br>
      <table>
        <thead>
          <tr>
       
            <th>Item name</th>
            <th>Quantity</th>
            <th>Total Cost</th>
            <th>Date</th>
            <th>Delivery status</th>
          </tr>
        </thead>
        <tbody>
      
            <tr>
            
              <td>${itemname}</td>
              <td>${quantity}</td>
              <td>Rs:${cost}</td>
              <td>${new Date(date).toLocaleDateString()}</td>
              <td>${dstatsu}</td>
            </tr>
       
          
        </tbody>
      </table>
      <br>
      <br>
      <br>
      <br>
      <br>
      <p>- - - - - - - - - - - -</p>
      <p>Owner signature</p><br>
      <h4>Sonduru Mal pvt ltd</h4>
      <p>Wanduragala, Kurunegala ,SL</p>
      <p>+ 078 709 4129</p>
      <p> flora@info.com</p><br>
      <P><b>IMPORTAINT:</b>Upon receipt of supplies, 
      payment will be remitted within 7 days from the date of delivery. 
      The invoice serves as confirmation of receipt of goods and payment. 
      Any discrepancies or issues with the supplies must be reported within 2 
      days of delivery for resolution. By accepting payment, the supplier acknowledges 
      that the transaction is complete and the goods have been received in satisfactory 
      condition, unless otherwise notified within the specified timeframe.</P>
  

      </div>
    `;

    html2pdf().from(content).set({ margin: 1, filename: 'supplies_report.pdf' }).save();
  };



const handleGenerateReport = async(id) => {
  const res = await fetch(`/api/suppliers/getprintstck/${id}`);
  const data = await res.json();
  if (!res.ok) {
    console.log("error")

    return;
  }
  if (res.ok) {
     setrsuppliername(data.supplier)
     setitemname(data.itemname)
     setcost(data.cost)
     setdstatus(data.Deliverystatus)
     setquantity(data.quantity)
     //console.log(data.supplier)
     setdate(data.Date)
     generatePDFReport();

  }
    
   };

 




  useEffect(() => {
    const fetchcount = async () => {
      try {
        const res = await fetch('/api/suppliers/getcount');
        const data = await res.json();
        if (res.ok) {
           
        setscount(data.supplierCount)
        setocount(data.orderCount)
        setdcount(data.dCount)
        //console.log(ocount)
        //console.log(scount)
        //console.log(dcount)
        settotalost(data.Totalcost)
        //console.log(data.Totalcost)
          
             
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    const fetchrecords= async () => {
      try {
        const res = await fetch('/api/suppliers/getstockrecords');
        const data = await res.json();
        if (res.ok) {
           
          setrecords(data)
            //console.log(data);
          
             
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    const fetchchart = async () => {
      try {
        const res = await fetch('/api/suppliers/get');
        const Data = await res.json();
        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "Damaged/Unaccurate item rates",
            },
          },
        };
      
        if (res.ok) {
            setsuppliers(Data);
            console.log(Data);
        
     
            const labels = Suppliers.map((sup) => {
                return `${sup.suppliername}`;
              });
              const data = Suppliers.map((sup) => {
                return sup.damageditemcount;
              });
            
        
              const dataSource = {
                labels,
                datasets: [
                  {
                    label: "Item Count",
                    data: data,
                    backgroundColor: "rgba(255, 0, 0, 1)",
                  },
                ],
              };
        
              setReveneuData(dataSource);
              console.log(reveneuData);
             
        }
      } catch (error) {
        console.log(error.message);
      }
    }; if (currentUser.isAdmin) {
      fetchchart();
      fetchcount();
      fetchrecords();
    }
    
  }, [currentUser._id,reveneuData]);




  const handleDelete =async()=>{
    setShowModel(false);
    try {
      const res = await fetch(
        "/api/suppliers/deletestockrecords/"+IdToDelete,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message); 
        window.location.href='/dashboard?tab=sperforamnce';
      } 
      if (res.ok) {
    
        window.location.href='/dashboard?tab=sperforamnce';
      } 
    } catch (error) {
      console.log(error.message);
    }}













  return (
    <Space size={50} direction="vertical">
      <Typography.Title level={4} style={{
           
           marginLeft:400,
           fontSize:13,
           marginTop:20,
           color:"grey",
           fontSize:30,
            }}>Supplier Performance Analysis</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard 
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 20,
                marginLeft:20,
              }}
            />
          }
          title={"Total Orders from suppliers"}
          value={ocount}
        />
        <DashboardCard
          icon={
            <WarningFilled
              style={{
                color: "red",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 20,
              }}
            />
          }
          title={"Late Deliveries"}
          value={dcount}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 20,
              }}
            />
          }
          title={"Total Suppliers"}
          value={scount}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 20,
              }}
            />
          }
          title={"Total cost for stock orders Rs:"}
          value={totalost}
        />
     
      </Space>
      <Space direction="vertical">
                    <Card style={{ width:1000,  paddingBottom:20,}}>
      <Bar options={options} data={reveneuData} />
    </Card>
   
</Space>
       <Space>
     
       <div class="outer-wrapper" style={{  paddingBottom:50,}}>
       <h3><b>Supplier Stock Order Records</b></h3>
       <Link className='text-teal-500 hover:underline'to={`/add-srecords`} style={{
             marginLeft:500,
      

             
             }}>
               
                      <span>Add Restock Records</span>
                    </Link>
  <div class="table-wrapper">
 
<>
     
   
          <Table  className="shadow-md"     style={{
              width:1100,
            
           
             marginLeft:20,
            
          
             
             }}>
        
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell> Item name</Table.HeadCell>
              <Table.HeadCell>Quantatity</Table.HeadCell>
              <Table.HeadCell>Cost </Table.HeadCell>
              <Table.HeadCell>Date </Table.HeadCell>
              <Table.HeadCell>Delivery status</Table.HeadCell>
              <Table.HeadCell>Remove</Table.HeadCell>
              <Table.HeadCell>Print Receipt</Table.HeadCell>
           
  
             
            </Table.Head>
          
    { srecords.map(
      i=>{
        return(
         
     
            <Table.Body  className='divide-y'  key={i._id} style={{
             
            
          
            
         
         
          
             
             }} >
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{i.supplier}</Table.Cell>
                  
                  
                  <Table.Cell>{i.itemname}</Table.Cell>
                 
                  <Table.Cell>{i.quantity}</Table.Cell>
                  <Table.Cell>Rs:{i.cost}</Table.Cell>
                  <Table.Cell>{new Date(i.Date).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{i.Deliverystatus}</Table.Cell>
                  <Table.Cell><span className='font-medium text-red-500 hover:underline cursor-pointer'
                        onClick={() => {
                          setShowModel(true);
                          setIdToDelete(i._id);
                        }} 
                    >
                      Remove
                    </span></Table.Cell>
                    <Table.Cell><span className='text-teal-500 hover:underline'
                     onClick={() => {
                     
                      handleGenerateReport(i._id);
                     
                    }} 
                        
                    >
                      Print
                    </span></Table.Cell>
                  
            
                
                  </Table.Row>
                 
                </Table.Body>
                )
  }
 )}
        
  
        </Table>
        
        </>
        </div>
        </div>
        <Modal show={showModel} onClose={()=>setShowModel(false)} popup size='md'>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to remove  this Supplier</h3>
          </div>
          <div className='flex justify-center gap-4'>
            <Button color='failure'  onClick={()=>handleDelete()}>
              Yes, I am sure
            </Button>
            <Button color='gray' onClick={() => setShowModel(false)}>
              No, cancel
            </Button>
          </div>
        </Modal.Body>
    </Modal>

        </Space>






     
      
     
    </Space>







  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{
           
      marginLeft:30,
      fontSize:20,
      width:250,
       }}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

