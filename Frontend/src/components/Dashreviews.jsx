import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import ReviewDisplay from './ReviewsDisplay';

export default function Dashreviews({ productId, title }) {
  const { currentUser } = useSelector(state => state.user);

  return (
    <div>
      {currentUser ?
        (
          <div className='max-w-2xl mx-auto w-full p-3'>
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
              <p>Signed in as :</p>
              <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="" />
              <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline '>
                @{currentUser.username}
              </Link>
            </div>

            <ReviewForm productId={productId} title={title} />
            {/*<ReviewDisplay productId={productId} />*/}

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
    </div>
  );
}
