import { Alert, Button, FileInput, Select, TextInput ,Textarea} from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, useNavigate , useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";

export default function ContactSup() {

    const {id} = useParams();
   
   
    const [formData , setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const[name,setname]=useState();
    const[Email,setemail]=useState();
    const[number,setnumber]=useState();
 
  


    


    const navigate = useNavigate();

    useEffect(() => {
        try {
          const fetchsupplier= async () => {
            const res = await fetch(`/api/suppliers/getsupplier/${id}`);
            const data = await res.json();
            if (!res.ok) {
              console.log("error")
          
              return;
            }
            if (res.ok) {
             setname(data.suppliername)
            setnumber(data.phonenumber)
            setemail(data.email)
            setFormData({...formData,email:data.email})
            console.log(formData);
        }
          };
    
          fetchsupplier();
        } catch (error) {
          console.log(error.message[0]);
        }
      }, [id,Email]);
      
     

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/suppliers/sendmail`, {
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
       

        setPublishError('Email Sent');
        //navigate(`/dashboard?tab=suppliers`);
            
       
          }
        } catch (error) {
          setPublishError('Something went wrong');
        }
      };








  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Send Email</h1>
        <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
     
       <TextInput type='text'placeholder='Supplier Name'required id='Name'className='flex-1'  Value={name}  readOnly/>

            <TextInput type='text'placeholder='Phone Number:'required id='Phone Number:'className='flex-1'    readOnly Value={number} 
            />
            <TextInput type='text'placeholder='Email Address:'required id='Email Address:'className='flex-1'  readOnly  Value={Email} 
            />
            <TextInput type='text'placeholder='Subject'required id='Subject'className='flex-1' onChange={(e) =>setFormData({ ...formData, subject: e.target.value })} />
            <ReactQuill
          theme="snow"
          placeholder="Description..."
          className="h-52 mb-12"onChange={(value)=>{setFormData({...formData,massege:value})}}/>
        <Button type='submit' gradientDuoTone='purpleToBlue'>Send</Button>
        <a href="https://mail.google.com/mail/u/3/#inbox" style={{ color: 'blue', textDecoration: 'none' }} >Go to gmail inbox</a>
        {publishError && (
          <Alert className='mt-5' color='success'>
            {publishError}
          </Alert>
        )}
        </form>
    </div>
  )
}
