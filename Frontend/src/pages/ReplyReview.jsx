import { Alert, Button , Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate , useParams} from "react-router-dom";
import { useSelector } from "react-redux";

export default function ReplyReview() {
  const[file,setFile]=useState(null);
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
 
  

  const handleReply = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`/api/reviews/adminReply/${reviewId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser.token}` // Send admin token
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
        navigate('/dashboard?tab=reviews');
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleCancel = () => {
    // Redirect to the product slug
    navigate(`/dashboard?tab=reviews`);
};


  return (
    <div className="p-3 m-6 max-w-xl mx-auto  border border-teal-500 rounded-xl ">
        <h1 className="text-center text-3xl my-7 font-semibold">Reply Reviews</h1>
        <form className="flex flex-col  gap-4" onSubmit={handleReply}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between '>

            <Textarea className="w-96 w-full" type='text'placeholder='reply-text'required id='reply'  onChange={(e) =>
              setFormData({ ...formData, reply: e.target.value })
            } value={formData.reply}/>
          
         </div>
         
        <Button type='submit' gradientDuoTone='purpleToBlue'>Reply</Button>
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
