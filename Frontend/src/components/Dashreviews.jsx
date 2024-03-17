import { Textarea } from 'flowbite-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Dashreviews({productId}) {
  const {currentUser} = useSelector(state => state.user);

  const[review,setReview] = useState('');
  const handleSubmit =async(e) => {
    e.preventDefault();
    if(review.length>300){
      return;
    }
    const res = await fetch(`/api/reviews/add`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({ content: review, productId, userId: currentUser._id }),
    });
    const data = await res.json();
    if (res.status === 200) {
      setReview('');
    } else {
      
    }
    
  };

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
      ):(
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to the system
          <Link className='text-blue-600  hover:underline ' to={'/sign-in'}>
          sign In</Link>
        </div>
      )
    }
    {currentUser &&
    (
      <form onSubmit={handleSubmit}>
        <Textarea
         placeholder='Add a review..'
         rows='3' maxLength='300' 
         onChange={(e) => setReview(e.target.value)}
         value={review}/>
        <div className='flex justify-between items-center mt-5'>
          <p className='text-gray-500 text-xs' >{300-review.length} charactors remaining</p>
          <button type='submit'>Submit</button>
        </div>
      </form>
    )
    }
    </div>
  )
}
