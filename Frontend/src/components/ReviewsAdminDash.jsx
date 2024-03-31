import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function ReviewsAdminDash() {
  const { currentUser } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [reviewIdToDelete, setreviewIdToDelete] = useState('');
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

  

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && reviews.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Added</Table.HeadCell>
              <Table.HeadCell>Review Content</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Rating No</Table.HeadCell>
              <Table.HeadCell>UserID</Table.HeadCell>
              <Table.HeadCell>ProductID</Table.HeadCell>
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
                  <Table.Cell>{}</Table.Cell>
                  <Table.Cell>{review.rating}</Table.Cell>
                  <Table.Cell>{review.userId}</Table.Cell>
                  <Table.Cell>{review.productId}</Table.Cell>
                  
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        
                      }}
                      className='font-medium text-blue-500 hover:underline cursor-pointer'
                    >
                      Reply
                    </span>
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
