import React from 'react'
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import 'react-circular-progressbar/dist/styles.css';

import { useNavigate , useParams} from "react-router-dom";

export default function UpdateDelivery() {
    const [formData , setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { deliveryId } = useParams();

    const navigate = useNavigate();
    // const { currentUser } = useSelector((state) => state.user);

    //fetch relevant order using id
        useEffect(() => {
            try {
            const fetchDeliveryRecord = async () => {
                const res = await fetch(`/api/delivery/getdelivery/${deliveryId}`);
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
        
            fetchDeliveryRecord();
            } catch (error) {
            console.log(error.message);
            }
        }, [deliveryId]);

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
            const res = await fetch(`/api/delivery/updatedelivery/${formData._id}`, {
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
            navigate('/dashboard?tab=delivery');
          }
        } catch (error) {
          setPublishError('Something went wrong');
        }
      };

  return (
    <div className="p-3 mx-auto">
        <h1 className="text-center text-3xl my-7 font-semibold">Update Delivery Record</h1>
        <form className="flex max-w-3xl flex-col mx-auto pb-10" onSubmit={handleSubmit} >
            <div className='flex flex-col justify-center'>
            <div>
                    {/* <TextInput type='text' required id='userId' className='p-2 mb-2 w-72' onChange={(e) => setFormData({ ...formData, _id: e.target.value })} value={formData._id} placeholder="id" /> */}
                    <label>User ID</label>
                    <TextInput type='text' required id='userId' className='p-2 mb-2 w-72' onChange={(e) => setFormData({ ...formData, userId: e.target.value })} value={formData.userId} placeholder="User ID" readOnly/>
                    <label>Order ID</label>
                    <TextInput type='text' required id='orderId' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, orderId: e.target.value })} value={formData._id} placeholder="Order ID" readOnly/>
                    <label>Items</label>
                    <TextInput type='text' required id='items' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, items: e.target.value })}  value={formData.items} placeholder="Items" readonly/>
                    <label>First Name</label>
                    <TextInput type='text' required id='first_name' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} value={formData.first_name} placeholder="First Name" readOnly/>
                    <label>Last Name</label>
                    <TextInput type='text' required id='last_name' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} value={formData.last_name} placeholder="Last Name" readOnly/>
                    <label>Email</label>
                    <TextInput type='text' required id='email' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} placeholder="Email" readOnly/>
                    <label>Phone</label>
                    <TextInput type='text' required id='phone' className='p-2' onChange={(e) => setFormData({ ...formData, phone: e.target.value })} value={formData.phone} placeholder="Phone" readOnly/>
                </div>
                <div >
                    <label>Address</label>
                    <TextInput type='text' required id='address' className='p-2 mb-2 w-72' onChange={(e) => setFormData({ ...formData, address: e.target.value })} value={formData.address} placeholder="Address" readOnly/>
                    <label>State</label>
                    <TextInput type='text' required id='state' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, state: e.target.value })} value={formData.state} placeholder="State" readOnly/>
                    <label>Zip</label>
                    <TextInput type='text' required id='zip' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, zip: e.target.value })} value={formData.zip} placeholder="ZIP" readOnly/>
                    <label>Tracking Number</label>
                    <TextInput type='text' required id='tracking' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, trackingnumber: e.target.value })} value={formData.trackingnumber} placeholder="Add tracking number" />
                    <label>Status</label>
                    <TextInput type='text' required id='status' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, status: e.target.value })} value={formData.status} placeholder="Status" />
                    <label>Delivery Service</label>
                    <TextInput type='text' required id='deliveryservice' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, deliveryservice: e.target.value })} value={formData.deliveryservice} placeholder="Delivery service" />
                    <label>Delivery Contact Number</label>
                    <TextInput type='text' required id='deliveryservice' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, deliverycontactno: e.target.value })} value={formData.deliverycontactno} placeholder="Delivery Contact Number" />
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
