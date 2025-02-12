
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import ProfileHome from './ProfileHome';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserNotification } from '../api';

function Notifications() {
  const [notify, setNotify] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewNotify, setViewNotify] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserNotification();
        setNotify(response);
        setLoading(false);
      } catch (error) {
        const errorMessage = error?.response?.data || error?.message || 'Unknown error';
        toast.error('Failed to fetch notifications: ' + errorMessage);
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex">
          <div className="mt-[64px]">
            <ProfileHome />
          </div>
          <div className="flex items-center">
            <span className="text-3xl mr-4">Loading</span>
          </div>
        </div>
      </div>
    );
  }

  if (!notify) {
    return (
      <div>
        <Navbar />
        <div className="flex">
          <div className="mt-[64px]">
            <ProfileHome />
          </div>
          <div className="flex items-center">
            <span className="text-3xl mr-4">No notifications here</span>
          </div>
        </div>
      </div>
    );
  }

  const notifyReversed = [...notify].reverse();

  return (
    <div>
      <Navbar />
      <div className="fixed w-full z-50 top-[30px]">
        <div className="relative flex max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16 text-orange-500 p-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
          </svg>
          <h1>Notifications</h1>
        </div>
      </div>
      <div className="mt-[200px]">
        <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
          <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
            {notifyReversed.length === 0 ? (
              <div>No notifications available</div>
            ) : (
              notifyReversed.map((notification) => (
                <div
                  key={notification.id}
                  className="mr-4 grid place-items-center"
                  onClick={() => {
                    setSelectedNotification(notification);
                    setViewNotify(true);
                  }}
                >
                  <div
                    role="button"
                    className="text-slate-800 flex w-full items-center rounded-md p-3 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300"
                  >
                    <div
                      className={`font-medium ${notification.state === 'pending' ? 'text-yellow-500' :
                        notification.state === 'rejected' ? 'text-red-500' :
                          notification.state === 'approved' ? 'text-green-500' :
                            'text-gray-500'
                        }`}
                    >
                      Booking {notification.state}
                    </div>
                    <div className="p-2 px-3">@{notification.hotel_name}</div>
                    <div className="p-2 px-3">
                      Order: {notification.type}: {notification.menu_item_name}
                    </div>
                  </div>
                </div>
              ))
            )}
          </nav>
        </div>
      </div>

      {viewNotify && selectedNotification && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 flex justify-center items-center p-5"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: 99 }}
        >
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm  w-100">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
            </svg>

            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 "> Booking  {selectedNotification.state}</h5>
            </a>
            <p
              className={`font-medium  mb-3 font-normal text-slate-800 rounded-2xl w-full border-2 h-auto ${selectedNotification.state === 'pending' ? 'border-yellow-300 h-20 p-3' :
                selectedNotification.state === 'rejected' ? 'border-red-300 h-20 p-3' :
                  selectedNotification.state === 'approved' ? 'border-green-300 h-20 p-3' :
                    'text-slate-900'
                }`}
            >
            <div>
            {selectedNotification.message && selectedNotification.message.includes(',') ? (
              selectedNotification.message.split(',').map((number, index) => (
                <p key={index}>{selectedNotification.type}: {number}</p>
              ))
            ): (selectedNotification.message)}
          </div>
          <div>
          
          </div>
        
            </p>

            <p className='flex justify-between bg-gray-100'><p className='text-xl text-orange-400'>Hotel:</p> {selectedNotification.hotel_name}</p>
            <p className='flex justify-between bg-gray-10'><p className='text-xl text-orange-400'>Order: </p> {selectedNotification.type}</p>
            <p className='flex justify-between bg-gray-100'><p className='text-xl text-orange-400'>Item:</p> {selectedNotification.menu_item_name}</p>

            <p className="inline-flex font-medium items-center text-orange-600 hover:bg-orange-500 cursor-pointer p-3 m-3 rounded-2xl hover:text-white"
              onClick={() => setViewNotify(false)}
            >
              Close
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
