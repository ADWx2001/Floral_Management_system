import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostEvent() {
    const { eventSlug ,eventId} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            setLoading(true);
            const res = await fetch(`/api/events/getevents?slug=${eventSlug}`);

            
            if (!res.ok) {
              setError(true);
              setLoading(false);
              return;
            }
            const data = await res.json();
    
            setEvent(data.events[0]);
            setLoading(false);
            setError(false);
          
    
          } catch (error) {
            setError(true);
            setLoading(false);
          }
        };
        fetchProducts();
      }, [eventSlug]);

  return (
    <div>
      <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        {error ? (
          <div>Error occurred while fetching data.</div>
        ) : (
          <>
            {event && (
              <>
                <h1 className='text-3xl mt-10 p-3 text-center font-cinzel max-w-2xl mx-auto lg:text-4xl'>{event.Eventname}</h1>
                <div className='lg:flex lg:flex-row'>
                  <div className='lg:w-1/2'>
                    <div className='lg:flex lg:flex-row float-left'>
                      <img src={event.Picture} alt={event.Eventname || "Event"} className='mt-10 p-3 max-h-[600px] w-[500px] object-cover' />
                    </div>
                  </div>
                  <div className='lg:w-1/2 p-16'>
                    <div className='lg:flex lg:flex-row float-left'> 
                      <div className='flex flex-col'>
                        <h1 className='p-1 font-serif'><span className='font-bold text-lg  font-cinzel'>Price : Rs.</span> {event.Price || "N/A"}</h1>
                        <h1 className='p-1 font-serif'><span className='font-bold text-lg  font-cinzel'>Category :</span> {event.category || "N/A"}</h1>
                        <h1 className='p-1 font-serif'><span className='font-bold text-lg  font-cinzel'>Description :</span> {event.description || "N/A"}</h1>
                      </div>
                    </div>
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
