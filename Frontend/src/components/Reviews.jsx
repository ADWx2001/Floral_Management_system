import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useSelector } from "react-redux";
import UpdateReviews from "../pages/UpdateReviews.jsx";
import { HiStar } from "react-icons/hi";

export default function Reviews({ review, onUpdate, onDelete }) {
  const [user, setUser] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(review.content);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${review.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [review]);

  const handleUpdate = () => {
    setIsUpdating(true);
    setUpdatedContent(review.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/reviews/UpdateReview/${review._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: updatedContent,
        }),
      });
      if (res.ok) {
        setIsUpdating(false);
        onUpdate(review, updatedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="text-sm flex p-4 border-b dark border-gray-400">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-300"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-3">
          <span className="font-semibold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "Anonymous user"}
          </span>
          <span className="text-gray-250 text-xs">
            {moment(review.createdAt).fromNow()}
          </span>
        </div>

        {isUpdating ? (
          <UpdateReviews
            review={review}
            onSave={handleSave}
            onCancel={() => setIsUpdating(false)}
          />
        ) : (
          <>
            <div className="text-gray-500 pb-2 text-xl flex flex-wrap items-center">
              <HiStar className="text-yellow-300 text-xl" />
              <span className="text-xl pl-2 "> {review.rating} </span>
            </div>
            <p className="text-gray-500 pb-2">{review.content}</p>
            <div className="mt-2 p-1">
              <img
                src={review.reviewimage}
                alt=""
                className="w-20 h-10 object-fill bg-gray-500"
              />
            </div>
            <div>
              {currentUser && currentUser._id === review.userId && (
                <>
                  <button
                    className="font-normal  text-gray-400 hover:text-blue-500"
                    type="button"
                    onClick={handleUpdate}
                  >
                    Edit
                  </button>

                  <button
                    className="font-normal p-3 text-gray-400 hover:text-red-500"
                    type="button"
                    onClick={() => onDelete(review._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            <div className="pl-16 ">
              {review.reply && (
                <>
                  <div className=" bg-slate-100 rounded-md p-1 m-1 w-80">
                    <div className="flex flex-wrap items-center mb-3 ">
                    
                      <span className="text-xs font-semibold text-blue-600 pt-1 pl-1">
                        {" "}
                        ADMIN{" "}
                      </span>
                      <HiStar className="text-blue-700 text-lg" />
                    </div>

                    <p className="text-justify pl-3 ">{review.reply}</p>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
