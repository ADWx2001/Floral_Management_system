import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiArrowNarrowUp, HiOutlineExclamationCircle, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [lastMonthCustomers, setLastMonthCustomers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [lastMonthAdmin, setLastMonthAdmin] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?searchTerm=${searchTerm}`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalCustomers(data.totalCustomers);
          setLastMonthCustomers(data.lastMonthCustomers);
          setTotalAdmins(data.totalAdmins);
          setLastMonthAdmin(data.lastMonthAdmin);
          setLastMonthUsers(data.lastMonthUsers);
          setTotalUsers(data.totalUsers);

          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id, searchTerm]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    
  };
  

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowMore(true);
  };

  const generatePDFReport = () => {
    const content = `
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
      <h1><b>User Details Report</b></h1>
      <p>Total Customers: ${totalCustomers}</p>
      <p>Last Month Customers : ${lastMonthCustomers}</p>
      <p>Total Admins : ${totalAdmins}</p>
      <p>Last Month Admins : ${lastMonthAdmin}</p>
      <p>Total User (Admin + Customers) : ${totalUsers}</p>
      <p>Last Month User (Admin + Customers) : ${lastMonthUsers}</p>
      <br>
      <br>
      <table>
        <thead>
          <tr>
            <th>Created At</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
            <th></th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          ${users.map((user) => `
            <tr>
              <td>${new Date(user.createdAt).toLocaleDateString()}</td>
              <td>${user.username}</td>
              <td>${user.email}</td>
              <td>${user.mobile}</td>
              <td>${user.adress}</td>
              <td>${user.isAdmin ? 'Yes' : 'No'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    html2pdf().from(content).set({ margin: 1, filename: 'user_report.pdf' }).save();
  };
  
  const handleGenerateReport = () => {
    generatePDFReport();
  
  };

  return (
    <div className='p-3 md:mx-auto'>
      <div className="mb-4 flex items-center justify-between">
      <input
          type="text"
          placeholder="Search Users..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-3 py-2 w-150 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mr-2 h-10 dark:bg-slate-800  placeholder-gray-500"
       />

        <Button
          gradientDuoTone='purpleToBlue'
          outline
          onClick={handleGenerateReport}
          className=""
        >
          Generate Report
        </Button>
      </div>

      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
              <p className='text-2xl'>{totalCustomers}</p>
            </div>
            <HiOutlineUserGroup className='bg-red-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthCustomers}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>
                Total Admins
              </h3>
              <p className='text-2xl'>{totalAdmins}</p>
            </div>
            <HiUser className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthAdmin}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Users (Admin+Customers)</h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
      </div>

      <div className='table-auto overflow-x-scroll mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && users.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Date created</Table.HeadCell>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Remove</Table.HeadCell>
              </Table.Head>
              {users.map((user) => (
                <Table.Body className='divide-y' key={user._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FaCheck className='text-green-500' />
                      ) : (
                        <FaTimes className='text-red-500' />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }}
                        className='font-medium text-red-500 hover:underline cursor-pointer'
                      >
                        Remove
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            {showMore && (
              <button
                onClick={handleShowMore}
                className='w-full text-teal-500 self-center text-sm py-7'
              >
                Show more
              </button>
            )}
          </>
        ) : (
          <p>You have no users yet!</p>
        )}
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this user?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I am sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
