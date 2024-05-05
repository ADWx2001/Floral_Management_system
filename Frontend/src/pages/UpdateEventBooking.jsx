import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import 'react-circular-progressbar/dist/styles.css';

import { useNavigate , useParams} from "react-router-dom";

export default function UpdateEventBooking() {
    const [formData , setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { recordId } = useParams();

    const navigate = useNavigate();
    // const { currentUser } = useSelector((state) => state.user);

    //fetch relevant order using id
        useEffect(() => {
            try {
            const fetchRecord = async () => {
                const res = await fetch(`/api/events/get-event-request/${recordId}`);
                const data = await res.json();
                if (!res.ok) {
                console.log(res);
                }
                if (res.ok) {
                    console.log(data);
                
                setFormData(data);
                }
            };
        
            fetchRecord();
            } catch (error) {
            console.log(error.message);
            }
        }, [recordId]);

     
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/events/update-event-request/${formData._id}`, {
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
            navigate('/dashboard?tab=eventbooking');
          }
        } catch (error) {
          setPublishError('Something went wrong');
        }
      };

  return (
    <div className="p-3 mx-auto">
        <h1 className="text-center text-3xl my-7 font-semibold">Update Booking</h1>
        <form className="flex max-w-3xl flex-col mx-auto pb-10" onSubmit={handleSubmit} >
            <div className='flex flex-col justify-center'>
                <div>
                    
                    <TextInput type='text' required id='userId' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name} placeholder="User ID"/>
                    <TextInput type='number' required id='orderId' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, phone: e.target.value })} value={formData.phone} placeholder="Order ID"/>
                    <TextInput type='date' required id='first_name' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, date: e.target.value })} value={formData.date} placeholder="First Name"/>
                    <TextInput type='time' required id='last_name' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, time: e.target.value })} value={formData.time} placeholder="Last Name"/>
                    <TextInput type='text' required id='email' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, venue: e.target.value })} value={formData.venue} placeholder="Email"/>
                    <TextInput type='text' required id='phone' className='p-2' onChange={(e) => setFormData({ ...formData, description: e.target.value })} value={formData.description} placeholder="Phone"/>
                </div>
                <div >
                    <TextInput type='number' required id='address' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })} value={formData.guestCount} placeholder="Address"/>
                    <TextInput type='text' required id='state' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })} value={formData.themeColor} placeholder="State"/>
                    <TextInput type='number' required id='zip' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, budget: e.target.value })} value={formData.budget} placeholder="ZIP"/>
                    <TextInput type='text' required id='subtotal' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, arrangements: e.target.value })} value={formData.arrangements} placeholder="Subtotal"/>
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

