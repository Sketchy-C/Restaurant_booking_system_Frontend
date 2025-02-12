import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserProfile } from '../api';

function Navbar() {
  const headbutton = 'm-0 p-3 text-gray-800 no-underline hover:bg-black hover:text-white border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 w-[100px] flex justify-center items-center cursor-pointer';
  const headbuttonSmall = 'm-0 p-3 text-gray-800 no-underline hover:bg-black hover:text-white border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 w-[75px] flex justify-center items-center cursor-pointer';

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const imgUrl = 'https://res.cloudinary.com/dm1dnfpng/'

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token) {
          toast.error("You are not logged in.");
          navigate('/login');
          return;
        }

        if (!userId) {
          toast.error("No user ID found.");
          navigate('/login');
          return;
        }


        const response = await getUserProfile();

        setUser(response);
        setLoading(false);
      } catch (error) {
        const errorMessage = error?.response?.data || error?.message || "Unknown error";
        toast.error("Failed to fetch profile: " + errorMessage);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);


  if (loading) {

    <div>
      <nav className="bg-white p-0 fixed w-full z-50 top-0 shadow-lg">
        <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center hidden sm:ml-6 sm:block ">
                <img className="h-8 w-auto" src="https://i.pinimg.com/736x/20/59/f3/2059f39475166eeb190d3aa84aabc111.jpg" alt="" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link to="/home" className={`${headbutton} linked`} >Homepage</Link>
                </div>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:block absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex space-x-4">
                <Link to="/profile" className={`${headbutton} linked`} >Profile</Link>
                <Link to="/notification" className={`${headbutton} linked`} >Notify</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="sm:hidden flex" id="mobile-menu">
            <div className="flex shrink-0 items-center">
              <img className="h-8 w-auto" src="https://i.pinimg.com/736x/20/59/f3/2059f39475166eeb190d3aa84aabc111.jpg" alt="" />
            </div>
            <div className="flex space-x-4">
              {/* <Link to="/home" className={`${headbuttonSmall} linked`} >Home</Link> */}
              <div></div>
            </div>
          </div>
          <div className="sm:hidden inset-y-0 right-0 flex items-center pr-2">
            <div className="flex space-x-4">
              <Link to="/profile" className={`${headbuttonSmall} linked`} >Profile</Link>
              <Link to="/notification" className={`${headbuttonSmall} linked`} >Notify</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  }
  return (

    <div>
      <nav className="bg-white p-0 fixed w-full z-50 top-0 shadow-lg">
        <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center hidden sm:ml-6 sm:block ">
                <img className="h-8 w-auto" src="https://i.pinimg.com/736x/20/59/f3/2059f39475166eeb190d3aa84aabc111.jpg" alt="" />
              </div>
              <div className="hidden sm:ml-6 sm:block">

                {user && user.user.role === 'Hotel Owner' ? (
                  <div className="flex space-x-4">
                    <Link to="/Restprofile" className={`${headbutton} linked w-[150px]`}>My Hotel</Link>
                  </div>
                ) : (
                  (user && (user.user.role === 'moderator' || user.user.role === 'admin')) && (
                    <div className="flex space-x-4">
                      {/* <Link to="/home" className={`${headbutton} linked`}>Homepage</Link> */}
                      <Link to="/hotels" className={`${headbuttonSmall} linked`}>Hotels</Link>
                      <Link to="/users" className={`${headbuttonSmall} linked`}>Users</Link>
                    </div>
                  )
                )}
                {user && user.user.role === 'User' && (
                  <div className="flex space-x-4">
                    {/* <Link to="/home" className={`${headbutton} linked`}>Homepage</Link> */}
                    <Link to="/hotels" className={`${headbutton} linked`}>Hotels</Link>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:block absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex space-x-4">
              <Link to="/profile" className={`${headbutton} linked`} >Profile</Link>
                
              {user && user.user.role === 'Hotel Owner' ? (
                <Link to="/approvereject" className={`${headbutton} linked`} >Bookings</Link>
                ) : (
                  (user && (user.user.role === 'moderator' || user.user.role === 'admin')) && (
                    <div></div>
                  )
                )}
                {user && user.user.role === 'User' && (
                <Link to="/notification" className={`${headbutton} linked`} >Notify</Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="sm:hidden flex" id="mobile-menu">
            <div className="flex shrink-0 items-center">
              <img className="h-8 w-auto" src="https://i.pinimg.com/736x/20/59/f3/2059f39475166eeb190d3aa84aabc111.jpg" alt="" />
            </div>


           
            {user && user.user.role === 'Hotel Owner' ? (
                  <div className="flex space-x-4">
                    <Link to="/Restprofile" className={`${headbutton} linked w-[150px]`}>My Hotel</Link>
                  </div>
                ) : (
                  (user && (user.user.role === 'moderator' || user.user.role === 'admin')) && (
                    <div className="flex space-x-4">
                      {/* <Link to="/home" className={`${headbutton} linked`}>Homepage</Link> */}
                      <Link to="/hotels" className={`${headbuttonSmall} linked`}>Hotels</Link>
                      <Link to="/users" className={`${headbuttonSmall} linked`}>Users</Link>
                    </div>
                  )
                )}
                {user && user.user.role === 'User' && (
                  <div className="flex space-x-4">
                    {/* <Link to="/home" className={`${headbutton} linked`}>Homepage</Link> */}
                    <Link to="/hotels" className={`${headbutton} linked`}>Hotels</Link>
                  </div>
                )}
          </div>
          <div className="sm:hidden inset-y-0 right-0 flex items-center pr-2">
            <div className="flex space-x-4">
              <Link to="/profile" className={`${headbuttonSmall} linked`} >Profile</Link>
              <Link to="/notification" className={`${headbuttonSmall} linked`} >Notify</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>

  )
}

export default Navbar;
