import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function BookEvent() {
  const { eventSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [event, setEvent] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/events/get/${eventSlug}`);

        if (!res.ok) {
          throw new Error("Failed to fetch event");
        }

        const data = await res.json();
        setEvent(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventSlug]);

  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    description:"",
    date: "",
    time: "",
    venue: "",
    guestCount: "",
    themeColor: "",
    arrangements:"default arrangement",
    budget: ""
});

const handleSubmit = async (e) => {
    e.preventDefault();

    try {

       const res = await fetch(`/api/events/create-request`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create order');
      }
  
      // If response is okay, clear any previous error state
      setPublishError(null);
      
      navigate('/event-request-success');
    } catch (error) {
      
      setPublishError(error.message || 'Something went wrong');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }
  return (
    <>
      
      <div>
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
          {error ? (
            <div>Error occurred while fetching data.</div>
          ) : (
            <>
              {event && (
                <>
                  <h1 className="text-md mt-10 p-3 font-cinzel  lg:text-4xl">
                    Fill your details and we'll get with you soon!!!
                  </h1>
                  <div className="lg:flex lg:flex-row">
                    <div className="lg:w-1/2">
                      <div className="lg:flex lg:flex-row float-left">
                        <img
                          src={event.Picture}
                          alt={event.Eventname || "Event"}
                          className="mt-10 p-3 max-h-[600px] w-[500px] object-cover "
                        />
                      </div>
                    </div>

                    <form className="w-full max-w-lg p-4 mt-5 rounded-xl">
                        <div>
                            <div className="mb-2 block">
                                <label htmlFor="phone" className="text-black">Your phone</label>
                            </div>
                            <input id="phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })}  type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" placeholder="Your phone number" required />
                        </div>

                        <div>
                            <div className="mb-2 block pt-3">
                                <label htmlFor="password1" className="text-black">Your name</label>
                            </div>
                            <input id="name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required placeholder="Your name" />
                        </div>

                        <div className="w-full">
                                <div className="mb-2 block pt-3">
                                    <label htmlFor="subject" className="text-black">Description</label>
                                </div>
                                <textarea id="subject" type="text" onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required placeholder="Small description about your event" />
                          </div>

                        <div className="flex flex-wrap items-center pt-3">
                            <div className="w-full md:w-1/3">
                                <div className="mb-2 block pt-3">
                                    <label htmlFor="subject" className="text-black">Date</label>
                                </div>
                                <input id="subject" type="date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
                            </div>
                            <div className="w-full md:w-1/3 px-2">
                                <div className="mb-2 block pt-3">
                                    <label htmlFor="subject" className="text-black">Time</label>
                                </div>
                                <input id="subject" type="time" onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
                            </div>
                            <div className="w-full md:w-1/3">
                                <div className="mb-2 block pt-3">
                                    <label htmlFor="subject" className="text-black">Venue</label>
                                </div>
                                <input id="subject" type="text" onChange={(e) => setFormData({ ...formData, venue: e.target.value })}  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required placeholder="Venue" />
                            </div>
                        </div>
          
                        <div className="flex flex-wrap items-center pt-3">
                            <div className="w-full md:w-1/3">
                                <div className="mb-2 block pt-3">
                                    <label htmlFor="number" className="text-black">Guest count</label>
                                </div>
                                <input id="subject" type="number" onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required placeholder="Guest count"/>
                            </div>
                            <div className="w-full md:w-1/3 px-2">
                                <div className="mb-2 block pt-3">
                                    <label htmlFor="subject" className="text-black">Theme/Color</label>
                                </div>
                                <input id="subject" type="text" onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })}  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required placeholder="Theme/Color"/>
                            </div>
                            <div className="w-full md:w-1/3">
                                <div className="mb-2 block pt-3">
                                    <label htmlFor="subject" className="text-black">Your budget</label>
                                </div>
                                <input id="subject" type="number" onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required placeholder="Your Budget" />
                            </div>
                        </div>
                            
                        
                        <button type="submit" onClick={handleSubmit} className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out">Send Request</button>                    
                    </form>
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
