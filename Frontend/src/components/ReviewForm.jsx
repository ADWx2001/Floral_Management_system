import { Textarea, Alert, Button, FileInput, Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function ReviewForm({ productId, title }) {
  const { currentUser } = useSelector(state => state.user);
  const [reviewError, setReviewError] = useState(null);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');

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

  const submitReview = async (formData) => {
    try {
      const res = await fetch(`/api/reviews/add`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({ content: review, rating, productId, userId: currentUser._id, reviewimage: formData.reviewimage, username: currentUser.username, title }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setReview('');
        setRating();
        setReviewError(null);
      }
      if (!res.ok) {
        setReviewError(data.message);
        return;
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

  return (
    <form className=' gap-10 border border-teal-500 rounded-xl p-3' onSubmit={handleSubmit}>
      <div className='p-2'>
        <label className='pr-1 text-gray-500'>Rating</label>
        <select className='m-2 p-1 rounded-md text-gray-600 dark:bg-slate-800 ' required onChange={(e) => setRating(e.target.value)} value={rating}>
          <option value="">Select</option>
          <option value="1">1- Poor</option>
          <option value="2">2- Fair</option>
          <option value="3">3- Good</option>
          <option value="4">4- Very good</option>
          <option value="5">5- Excellent</option>
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
      <button type='submit' className="gap-8 m-2 dark:bg-slate-800 border bg-slate-300 border-teal-500 rounded-xl w-full py-2">Submit</button>
      {reviewError && (
        <Alert color='failure'>{reviewError}</Alert>
      )}
    </form>
  );
}
