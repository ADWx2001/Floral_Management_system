import { Button, Modal, Table } from "flowbite-react";
import { Alert,  FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Suppliers() {

    const { currentUser } = useSelector((state) => state.user);
    const [Suppliers,setsuppliers] = useState ([])
    const [showModel , setShowModel] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState('');
    const [search, setSearch] = useState('');

  

    useEffect(() => {
        const fetchsuppliers= async () => {
          try {
            const res = await fetch('/api/suppliers/get');
            const data = await res.json();
            if (res.ok) {
               
                setsuppliers(data);
                console.log(data);
              
                 
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        if (currentUser.isAdmin) {
          fetchsuppliers();
        }
      }, [currentUser._id]);

      const handleDelete =async()=>{
        setShowModel(false);
        try {
          const res = await fetch(
            "/api/suppliers/delete/"+productIdToDelete,
            {
              method: 'DELETE',
            }
          );
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message); 
            window.location.href='/dashboard?tab=suppliers';
          } 
          if (res.ok) {
        
            window.location.href='/dashboard?tab=suppliers';
          } 
        } catch (error) {
          console.log(error.message);
        }}


    return (


      <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
 
    <Link style={{
              fontSize:18,
               marginLeft:900,
              
              }} className='text-teal-500 hover:underline'to={`/dashboard?tab=sperforamnce`}>
                        <span >View Supplier Performance </span>
                      </Link>
      <>
      <TextInput type='text'placeholder='Search Supplier Name or Company.....'required id='title'className='flex-1'  
               style={{
                width:700,
                marginTop:30,
                marginBottom:30,
                marginLeft:250,
               }}
               onChange={(e) => setSearch(e.target.value)}
              />
     
            <Table hoverable className="shadow-md" >
              
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell> Image</Table.HeadCell>
                <Table.HeadCell>Company name</Table.HeadCell>
               
                <Table.HeadCell>Address</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Payment Type</Table.HeadCell>
                <Table.HeadCell>Communication method</Table.HeadCell>
                <Table.HeadCell>Contact</Table.HeadCell>
               
                <Table.HeadCell>
                  <span>Delete</span>
                </Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
               
              </Table.Head>
             
      { Suppliers.filter((i) => {
                return search.toLowerCase() === ''
                  ? i
                  : i.suppliername.toLowerCase().includes(search) || i.comapnyname.toLowerCase().includes(search);
              }).map(
        i=>{
          return(
           
       
              <Table.Body  className='divide-y'  key={i._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>{i.suppliername}</Table.Cell>
                      <Table.Cell>
               
                         <img
                          src={i.profilePicture}
                          alt={i.suppliername}
                          className="w-20 h-10 object-cover bg-gray-500"
                         />
                     
                    </Table.Cell>
                    
                    <Table.Cell>{i.comapnyname}</Table.Cell>
                   
                    <Table.Cell>{i.address}</Table.Cell>
                    <Table.Cell>{i.category}</Table.Cell>
                    <Table.Cell>{i.paymenttype}</Table.Cell>
                    <Table.Cell>{i.communicationmethod}</Table.Cell>
                    <Table.Cell  >
                    <Link className='text-teal-500 hover:underline'to={`/contactsup/${i._id}`}>
                        <span>Contact</span>
                      </Link>
                    </Table.Cell>

                
                    <Table.Cell>
                      <span className='font-medium text-red-500 hover:underline cursor-pointer'
                          onClick={() => {
                            setShowModel(true);
                            setProductIdToDelete(i._id);
                          }} 
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className='text-teal-500 hover:underline'to={`/updatesup/${i._id}`}>
                        <span>Edit</span>
                      </Link>
                    </Table.Cell>
                  
                    </Table.Row>
                   
                  </Table.Body>
                  )
    }
   )}
         
          </Table>
          
          </>
   
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

      </div>
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           

  )
}

