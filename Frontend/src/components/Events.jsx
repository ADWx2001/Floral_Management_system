import { Button, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Events() {
  const { currentUser } = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState('');
  //Search function
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events/get');
        const data = await res.json();
        if (res.ok) {
          setEvents(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchEvents();
    }
  }, [currentUser.isAdmin]);

  const handleDelete = async () => {
    setShowModel(false);
    try {
      const res = await fetch(
        `/api/events/delete/${eventIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        console.log(data.message);
        window.location.href = '/dashboard?tab=events';
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-500'>
      <div className="">
        <Button
            gradientDuoTone='purpleToBlue'
            outline
            onClick
            className=""
          >
            Generate Report
        </Button>
      </div>

      <div className="flex ">
      <TextInput
          type='text'
          placeholder='Search a event (by event name)'
          required
          id='title'
          className='flex-1'
          style={{ width: 700, marginTop: 30, marginBottom: 30, marginLeft: 250 }}
          onChange={(e) => setSearchName(e.target.value)}
        />

    </div>

      <Table hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
        </Table.Head>

         {events.filter((event) => {
          const searchQuery = searchName.toLowerCase();
          const eventName = event.Eventname.toLowerCase().includes(searchQuery);
        
        // Return true if any of the search criteria match
        return eventName;
        }).map((event) => (

          <Table.Body key={event._id}>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Link className='font-medium text-gray-900 dark:text-white' to={`/event/${event.slug}`}>
                {event.Eventname}
              </Link>
              <Table.Cell>
                <img
                  src={event.Picture}
                  alt={event.Eventname}
                  className="w-20 h-10 object-cover bg-gray-500"
                />
              </Table.Cell>
              <Table.Cell>{event.category}</Table.Cell>
              <Table.Cell>{event.descreption}</Table.Cell>
              <Table.Cell>
                <span className='font-medium text-red-500 hover:underline cursor-pointer'
                  onClick={() => {
                    setShowModel(true);
                    setEventIdToDelete(event._id);
                  }}
                >
                  Delete
                </span>
              </Table.Cell>
              <Table.Cell>
                <Link className='text-teal-500 hover:underline' to={`/Update-event/${event._id}`}>
                  Edit
                </Link>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
      
      <Modal show={showModel} onClose={() => setShowModel(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to remove this Event</h3>
          </div>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={handleDelete}>
              Yes, I am sure
            </Button>
            <Button color='gray' onClick={() => setShowModel(false)}>
              No, cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
