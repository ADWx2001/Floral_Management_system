import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Reviews from './Reviews';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Modal, Button } from 'flowbite-react';

export default function ReviewDisplay({ productId }) {
  const { currentUser } = useSelector(state => state.user);
  const [reviews, setReviews] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [reviewToDelete, setreviewToDelete] = useState(null);

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

  useEffect(() => {
    const getreviews = async () => {
      try {
        const res = await fetch(`/api/reviews/getProductReview/${productId}`);

        if (res.ok) {
          const data = await res.json();
          setReviews(data);

        }

      }
      catch (error) {
        console.log(error.message);
      }
    };
    getreviews();
  }, [productId]);

  const handleUpdate = async (review, updatedContent) => {
    setReviews(
      reviews.map((r) => (r._id === review._id ? { ...r, content: updatedContent } : r))
    );
  };

  const handleDelete = async (reviewId) => {
    try {
      setshowModal(false);
      if (!currentUser) {
        Navigate('/signin');
        return;
      }
      const res = await fetch(`/api/reviews/deleteReview/${reviewId}`, {
        method: 'Delete',
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(reviews.filter((review) => review._id !== reviewId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ?
        (
          <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
           
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
      {reviews.length === 0 ? (
        <p className='text-sm my-5'>No Reviews yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p className='font-semibold'>Reviews</p>
            <div className='border border-gray-400 py-1 px-2 rounded-md'>
              <p className='font-semibold'>{reviews.length}</p>
            </div>
          </div>

          {
            reviews.map(review => (
              <Reviews
                key={review._id}
                review={review}
                onUpdate={handleUpdate}
                onDelete={(reviewId) => { setshowModal(true), setreviewToDelete(reviewId) }} />
            ))
          }
          {showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
              Load More Reviews
            </button>
          )}

          <Modal show={showModal} onClose={() => setshowModal(false)} popup size='md'>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
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
        </>
      )}
    </div>
  );
}
