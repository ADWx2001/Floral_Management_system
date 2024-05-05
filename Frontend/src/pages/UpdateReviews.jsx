import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate , useParams} from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdateReviews() {
  const[file,setFile]=useState(null);
  const[imageUploadProgress,setImageUploadProgress] = useState(null);
  const[imageUploadError,setImageUploadError] = useState(null);
  const [formData , setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchReview = async () => {
        const res = await fetch(`/api/reviews/getReviews?reviewId=${reviewId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.reviews[0]);
        }
      };

      fetchReview();
    } catch (error) {
      console.log(error.message);
    }
  }, [reviewId]);
 
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
            setFormData({...formData, reviewimage: downloadURL});
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
        const res = await fetch(`/api/reviews/UpdateReview/${formData._id}/${currentUser._id}`, {
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
        window.location.reload();
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleCancel = () => { 
    // Redirect to the product slug
    window.location.reload();
};


  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen border border-teal-500 rounded-xl ">
        <h1 className="text-center text-3xl my-7 font-semibold">Update Reviews</h1>
        <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>

        <div className='p-2 light:bg-slate-800'>
            <label className='pr-1 text-gray-500 '>Rating</label>
            <select className='m-2 p-1 rounded-md  ' onChange={(e) =>setFormData({ ...formData, rating: e.target.value })} value={formData.rating}>    
                <option value="">Select</option>
                <option value="1">1- Bad</option>
                <option value="2">2- Fair</option>
                <option value="3">3- Good</option>
                <option value="4">4- Very good</option>
                <option value="5">5- Excelent</option>
                </select>
          </div>
          
          
         </div>
         <div className="">
         <TextInput  type='text'placeholder='content'required id='content' rows="3" onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            } value={formData.content}/>
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
        {formData.reviewimage && (
          <img src={formData.reviewimage} alt="upload" className="w-full h-82 object-cover"/>
        )}
        
        <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
        <button className='font-normal  text-gray-400 hover:text-blue-500'  type='button'
                        onClick={handleCancel}>
                        Cancel
                        </button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
        </form>
    </div>
  )
}
