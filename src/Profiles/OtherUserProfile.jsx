import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../api';

function OtherUserProfile() {
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
    return <div >
      <div>
        <Navbar />
      </div>
      <div className="flex items-center mt-[200px] w-full ">
        <div className='m-auto'>
        <span className="text-3xl mr-4">Loading</span>
        <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        </div>
      </div>
    </div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='mt-[150px]'>
        <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full flex justify-center">
                <div className="relative ">
                  <img src={`${imgUrl}${user.image}`} className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px] max-h-[150px] " />
                </div>
              </div>
              <div className="w-full text-center mt-20">
                <div className="flex justify-center lg:pt-4 pt-8 pb-0 border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300">
                  <div className="p-3 text-center">
                    <span className="text-sm text-slate-400">userName</span>
                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700"> {user.user.username || "Unk"}</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="text-sm text-slate-400">Role</span>
                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700"> {user.user.role || "Unk"}</span>
                  </div>

                  <div className="p-3 text-center">
                    <span className="text-sm text-slate-400">Verified</span>
                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">  {user.verified ? '✓' : '▭'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-2 border-b-2 border-gray-200 hover:border-orange-400 transition-colors duration-300">
              <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">Full name: {user.full_name || "Unk"}</h3>
            </div>
            <div className="mt-6 py-6 text-center ">
              <div className="flex flex-wrap justify-center border-b-1 border-gray-200 hover:border-orange-400 transition-colors duration-300">
                <div className="w-full px-4">
                  <p className="font-light leading-relaxed text-orange-700 mb-4">Bio: {user.bio || "No bio"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="relative pt-6 pb-2 mt-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-slate-500 font-semibold py-1">
                  Nomad's table user profile
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>

    </div>
  )
}

export default OtherUserProfile
