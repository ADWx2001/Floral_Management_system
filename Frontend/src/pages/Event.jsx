import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
export default function Event() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/events/get");
        const data = await res.json();
        if (res.ok) {
          // Slice the data array to include only the first 5 items
          //const limitedData = data.slice(0, 9);
          console.log(data);
          setEvents(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="mx-auto">
        <div
          className="mx-auto sm:h-96 xl:h-96 2xl:h-96"
          style={{ height: "600px" }}
        >
          <Carousel className="w-full">
            <img src="/event/4.png" alt="..." style={{width:"100%"}}/>
            <img src="/event/2.jpg" alt="..." style={{width:"100%"}}/>
            <img src="/event/3.jpg" alt="..." style={{width:"100%"}}/>
            <img src="/event/4.jpg" alt="..." style={{width:"100%"}}/>
            <img src="/img/5.png" alt="..." style={{width:"100%"}}/>
          </Carousel>
        </div>
      </div>

      <div className="text-center pt-4 sm:pt-8 dark:bg-gray-800">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-black-600 font-bold dark:bg-gray-800 font-cinzel">
          Let Your Events Bloom with Floral Elegance!
        </h1>
        <br />
      </div>

      <div className="flex justify-between dark:bg-gray-800">
        <div className="w-full ">
          <div className="items-center justify-center flex flex-wrap ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-5 sm:px-10">

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-10">
                  <path d="m16,8c-2.802,0-5.271,1.448-6.701,3.634-.576-.276-1.198-.469-1.852-.565l2.699-3.599-2.224-2.471h-2.846l-2.224,2.471,2.699,3.599c-3.136.46-5.552,3.169-5.552,6.431,0,3.584,2.916,6.5,6.5,6.5,1.73,0,3.303-.679,4.469-1.785,1.375,1.115,3.126,1.785,5.031,1.785,4.411,0,8-3.589,8-8s-3.589-8-8-8Zm-10.478-2h1.955l1.376,1.529-2.354,3.138-2.354-3.138,1.376-1.529ZM1,17.5c0-3.032,2.467-5.5,5.5-5.5.822,0,1.603.182,2.304.507-.515,1.056-.804,2.242-.804,3.493,0,2.147.85,4.098,2.231,5.537-.981.908-2.292,1.463-3.731,1.463-3.033,0-5.5-2.468-5.5-5.5Zm9.903,3.292c-1.179-1.253-1.903-2.94-1.903-4.792,0-1.069.241-2.083.672-2.991,1.408.997,2.328,2.639,2.328,4.491,0,1.234-.408,2.374-1.097,3.292Zm5.097,2.208c-1.647,0-3.162-.572-4.359-1.527.852-1.099,1.359-2.478,1.359-3.973,0-2.225-1.124-4.192-2.834-5.364,1.255-1.888,3.401-3.136,5.834-3.136,3.86,0,7,3.141,7,7s-3.14,7-7,7ZM9.565,3.642l-.707-.707,2.289-2.288.707.707-2.289,2.288Zm-6.168-.038L1.146,1.354l.707-.707,2.25,2.25-.707.707Zm3.604-.604h-1V0h1v3Z"/>
                </svg>
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                    <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                        See our guideline
                        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                        </svg>
                    </a>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
                    </svg>
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                    <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                        See our guideline
                        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                        </svg>
                    </a>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-10">
                  <path d="M24,11.5a3.5,3.5,0,0,0-2.149-3.226,10,10,0,0,0-19.7,0,3.5,3.5,0,0,0,1.119,6.718,10.607,10.607,0,0,0,2.071,2.955,8.908,8.908,0,0,0-2.272,4.928,1,1,0,0,0,.868,1.117A1.093,1.093,0,0,0,4.061,24a1,1,0,0,0,.991-.875,6.924,6.924,0,0,1,1.815-3.872A8.948,8.948,0,0,0,12,21a8.94,8.94,0,0,0,5.119-1.74,6.922,6.922,0,0,1,1.808,3.862,1,1,0,0,0,.991.876,1.063,1.063,0,0,0,.125-.008,1,1,0,0,0,.868-1.116,8.9,8.9,0,0,0-2.261-4.918,10.622,10.622,0,0,0,2.082-2.966A3.5,3.5,0,0,0,24,11.5Zm-3.752,1.473a.993.993,0,0,0-1.117.651C18.215,16.222,15.13,19,12,19s-6.215-2.78-7.131-5.378a.994.994,0,0,0-1.117-.651A1.606,1.606,0,0,1,3.5,13a1.5,1.5,0,0,1-.27-2.972,1,1,0,0,0,.816-.878A7.961,7.961,0,0,1,8.13,3a4.075,4.075,0,0,0-.022,1.942,4,4,0,0,0,7.688.318A.977.977,0,0,0,14.851,4H14.7a.867.867,0,0,0-.806.631A2,2,0,1,1,12,2a7.978,7.978,0,0,1,7.954,7.15,1,1,0,0,0,.816.878A1.5,1.5,0,0,1,20.5,13,1.606,1.606,0,0,1,20.248,12.973Z"/><circle cx="9.5" cy="11.5" r="1.5"/><circle cx="14.5" cy="11.5" r="1.5"/>
                </svg>
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                    <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                        See our guideline
                        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                        </svg>
                    </a>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-10">
                  <path d="m22.996,10.997h-.042c-.208-2.284-1.116-4.368-2.508-6.036l.035-.035c.39-.391.39-1.024-.002-1.414-.389-.391-1.023-.391-1.414,0l-.034.034c-1.669-1.39-3.754-2.296-6.038-2.502v-.046c0-.552-.448-.999-1-.999h0c-.552,0-1,.449-.999,1.001v.046c-2.283.208-4.366,1.116-6.033,2.508l-.038-.038c-.392-.391-1.024-.391-1.414,0-.391.391-.39,1.024,0,1.414l.038.038c-1.389,1.668-2.295,3.751-2.501,6.034h-.05c-.552,0-1,.448-1,1s.448,1,1,1h.05c.207,2.282,1.114,4.365,2.505,6.032l-.038.038c-.391.391-.391,1.024,0,1.414.195.195.451.293.707.293s.512-.098.707-.293l.038-.038c1.667,1.391,3.751,2.298,6.034,2.504v.046c0,.552.448,1,1,1s1-.448,1-1v-.046c2.284-.207,4.369-1.114,6.036-2.505l.034.034c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.024,0-1.414l-.034-.034c1.391-1.668,2.298-3.753,2.504-6.038h.043c.552,0,.999-.448.999-1s-.448-1-1-1Zm-2.052,0l-4.044.002c-.13-.637-.382-1.231-.73-1.755l2.857-2.861c1.037,1.295,1.724,2.881,1.917,4.615Zm-3.333-6.029l-2.856,2.861c-.525-.348-1.118-.599-1.756-.729l-.004-4.045c1.734.192,3.321.878,4.616,1.914Zm-6.616-1.912l.004,4.044c-.637.13-1.231.382-1.755.73l-2.861-2.856c1.294-1.037,2.88-1.724,4.613-1.918Zm-6.026,3.333l2.861,2.856c-.348.525-.599,1.118-.729,1.755l-4.045.002c.192-1.733.878-3.319,1.913-4.613Zm-1.912,6.613l4.044-.002c.13.637.382,1.231.729,1.755l-2.858,2.859c-1.036-1.294-1.723-2.88-1.915-4.612Zm7.943,7.942c-1.733-.193-3.319-.879-4.614-1.915l2.858-2.859c.525.348,1.118.6,1.756.73v4.045Zm1-5.944c-1.654,0-3-1.346-3-3s1.346-3,3-3,3,1.346,3,3-1.346,3-3,3Zm1,5.944v-4.045c.638-.13,1.231-.382,1.756-.73l2.859,2.858c-1.295,1.037-2.882,1.724-4.615,1.916Zm6.029-3.33l-2.859-2.858c.348-.525.6-1.118.73-1.756l4.045-.002c-.192,1.734-.879,3.321-1.915,4.616Z"/>
                </svg>
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                    <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                        See our guideline
                        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                        </svg>
                    </a>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-10">
                  <path d="m12.118,20.032l-8.998,3.788c-.284.119-.581.178-.875.178-.582,0-1.153-.229-1.584-.659-.648-.648-.837-1.613-.481-2.458l3.788-8.999,8.15,8.15Zm4.09-5.76l-6.479-6.479c-.637-.638-1.547-.914-2.43-.741-.884.174-1.621.772-1.971,1.604l-.521,1.238,9.302,9.302,1.238-.521c.831-.35,1.43-1.087,1.603-1.971.173-.885-.104-1.794-.741-2.431Zm-.412-6.667c.73-.962,1.134-1.984,1.202-3.041.172-2.697-1.795-4.282-1.878-4.349-.43-.338-1.051-.267-1.396.162-.344.428-.275,1.056.15,1.403.05.041,1.232,1.025,1.128,2.656-.042.657-.311,1.316-.798,1.959-.334.44-.248,1.067.192,1.401.181.137.393.203.604.203.302,0,.601-.137.797-.396Zm7.78,6.213c.452-.318.56-.942.241-1.394-.373-.529-1.386-1.424-2.817-1.424-.776,0-1.505.24-2.108.695-.441.332-.528.96-.196,1.4.333.44.959.529,1.401.195.256-.193.56-.291.903-.291.729,0,1.16.548,1.19.587.195.27.5.413.811.413.199,0,.4-.06.575-.183Zm-2.576-12.317c0,.828.672,1.5,1.5,1.5s1.5-.672,1.5-1.5-.672-1.5-1.5-1.5-1.5.672-1.5,1.5Zm-2,5c0,.828.672,1.5,1.5,1.5s1.5-.672,1.5-1.5-.672-1.5-1.5-1.5-1.5.672-1.5,1.5ZM8,2.5c0,.828.672,1.5,1.5,1.5s1.5-.672,1.5-1.5-.672-1.5-1.5-1.5-1.5.672-1.5,1.5Zm12,16c0,.828.672,1.5,1.5,1.5s1.5-.672,1.5-1.5-.672-1.5-1.5-1.5-1.5.672-1.5,1.5ZM1,3.5c0,.828.672,1.5,1.5,1.5s1.5-.672,1.5-1.5-.672-1.5-1.5-1.5-1.5.672-1.5,1.5Zm14,19c0,.828.672,1.5,1.5,1.5s1.5-.672,1.5-1.5-.672-1.5-1.5-1.5-1.5.672-1.5,1.5Z"/>
                </svg>
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                    <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                        See our guideline
                        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                        </svg>
                    </a>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-10">
                  <path d="m10.288,11.067c1.755-.338,3.542.879,3.7,2.659.158,1.78-1.24,3.274-2.988,3.274h-4c-.681,0-1.163-.656-.961-1.307.499-1.608,1.936-4.181,4.249-4.626Zm9.712.933c-.552,0-1,.447-1,1v6c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3v-11c0-1.654,1.346-3,3-3h7c.552,0,1-.447,1-1s-.448-1-1-1h-7C2.243,3,0,5.243,0,8v11c0,2.757,2.243,5,5,5h11c2.757,0,5-2.243,5-5v-6c0-.553-.448-1-1-1ZM23.139.863c-1.149-1.15-3.012-1.151-4.162-.002-.039.039-6.728,7.28-6.728,7.28-.452.506-.263,1.29.357,1.565.007.003.014.006.021.009.386.173.838.068,1.119-.248l6.611-7.157c.348-.389.946-.422,1.334-.074.013.012.025.023.038.036.369.368.369.965.001,1.334,0,0,0,0-.001.001l-6.879,6.686c-.331.331-.378.844-.123,1.237.004.006.008.012.011.017.339.529,1.078.606,1.522.162l6.878-6.685c1.148-1.15,1.148-3.013,0-4.163Z"/>
                </svg>
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                    <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                        See our guideline
                        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                        </svg>
                    </a>
                </div>

            </div>
          </div>

          <div>
            <h1 className="text-3xl font-semibold font-cinzel mx-32 pt-10 uppercase text-pink-700">
              Our Popular Events
            </h1>

            <div className="flex flex-wrap justify-center gap-10 mx-20 p-5">
              {events.map((singleItem) => (
                <div className="flex justify-center py-8" key={singleItem._id}>
                  <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                      className="w-full h-56 object-cover"
                      src={singleItem.Picture}
                      alt=""
                    />
                    <div className="px-5 pt-2 text-start">
                      <h5 className="font-bold text-xl mb-2 text-black">
                        {singleItem.Eventname}
                      </h5>
                      <span className="text-base text-green-600">
                        {singleItem.category} day
                      </span>
                    </div>
                    <div className="px-4 pb-4">
                      <Link to={`/event/${singleItem.slug}`}>
                        <button className="block w-full text-center py-2 mt-2 bg-white border border-green-400 text-green-700 hover:bg-green-50 rounded">
                          More details
                        </button>
                      </Link>

                      <Link to={`/event-book/${singleItem.slug}`}>
                        <button className="block w-full text-center py-2 mt-2 bg-white border border-rose-400 text-rose-400 hover:bg-rose-400 rounded hover:border-rose-300 hover:text-white hover:font-semibold">
                          Book
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
}

//done
