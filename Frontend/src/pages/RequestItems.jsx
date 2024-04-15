import {useState} from 'react'
import { Alert, Button, TextInput, Select } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';

export default function RequestItems() {
    const [formData , setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/api/order/place-request', {
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
    
          if (res.ok) {
            setPublishError(null);
            navigate(`/dashboard?tab=restock`);
          }
        } catch (error) {
          setPublishError('Something went wrong');
        }
      };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Place an Item Request</h1>
        <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput  type='text'placeholder='Title'required id='title'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }/>
          <Select required onChange={(e) =>setFormData({ ...formData, category: e.target.value })
            }>
            <option value='uncategorized'>Select a category</option>
            <option value='arrangements'>Arrangements</option>
            <option value='bouquets'>Bouquets</option>
            <option value='singleflowers'>Single Flowers</option>
          </Select>
         </div>
        
        <ReactQuill theme="snow" placeholder="Description..." className="h-52 mb-12"  onChange={(value)=>{setFormData({...formData,description:value})}}/>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            
            <TextInput type="number" placeholder="Quantity" id="stockQuantity" required onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }/>
            <TextInput type="email" placeholder="Email" id="email" required onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }/>
            <TextInput type="text" placeholder="Supplier" id="supplier" required onChange={(e) =>
               setFormData({ ...formData, supplier: e.target.value })
            }/>
        </div>
        <Button type='submit' gradientDuoTone='purpleToBlue'>Place the record</Button>
        {/* {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )} */}
        </form>
    </div>
  )
}
