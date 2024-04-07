import React from 'react'
import { Alert, Button, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import 'react-circular-progressbar/dist/styles.css';

import { useNavigate , useParams} from "react-router-dom";

export default function UpdateRequest() {
    const [formData , setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { requestId } = useParams();

    const navigate = useNavigate();
    // const { currentUser } = useSelector((state) => state.user);

    //fetch relevant order using id
        useEffect(() => {
            try {
            const fetchRequest = async () => {
                const res = await fetch(`/api/order/get-request/${requestId}`);
                const data = await res.json();
                if (!res.ok) {
                console.log(res);
                }
                if (res.ok) {
                    console.log(data);
                //   setFormData(data.orders[0]);
                setFormData(data);
                }
            };
        
            fetchRequest();
            } catch (error) {
            console.log(error.message);
            }
        }, [requestId]);

      //handle form submit
      // const handleSubmit = async (e) => {
      //   e.preventDefault();
      //   try {
      //       const res = await fetch(`/api/order/updateorder/${orderId}`, {
      //           method: 'PUT',
      //           headers: {
      //             'Content-Type': 'application/json',},
      //       body: JSON.stringify(formData),
      //     });

      //     const data = await res.json();
          
      //     if (!res.ok) {
      //       // setPublishError(data.message);
      //       // return;
      //       console.log(data);
      //     }
    
      //     if (res.ok) {
      //       navigate('/dashboard?tab=orders');
      //     }
      //   } catch (error) {
      //     console.log(error.message);
      //   }
      // };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/order/updaterequest/${formData._id}`, {
                method: 'PUT',
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
            navigate('/dashboard?tab=restock');
          }
        } catch (error) {
          setPublishError('Something went wrong');
        }
      };

  return (
    <div className="p-3 mx-auto">
        <h1 className="text-center text-3xl my-7 font-semibold">Update Request</h1>
        <form className="flex max-w-3xl flex-col mx-auto pb-10" onSubmit={handleSubmit} >
            <div className='flex flex-col justify-center'>
                <div>
                    <TextInput type='text' required id='userId' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, _id: e.target.value })} value={formData._id} placeholder="id" readOnly />
                    <TextInput type='text' required id='userId' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData.title} placeholder="Title"  />
                    <TextInput type='text' required id='orderId' className='p-1 mb-2' onChange={(e) => setFormData({ ...formData, category: e.target.value })} value={formData.category} placeholder="Order ID" />
                    <Textarea type='text' required id='first_name' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, description: e.target.value })} value={formData.description} placeholder="Description"/>
                    <TextInput type='number' required id='last_name' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} value={formData.quantity} placeholder="Quantity"/>
                    <TextInput type='email' required id='email' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} placeholder="Email"/>
                    <TextInput type='text' required id='phone' className='p-2' onChange={(e) => setFormData({ ...formData, supplier: e.target.value })} value={formData.supplier} placeholder="Supplier"/>
                </div>
                
            </div>
            <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
            {publishError && (
            <Alert className='mt-5' color='failure'>
                {publishError}
            </Alert>
            )}
            </form>

    </div>
  )
}
