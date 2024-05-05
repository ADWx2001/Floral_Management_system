import { Link } from "react-router-dom";

export default function EventReqSuccess() {
  return (
    <div>

        <div className="">
      <div className="text-center pt-28">
        <h1 className="text-4xl font-semibold font-cinzel">Your request recieved to us</h1>
        <h2 className="text-xl">We will reach you soon!</h2>
        <img src="/sample/balloons.gif" alt="package" className="w-64 mx-auto mt-10 "/>
      </div>
      
      <div className="flex flex-wrap justify-center gap-20 pb-56 pt-5">
      <Link to="/">
        <button className="rounded-full py-4 px-6 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
          <span className="px-2 font-semibold text-lg leading-8 text-indigo-600 font-cinzel">
            Go back to Home
          </span>
         
        </button>
      </Link>

      <Link to="/event-home">
        <button className="rounded-full py-4 px-6 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
          <span className="px-2 font-semibold text-lg leading-8 text-indigo-600 font-cinzel">
            Events
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
              stroke="#4F46E5"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Link>
      </div>
    </div>

    </div>
  )
}
