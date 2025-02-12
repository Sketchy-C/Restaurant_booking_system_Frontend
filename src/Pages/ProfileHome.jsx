import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../api'; 

function ProfileHome() {
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
    return <div className='hidden md:block'>
    <div className="w-[300px] mx-5 my-5 bg-white rounded-lg shadow-md p-5">
      <img className="w-16 h-16 rounded-full mx-auto" src={"https://picsum.photos/200"} alt="Loading..." />
      <h2 className="text-center text-l font-semibold mt-3 text-slate-900">Name: Loading...</h2>
      <div className="justify-center mt-8">
        <p className="text-slate-900 font-semibold mx-2 mt-4 bg-orange-100 p-1 px-4">Email: Loading...</p>
        <p className="text-slate-900 font-semibold mx-2 mt-4 bg-orange-100 p-1 px-4">Role: Loading...</p>
      </div>
    </div>
    </div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="w-[300px] mx-5 my-5 bg-white rounded-lg shadow-md p-5 hidden md:block">
      <img className="w-16 h-16 rounded-full mx-auto object-cover " src={`${imgUrl}${user.image}`} alt="Profile picture" />
      <h2 className="text-center text-l font-semibold mt-3 text-slate-900">Name: {user.user.username || "Unk"}</h2>
      <div className="justify-center mt-8">
        <p className="text-slate-900 font-semibold mx-2 mt-4 bg-orange-100 p-1 px-4">Email: {user.user.email || "mymail@mail.com"}</p>
        <p className="text-slate-900 font-semibold mx-2 mt-4 bg-orange-100 p-1 px-4">Role: {user.user.role || "Normal Based User"}</p>
      </div>
    </div>
  );
}

export default ProfileHome;
