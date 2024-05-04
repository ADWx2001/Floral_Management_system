import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";



export default function Addrestockrec() {



  const [formData , setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [Suppliers,setsuppliers] = useState ([])
  const { currentUser } = useSelector((state) => state.user);
 

  const navigate = useNavigate();
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
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/suppliers/addstockrecords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      console.log(formData);

      if (res.ok) {
        setPublishError(null);
        navigate(`/dashboard?tab=sperforamnce`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };



  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Add Re stock Records</h1>
        <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          
      
          <Select  onChange={(e) =>setFormData({ ...formData, SupplierName: e.target.value })
            }>
            <option value='uncategorized'>Select Supplier</option>
            { Suppliers.map(
        i=>{
          return(
            <option value={i.suppliername}>{i.suppliername}</option>
            )
        }
       )}
             
          </Select>
          <Select  onChange={(e) =>setFormData({ ...formData, dstatus: e.target.value })
            }>
            <option value='uncategorized'>Select Delivery Status</option>
            <option value='Late Delivery'>Late Delivery</option>
            <option value='Timely Delivered'>Timely Delivered</option>
            
          </Select>
         </div>
     
     
        <TextInput type='text'placeholder='Item Name'required id='Name'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, itemname: e.target.value })
            }/>

<TextInput type='number'placeholder='Total Cost'required id='Total Cost'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, cost: e.target.value })
            }/>
            <TextInput type='number'placeholder='Quantity'required id='Quantity'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, qan: e.target.value })
            }/>
            <TextInput type='date'placeholder='Date'required id='Date'className='flex-1'  onChange={(e) =>{
               const selectedDate = new Date(e.target.value);
    
               // Format the date to "YYYY-MM-DD" format
               const formattedDate = selectedDate.toLocaleDateString('en-CA'); 
              setFormData({ ...formData, date: formattedDate})
            }}/>
           
        <Button type='submit' gradientDuoTone='purpleToBlue'>Add</Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
        </form>
    </div>
  )
}
