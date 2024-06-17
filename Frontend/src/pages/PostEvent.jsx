import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import Dashreviews from "../components/Dashreviews";

export default function PostEvent() {
  const { eventSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [event, setEvent] = useState(null);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div>
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        {error ? (
          <div>Error occurred while fetching data.</div>
        ) : (
          <>
            {event && (
              <>
                <h1 className="text-3xl mt-10 p-3 text-start justify-start items-start font-serif max-w-2xl lg:text-4xl">
                  {event.Eventname}
                </h1><hr />
                <div className="lg:flex lg:flex-row">
                  <div className="lg:w-1/2">
                    <div className="lg:flex lg:flex-row float-left">
                      <img
                        src={event.Picture}
                        alt={event.Eventname || "Event"}
                        className="mt-10 p-3 max-h-[600px] w-[500px] object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:w-1/2 p-16">
                    <div className="lg:flex lg:flex-row float-left pb-5">
                      <div className="flex flex-col">
                        <h1 className="underline text-3xl font-serif">{event.Eventname}</h1>
                        <h1 className="p-1 font-serif text-lg">
                          <span className="font-semibold font-serif text-xl">
                            Category :
                          </span>{" "}
                          {event.category || "N/A"}
                        </h1>
                        <h1 className="p-1 ">
                          <span className="font-bold text-lg font-serif">
                            Description :
                          </span>{" "}
                          {event.descreption || "N/A"}
                        </h1>
                      </div>
                    </div>
                    <Link to={`/event-book/${event.slug}`}>
                      <button className="block w-full text-center py-2 mt-2 bg-white border border-rose-400 text-rose-400 hover:bg-rose-400 rounded hover:border-rose-300 hover:text-white hover:font-semibold">
                        Book now
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
