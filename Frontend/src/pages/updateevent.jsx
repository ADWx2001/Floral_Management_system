import { Alert, Button, FileInput, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate , useParams} from "react-router-dom";


export default function Updateevents() {

    const {id} = useParams();
    const[file,setFile]=useState(null);
    const[imageUploadProgress,setImageUploadProgress] = useState(null);
    const[imageUploadError,setImageUploadError] = useState(null);
    const [formData , setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const [Eventname,setname] = useState ([])
    const[des,setdes]=useState();
    const[cat,setcat]=useState();
    const[image,setimage]=useState();
  


    


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
              setimage(downloadURL)
              console.log(image)
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
  


   useEffect(() => {
        try {
          const fetchevent= async () => {
            const res = await fetch(`/api/events/getevent/${id}`);
            const data = await res.json();
            if (!res.ok) {
              console.log("error")
          
              return;
            }
            if (res.ok) {
                
                setname(data.Eventname)
                setcat(data.category)
                setdes(data.descreption)
                setimage(data.Picture)
                setFormData(data)
                console.log(image)
            
             }
          };
    
          fetchevent();
        } catch (error) {
          console.log(error.message[0]);
        }
      }, [id]);
     

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/events/updateevent/${id}`, {
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
            navigate('/dashboard?tab=events');
          }
        } catch (error) {
          setPublishError('Something went wrong');
        }
      };








  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Update  Events</h1>
        <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text'placeholder='Title'required id='title'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            } defaultValue={Eventname}/>
          <Select  onChange={(e) =>setFormData({ ...formData, category: e.target.value })
            } defaultValue={cat}>
            <option value='uncategorized'>Select a category</option>
            <option value='cat 1'>cat 1</option>
            <option value='cat 2'>cat 2</option>
            <option value='cat 3'>cat 3</option>3
          </Select>
         </div>
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
        {image && (
          <img src={image} alt="upload" className="w-full h-82 object-cover"/>
        )}
        <Textarea
          placeholder="Description..."
          className="h-52 mb-12"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          defaultValue={des}
        />
        
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