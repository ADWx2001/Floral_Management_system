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
          style={{ height: "500px" }}
        >
          <Carousel className="w-full">
            <img src="/img/1.png" alt="..."   />
            <img src="/img/2.png" alt="..." />
            <img src="/img/3.png" alt="..." />
            <img src="/img/4.png" alt="..." />
            <img src="/img/5.png" alt="..." />
          </Carousel>
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
            <h1 className="text-3xl font-semibold font-cinzel mx-32 pt-10 uppercase text-pink-700">
              Our Popular Events
            </h1>

            <div className="flex flex-wrap justify-center gap-10 mx-20 p-5">
              
              {events.map((singleItem) => (
          <div className="flex justify-center py-8" key={singleItem._id}>
            <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
              <img className="w-full h-56 object-cover" src={singleItem.Picture} alt="" />
              <div className="px-5 pt-2 text-start">
                <h5 className="font-bold text-xl mb-2 text-black">{singleItem.Eventname}</h5>
                <span className="text-base text-green-600">{singleItem.category} day</span>
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
      </div>
    </>
  );
}

//done
