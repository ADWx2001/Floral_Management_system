/* eslint-disable react/prop-types */
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
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

  
 
  const { currentUser } = useSelector((state) => state.user);

  const[scount,setscount]=useState(0);
  const [Suppliers,setsuppliers] = useState ([])
  const [reveneuData, setReveneuData] = useState({labels: [],datasets: [],});
  const [srecords,setrecords] = useState ([])
  const [showModel , setShowModel] = useState(false);
  const [IdToDelete, setIdToDelete] = useState('');
  


  
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


  useEffect(() => {
    const fetchcount = async () => {
      try {
        const res = await fetch('/api/suppliers/getcount');
        const data = await res.json();
        if (res.ok) {
           
           setscount(data)
            console.log(data);
          
             
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
            console.log(data);
          
             
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
             
        }
      } catch (error) {
        console.log(error.message);
      }
    }; if (currentUser.isAdmin) {
      fetchchart();
      fetchcount();
      fetchrecords();
    }
    
  }, [currentUser._id]);




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
    } catch (error) {
      console.log(error.message);
    }}













  return (
    <Space size={50} direction="vertical" >
      <Typography.Title level={4} style={{
           
           marginLeft:400,
           fontSize:13,
           marginTop:20,
           color:"grey",
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
          title={"Total Orders"}
          value={123}
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
          value={123}
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
          title={"Total cost"}
          value={123}
        />
     
      </Space>
      <Space direction="vertical">
                    <Card style={{ width:1000,  paddingBottom:20,}}>
      <Bar options={options} data={reveneuData} />
    </Card>
   
</Space>
       <Space>
     
       <div className="outer-wrapper" style={{  paddingBottom:50,}}>
       <Link className='text-teal-500 hover:underline'to={`/add-srecords`} style={{
             marginLeft:500,
      

             
             }}>
                      <span>Add Restock Records</span>
                    </Link>
  <div className="table-wrapper dark:bg-slate-800 ">
 
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
              <Table.HeadCell>Print</Table.HeadCell>
           
  
             
            </Table.Head>
          
    { srecords.map(
      i=>{
        return(
         
     
            <Table.Body  className='divide-y dark:bg-slate-800 '   key={i._id} style={{
             
            
          
            
         
         
          
             
             }} >
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{i.supplier}</Table.Cell>
                  
                  
                  <Table.Cell>{i.itemname}</Table.Cell>
                 
                  <Table.Cell>{i.quantity}</Table.Cell>
                  <Table.Cell>{i.cost}</Table.Cell>
                  <Table.Cell>{i.Date}</Table.Cell>
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
