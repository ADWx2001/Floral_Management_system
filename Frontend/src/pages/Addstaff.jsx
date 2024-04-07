
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";

export default function Addstaff() {
  const[file,setFile]=useState(null);
  const[imageUploadProgress,setImageUploadProgress] = useState(null);
  const[imageUploadError,setImageUploadError] = useState(null);
  const [formData , setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();
 
  const handleUploadImage = () =>{
    try {
      if(!file){
        setImageUploadError('please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime()+'-'+file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        
        (error) => {
          setImageUploadError("Image upload failed");
          console.error("Upload error:", error);
          setImageUploadProgress(null);
         
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({...formData, image: downloadURL});
          }
           
          );
        }
      );

    } catch (error) {
      setImageUploadError('Failed to upload image');
      setImageUploadProgress(null);
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/staff/add', {
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
        navigate(`/events`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Add Staff Member</h1>
        <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
        
         <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput type='file'accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
            <Button onClick={handleUploadImage} type='button'gradientDuoTone='purpleToBlue'size='sm' outline disabled={imageUploadProgress}>
              {
                imageUploadProgress ?(
                <div className="w-16 h-16" >
                  <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}`}/>
                </div>
                ) :('Upload Image')

              }
            </Button>
        </div>
        {imageUploadError && (
          <Alert color='failure'>{imageUploadError}</Alert>
        )}
        {formData.image && (
          <img src={formData.image} alt="upload" className="w-full h-82 object-cover"/>
        )}
        <TextInput type='text'placeholder='Member Name'required id='Member Name'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, membername: e.target.value })
            }/>
        <TextInput type='text'placeholder='Salary'required id='Salary'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            }/> 
            <TextInput type='text'placeholder='Age'required id='Age'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, age: e.target.value })
            }/>
            <TextInput type='text'placeholder='Phone number'required id='Phone number'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, number: e.target.value })
            }/>
<TextInput type='text'placeholder='Email'required id='email'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }/>
            <TextInput type='text'placeholder='Address'required id='Address'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, Address: e.target.value })
            }/>
            <TextInput type='text'placeholder='Bank'required id='Bank'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, bank: e.target.value })
            }/>
             <TextInput type='text'placeholder='Account number'required id='Banknumber'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, accnum: e.target.value })
            }/>
            <TextInput type='text'placeholder='Position'required id='pos'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }/>
            
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          
          <Select  onChange={(e) =>setFormData({ ...formData, Paymentmethod: e.target.value })
            }>
            <option value='uncategorized'>Select a Payment method</option>
            <option value='Bank transfer'>Bank transfer</option>
            <option value='Card'>Card</option>
            <option value='Check'>Check</option>
          </Select>
         
         </div>
            
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
