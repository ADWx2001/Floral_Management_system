import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiArrowNarrowUp, HiOutlineExclamationCircle, HiAnnotation } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";

export default function ReviewsAdminDash() {
  const { currentUser } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [totalReviews, settotalReviews] = useState(0);
  const [lastMonthReviews, setlastMonthReviews] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews/getreviews`);
        const data = await res.json();
        if (res.ok) {
          setReviews(data.reviews);
          if (data.reviews.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchReviews();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = reviews.length;
    try {
      const res = await fetch(`/api/reviews/getreviews?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setReviews((prev) => [...prev, ...data.reviews]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
  const fetchReviewsDash =async () => {
    try {
      const resdash = await fetch(`/api/reviews/getreviews?limit=9`);
      const data = await resdash.json();
      if (resdash.ok) {
        setReviews(data.reviews);
        settotalReviews(data.totalReviews);
        setlastMonthReviews(data.lastMonthReviews);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  if(currentUser.isAdmin){
    fetchReviewsDash();
  }
  },[currentUser]);
  

  return (
    
    <div className='table-auto overflow-x-scroll md:mx-auto p-2 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
   
    <div className='flex flex-col p-3 mb-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>
                Total Reviews
              </h3>
              <p className='text-2xl'>{totalReviews}</p>
            </div>
            <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthReviews}
            </span>
            <div className='text-gray-500'>Last Month</div>
          </div>
        </div>

      {currentUser.isAdmin && reviews.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Added</Table.HeadCell>
              <Table.HeadCell>Review Content</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Rating No</Table.HeadCell>
              <Table.HeadCell>UserName</Table.HeadCell>
              <Table.HeadCell>ProductName</Table.HeadCell>
              <Table.HeadCell>Reply</Table.HeadCell>
              
            </Table.Head>
            {reviews.map((review) => (
              <Table.Body className='divide-y' key={review._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(review.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                   {review.content}
                  </Table.Cell>
                  <Table.Cell>
                      <img
                        src={review.reviewimage}
                        alt=''
                        className='w-20 h-10  object-fill bg-gray-500 '
                      />
                  </Table.Cell>
                  <Table.Cell>{review.rating}</Table.Cell>
                  <Table.Cell>{review.username}</Table.Cell>
                  <Table.Cell>{review.productId}</Table.Cell>
                  <Table.Cell>
                    <Link  className='font-medium text-blue-500 hover:underline cursor-pointer' to={`/reply-review/${review._id}`}>
                    <span>
                        Reply
                    </span>
                    </Link>
                  </Table.Cell>

                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no reviews yet!</p>
      )}
      
    </div>
  );
}
