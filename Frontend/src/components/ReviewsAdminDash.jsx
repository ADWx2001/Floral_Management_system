import { Modal, Table, Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiArrowNarrowUp,
  HiOutlineExclamationCircle,
  HiAnnotation,
  HiStar,
} from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";

export default function ReviewsAdminDash() {
  const { currentUser } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  /*const [showMore, setShowMore] = useState(true);*/
  const [totalReviews, settotalReviews] = useState(0);
  const [lastMonthReviews, setlastMonthReviews] = useState(0);
  const [Fivestar, setFivestar] = useState(0);
  const [Fourstar, setFourstar] = useState(0);
  const [Threestar, setThreestar] = useState(0);
  const [Twostar, setTwostar] = useState(0);
  const [Onestar, setOnestar] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews/getreviews`);
        const data = await res.json();
        if (res.ok) {
          setReviews(data.reviews);
          settotalReviews(data.totalReviews);
          setlastMonthReviews(data.lastMonthReviews);
          setFivestar(data.Fivestar);
          setFourstar(data.Fourstar);
          setThreestar(data.Threestar);
          setTwostar(data.Twostar);
          setOnestar(data.Onestar);
          /*if (data.reviews.length < 9) {
            setShowMore(false);
          }*/
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchReviews();
    }
  }, [currentUser._id]);

  /*const handleShowMore = async () => {
    const startIndex = reviews.length;
    try {
      const res = await fetch(`/api/reviews/getreviews?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setReviews((prev) => [...prev, ...data.reviews]);
        if (data.reviews.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };*/

  const generatePDFReport = () => {
    const contentr = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
          font-size: 14px; 
        }
        td {
          font-size: 12px; 
        }
      </style>
      <h1><b>Review & Rating Report</b></h1>
      <p>Total Reviews: ${totalReviews}</p>
      <p>Last Month Total Reviews : ${lastMonthReviews}</p>
      
      <br>
      <br>
      <table>
        <thead>
          <tr>
            <th>Created At</th>
            <th>Review content</th>
            <th>Rating No</th>
            <th>Username</th>
            <th>ProductName</th>
          </tr>
        </thead>
        <tbody>
          ${reviews
            .map(
              (review) => `
            <tr>
              <td>${new Date(review.createdAt).toLocaleDateString()}</td>
              <td>"${review.content}"</td>
              <td>${review.rating}</td>
              <td>${review.username}</td>
              <td>${review.title}</td>
              
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    html2pdf()
      .from(contentr)
      .set({ margin: 1, filename: "Review & Rating_Report.pdf" })
      .save();
  };

  const handleGenerateReport = () => {
    generatePDFReport();
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-2 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="flex justify-between">
        <div></div>

        <Button
          gradientDuoTone="purpleToBlue"
          outline
          onClick={handleGenerateReport}
          className=""
        >
          Generate Report
        </Button>
      </div>
      <div className="flex-wrap flex gap-4 justify-start p-3">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Reviews</h3>
              <p className="text-2xl">{totalReviews}</p>
            </div>
            <HiAnnotation className="bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthReviews}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>

        <div className="flex-wrap flex  dark:bg-slate-800 gap-1 items-center p-3 md:w-96  w-full shadow-md  rounded-md ">

            <div className='flex flex-wrap justify-between bg-gray-100  dark:bg-slate-800 w-15 items-center p-1 m-1 rounded-md border border-gray-200'>
                  <HiStar className='text-yellow-300 text-2xl'/>
                  <div className='text-lg pl-1'>5 [{Fivestar}]</div>
            </div>


            <div className='flex flex-wrap justify-between bg-gray-100  dark:bg-slate-800 w-15 items-center p-1 m-1 rounded-md border border-gray-200'>
                  <HiStar className='text-yellow-300 text-2xl'/>
                  <div className='text-lg pl-1'>4 [{Fourstar}]</div>
            </div>

            <div className='flex flex-wrap justify-between bg-gray-100  dark:bg-slate-800 w-15 items-center p-1 m-1 rounded-md border border-gray-200'>
                  <HiStar className='text-yellow-300 text-2xl'/>
                  <div className='text-lg pl-1'>3 [{Threestar}]</div>
            </div>

            <div className='flex flex-wrap justify-between bg-gray-100  dark:bg-slate-800 w-15 items-center p-1 m-1 rounded-md border border-gray-200'>
                  <HiStar className='text-yellow-300 text-2xl'/>
                  <div className='text-lg pl-1'>2 [{Twostar}]</div>
            </div>

            <div className='flex flex-wrap justify-between bg-gray-100  dark:bg-slate-800 w-15 items-center p-1 m-1 rounded-md border border-gray-200'>
                  <HiStar className='text-yellow-300 text-2xl'/>
                  <div className='text-lg pl-1'>1 [{Onestar}]</div>
            </div>

        </div>
      </div>

      <div>
        <TextInput
          type="text"
          placeholder="Search product....."
          required
          id="title"
          className="p-3 dark:bg-slate-800  placeholder-gray-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {currentUser.isAdmin && reviews.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Added</Table.HeadCell>
              <Table.HeadCell>Review Content</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Rating No</Table.HeadCell>
              <Table.HeadCell>UserName</Table.HeadCell>
              <Table.HeadCell>ProductName</Table.HeadCell>
              <Table.HeadCell>Reply</Table.HeadCell>
            </Table.Head>
            {reviews.filter((review) => {
                const searching = search.trim().toString();
                if (searching === "") {
                  return true;
                }
                else {
                  const productIdMatch = review.title
                    .toLocaleLowerCase()
                    .includes(searching);
                  const usernameMatch = review.username
                    .toLocaleLowerCase()
                    .includes(searching);
                  const ratingMatch = review.rating
                    .toString()
                    .includes(searching);
                  /*const dateMatch = new Date(review.updatedAt).toLocaleDateString()
                    .toString()
                    .includes(searching);*/
                  return productIdMatch || usernameMatch || ratingMatch ;
                }
              })
              .map((review) => (
                <Table.Body className="divide-y" key={review._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(review.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{review.content}</Table.Cell>
                    <Table.Cell>
                      <img
                        src={review.reviewimage}
                        alt=""
                        className="w-20 h-10  object-fill bg-gray-500 "
                      />
                    </Table.Cell>
                    <Table.Cell>{review.rating}</Table.Cell>
                    <Table.Cell>{review.username}</Table.Cell>
                    <Table.Cell>{review.title}</Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-blue-500 hover:underline cursor-pointer"
                        to={`/reply-review/${review._id}`}
                      >
                        <span>Reply</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </>
      ) : (
        <p>You have no reviews yet!</p>
      )}
    </div>
  );
}
