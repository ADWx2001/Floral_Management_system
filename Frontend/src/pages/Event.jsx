import { Link} from "react-router-dom";
import EventSlider from "../components/EventSlider";
import { useEffect, useState } from "react";
export default function Event() {

  const [events,setEvents] = useState ([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
          const res = await fetch('/api/events/get');
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
      <div id="default-carousel" className="relative w-full dark:bg-gray-800">
        <div className="relative h-64 overflow-hidden rounded-lg md:h-96 ">
          <div className="ease-in-out " data-carousel-item>
            <EventSlider />
          </div>
        </div>
      </div>

      <div className="text-center pt-8 dark:bg-gray-800">
        <h1 className="text-4xl text-black-600 font-bold dark:bg-gray-800 font-cinzel">
          Let Your Events Bloom with Floral Elegance!
        </h1>
        <br />
        <div className="">
          <p className="text-md font-cinzel font-semibold ">
            Transform your special occasions into unforgettable moments with our
            expert event management services at Soduruma mal. <br /> From
            intimate gatherings to grand celebrations, our team will curate
            breathtaking floral arrangements <br />
            and decor tailored to your unique vision, ensuring every detail is
            blooming with beauty and sophistication. Let us bring your dreams to
            life, one petal at a time
          </p>
        </div>
      </div>

      <div className="flex justify-between dark:bg-gray-800">
        <div className="w-2/10 ">
          <div>
            <h1 className="text-3xl text-black font-semibold font-cinzel mx-32 pt-10 uppercase text-purple-700">Our Popular Events</h1>

            <div className="flex flex-wrap justify-center gap-10 mx-20 p-5">

            {events.map((event) => (
                <div key={event.slug} className="max-w-sm rounded overflow-hidden shadow-lg w-72 h-96 m-4 font-cinzel">
                  <img className="w-full h-56 object-cover" src={event.Picture} alt={event.title} />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{event.Eventname}</div>
                    <div className="flex justify-between gap-4 pt-4">
                      <Link to={`/event/${event.slug}`} className="p-2 bg-gray-300 hover:bg-gray-400 rounded-lg">More</Link>

                      <Link to={`/event-book/${event.slug}`}>
                        <button className="p-2 bg-blue-800 hover:bg-blue-900 rounded-lg text-white">Book Now</button>
                      </Link>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

          <div>
            {/* <div className="flex h-screen w-full flex-col items-center justify-center gap-y-2 dark:bg-gray-800">
              <div className="w-[600px] rounded-xl border border-gray-200 bg-white py-4 px-2 shadow-md shadow-gray-100 dark:bg-gray-800">
                <div className="flex items-center justify-between px-2 text-base font-medium text-gray-400">
                  <div>Event models</div>
                </div>
                <div className="mt-4">
                  <div className="flex max-h-[350px] w-full flex-col overflow-y-scroll">
                    <button className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-pink-100">
                      <div className="flex h-11 w-11 items-center rounded-lg bg-gray-200 text-black group-hover:bg-pink-200">
                        <span className="tag w-full text-center text-lg font-medium text-gray-700 group-hover:text-green-900">
                          1
                        </span>
                      </div>
                      <div className="flex flex-col items-start justify-between font-light text-gray-500">
                        <p className="text-[18px]">Weddings</p>
                      </div>
                    </button>
                    <button className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-green-100">
                      <div className="flex h-11 w-11 items-center rounded-lg bg-gray-200 text-black group-hover:bg-green-200">
                        <span className="tag w-full text-center text-lg font-medium text-gray-700 group-hover:text-green-900">
                          2
                        </span>
                      </div>
                      <div className="flex flex-col items-start justify-between font-light text-gray-500">
                        <p className="text-[18px]">Birthday parties</p>
                      </div>
                    </button>
                    <button className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-pink-100">
                      <div className="flex h-11 w-11 items-center rounded-lg bg-gray-200 text-black group-hover:bg-pink-200">
                        <span className="tag w-full text-center text-lg font-medium text-gray-700 group-hover:text-green-900">
                          3
                        </span>
                      </div>
                      <div className="flex flex-col items-start justify-between font-light text-gray-500">
                        <p className="text-[18px]">Baby shower</p>
                      </div>
                    </button>
                    <button className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-green-100">
                      <div className="flex h-11 w-11 items-center rounded-lg bg-gray-200 text-black group-hover:bg-green-200">
                        <span className="tag w-full text-center text-lg font-medium text-gray-700 group-hover:text-green-900">
                          4
                        </span>
                      </div>
                      <div className="flex flex-col items-start justify-between font-light text-gray-500">
                        <p className="text-[18px]">Religious events</p>
                      </div>
                    </button>
                    <button className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-pink-100">
                      <div className="flex h-11 w-11 items-center rounded-lg bg-gray-200 text-black group-hover:bg-pink-200">
                        <span className="tag w-full text-center text-lg font-medium text-gray-700 group-hover:text-green-900 text-gray-500">
                          5
                        </span>
                      </div>
                      <div className="flex flex-col items-start justify-between font-light text-gray-500">
                        <p className="text-[18px]">Corporate events </p>
                      </div>
                    </button>

                    <h3 className="my-2 px-4 text-[15px] text-gray-400">
                      More
                    </h3>

                    <button className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-green-100">
                      <div className="flex h-11 w-11 items-center rounded-lg bg-gray-200 text-black group-hover:bg-green-200">
                        <span className="tag w-full text-center text-lg font-medium text-gray-700 group-hover:text-green-900 text-gray-500">
                          6
                        </span>
                      </div>
                      <div className="flex flex-col items-start justify-between font-light text-gray-500">
                        <p className="text-[18px] text-gray-500">
                          Anniversary parties
                        </p>
                      </div>
                    </button>
                    <button className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-pink-100">
                      <div className="flex h-11 w-11 items-center rounded-lg bg-gray-200 text-black group-hover:bg-pink-200">
                        <span className="tag w-full text-center text-lg font-medium text-gray-700 group-hover:text-green-900 text-gray-500">
                          7
                        </span>
                      </div>
                      <div className="flex flex-col items-start justify-between font-light text-gray-500">
                        <p className="text-[18px] ">Bridal shower</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* <div className="w-8/10">
          <section className="h-20 w-700 bg-gradient-to-br bg-white p-8 dark:bg-gray-800">
            <div className="grid justify-center md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-7 my-10">
              <img
                className="h-56 lg:h-60 w-500 object-cover rounded-xl"
                src="/gallery/7.jpg"
                alt=""
              />
              <img
                className="h-56 lg:h-60 w-500 object-cover rounded-xl"
                src="/gallery/2.jpg"
                alt=""
              />
              <img
                className="h-56 lg:h-60 w-500 object-cover rounded-xl"
                src="/gallery/3.jpg"
                alt=""
              />
              <img
                className="h-56 lg:h-60 w-500 object-cover rounded-xl"
                src="/gallery/4.jpg"
                alt=""
              />
            </div>
          </section>
        </div> */}
      </div>

      <div>
        {/* <div className="flex justify-between ">
          <div className="w-3/4 ">
            <div className="flex items-center justify-center p-12 ">
              <div className="mx-auto w-full max-w-[550px] font-cinzel">
                <form action="https://formbold.com/s/FORM_ID" method="POST">
                  <div className="mb-5">
                    <h3 className="text-2xl text-gray-500 font-semibold p-1">
                      Contact us
                    </h3>

                    <label
                      htmlFor="name"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-gray-500"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-base font-medium text-[#07074D] text-gray-500"
                    >
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@domain.com"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-gray-500"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="message"
                      className="mb-3 block text-base font-medium text-[#07074D] text-gray-500"
                    >
                      Description
                    </label>
                    <textarea
                      rows="4"
                      name="message"
                      id="message"
                      placeholder="Small description about your event"
                      className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-gray-500"
                    ></textarea>
                  </div>
                  <div>
                    <button className="bg-green-400 hover:bg-green-700 py-3 px-8 text-base font-semibold text-white outline-none">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-1/4">
            <div className="grid justify-center md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-7 my-10">
              <img
                className="h-80 lg:h-200 w-full object-cover rounded-lg"
                src="/gallery/6.jpg"
                alt=""
              />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

//done
