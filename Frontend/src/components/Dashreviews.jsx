import { Textarea, Alert, Button, FileInput, Select, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link ,Navigate,useNavigate} from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Review from '../../../api/models/review.model.js';
import Reviews from './Reviews';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function Dashreviews({ productId , title}) {
  console.log(title)
  const { currentUser} = useSelector(state => state.user);
  const [reviewError, setReviewError] = useState(null);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [reviewToDelete, setreviewToDelete] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [publishError, setPublishError] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (review.length > 300) {
        return;
      }
      if (file) {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage, fileName);
  
        const resizedFile = await resizeImage(file); // Resize the image
  
        const uploadTask = uploadBytesResumable(storageRef, resizedFile);
  
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
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUploadProgress(null);
              setImageUploadError(null);
  
              setFormData({ ...formData, image: downloadURL });
              submitReview({ ...formData, reviewimage: downloadURL });
  
              setFile(null);
              setFormData({ ...formData, image: null });
            });
          }
        );
      } else {
        submitReview({ ...formData, title });

      }
    } catch (error) {
      console.log(error);
      setImageUploadError('Failed to upload image');
      setImageUploadProgress(null);
    }
  };
  
//resize image size

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 50; // Define maximum width for resized image
          const MAX_HEIGHT = 50; // Define maximum height for resized image
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, { type: 'image/jpeg' });
            resolve(resizedFile);
          }, 'image/jpeg', 0.9);
        };
        reader.onerror = (error) => reject(error);
      };
    });
  };

  const handleShowMore = async () => {
    if (!reviews) {
      console.error('Reviews array is undefined.');
      return;
    }
    const startIndex = reviews.length;
    try {
      const res = await fetch(`/api/reviews/getProductReview/${productId}?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        if (Array.isArray(data) && data.length < 6) {
          setShowMore(false); 
        } else if (Array.isArray(data)) {
          setReviews((prevReviews) => [...prevReviews, ...data]);
        } else {
          console.error('Invalid data format: data is not an array.');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
//submite review
  const submitReview = async (formData) => {
    try {
      const res = await fetch(`/api/reviews/add`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({ content: review,rating, productId, userId: currentUser._id, reviewimage: formData.reviewimage, username:currentUser.username,title}),
      });
      const data = await res.json();
      if (res.status === 200) {
        setReview('');
        setRating();
        setReviewError(null);
        setReviews([data, ...reviews]);
        setRating([data, ...rating]);
      }
      title
      if (!res.ok) {
        setReviewError(data.message);
        return;
      }

      if (res.ok) {
        setReviewError(null);
      
      }

      
    } catch (error) {
      setReviewError(error.message);
    }
  };

  const handleUploadImage = () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );

    } catch (error) {
      setImageUploadError('Failed to upload image');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  //get reviews and display to reviews section

  useEffect(() =>{
    const getreviews = async() => {
      try{
        const res = await fetch(`/api/reviews/getProductReview/${productId}`);
        
        if(res.ok){
          const data = await res.json();
          setReviews(data);
          
        }

      }
      catch(error){
        console.log(error.message);
      }
    };
    getreviews();
  },[productId])

 

  

const handleUpdate =async(review,updatedContent) => {
  setReviews(
    reviews.map((r) => (r._id === review._id ? {...r,content:updatedContent}:r))
  );
};

const handleDelete = async(reviewId) => {
  try {
    setshowModal(false);
    if(!currentUser){
      Navigate('/signin');
      return;
    }
    const res = await fetch(`/api/reviews/deleteReview/${reviewId}`,{
      method: 'Delete',
    });
    if(res.ok){
      const data = await res.json();
      setReviews(reviews.filter((review) => review._id !== reviewId));
    }
  } catch (error) {
    console.log(error.message);
  }
}

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ?
        (
          <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
            <p>Signed in as :</p>
            <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="" />
            <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline '>
              @{currentUser.username}
              
             
            </Link>
          </div>
        ) : (
          <div className='text-sm text-teal-500 my-5 flex gap-1'>
            You must be signed in to the system
            <Link className='text-blue-600  hover:underline ' to={'/sign-in'}>
              Sign In
            </Link>
          </div>
        )
      }
      {currentUser &&
        (
          <form className=' gap-10 border border-teal-500 rounded-xl p-3' onSubmit={handleSubmit}>
             <div className='p-2'>
                <label className='pr-1 text-gray-500'>Rating</label>
                <select className='m-2 p-1 rounded-md text-gray-600 dark:bg-slate-800 ' required onChange={(e) => setRating(e.target.value)}value={rating}>    
                    <option value="">Select</option>
                    <option value="1">1- Bad</option>
                    <option value="2">2- Fair</option>
                    <option value="3">3- Good</option>
                    <option value="4">4- Very good</option>
                    <option value="5">5- Excelent</option>
                </select>
              </div>
            <Textarea
              placeholder='Add a review..'
              rows='3' maxLength='300'
              onChange={(e) => setReview(e.target.value)}
              value={review} />
            <p className='text-gray-500 text-xs'>{300 - review.length} characters remaining</p>
            <div className='mt-5'>
              {formData.image && (
                <img src={formData.image} alt="upload" className="w-full h-82 object-cover" />
              )}
              <div className='flex justify-between items-center mt-3'>
                <div className='flex gap-10 border-4 border-teal-500 border-dotted p-3 w-full'>
                  <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                  <div className='pl-40'>
                    <Button onClick={handleUploadImage} type='button' gradientDuoTone='purpleToBlue' size='sm' outline disabled={imageUploadProgress}>
                      {imageUploadProgress ? (
                        <div className="w-16 h-16 ">
                          <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}`} />
                        </div>
                      ) : ('Upload Image')}
                    </Button>
                  </div>
                </div>
              </div>
              {imageUploadError && (
                <Alert color='failure'>{imageUploadError}</Alert>
              )}
              
            </div>
            <button   type='submit' className="gap-8 m-2 dark:bg-slate-800 border bg-slate-300 border-teal-500 rounded-xl p-1">Submit</button>
            {reviewError && (
                <Alert color='failure'>{reviewError}</Alert>
              )}
          </form>
        )
      }

      {reviews.length === 0 ? (
        <p className='text-sm my-5'>No Reviews yet!</p>
      ):(
      
        <>
         <div className='text-sm my-5 flex items-center gap-1'>
          <p className='font-semibold'>Reviews</p>
          <div className='border border-gray-400 py-1 px-2 rounded-md'>
            <p className='font-semibold'>{reviews.length}</p>
          </div>
        </div> 
        
        {
          reviews.map(review =>(
            <Reviews 
            key={review._id} 
            review={review} 
            onUpdate={handleUpdate} 
            onDelete={(reviewId) => {setshowModal(true), setreviewToDelete(reviewId)}} />
          ))
        }
         {showMore && (
          <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
             
          </button>
        )}
        
        </>
       
       
      )}
      <Modal show={showModal} onClose={()=>setshowModal(false)} popup size='md'>
          <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to Delete this Review ?</h3>
            </div>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={() => handleDelete(reviewToDelete)}>
                Yes, I am sure
              </Button>
              <Button color='gray' onClick={() => setshowModal(false)}>
                No, cancel
              </Button>
            </div>
          </Modal.Body>
      </Modal>
    </div>
  )
  
}
