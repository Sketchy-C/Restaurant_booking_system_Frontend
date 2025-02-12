import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import ProfileHome from './ProfileHome';
import { getUserProfiles } from '../api';
import { toast } from 'react-toastify';

function Users() {
    
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const imgUrl = 'https://res.cloudinary.com/dm1dnfpng'

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfiles();
                setUsers(response);
                setLoading(false);
            } catch (error) {
                const errorMessage = error?.response?.data || error?.message || "Unknown error";
                toast.error("Failed to fetch hotels: " + errorMessage);
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [navigate])

    if (loading) {
        return <div className=''>
            <Navbar />
            <div className='flex'>
                <div className='mt-[64px]'>
                    <ProfileHome />
                </div>
                <div className="flex items-center">
                    <span className="text-3xl mr-4">Loading</span>
                    <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>

            </div>
        </div>;
    }

    if (!users) {
        return <div>No user data available</div>;
    }
    return (<div className=''>
        <Navbar />
        <div className='flex'>
            <div className='mt-[64px]'>
                <ProfileHome />
            </div>
            <div className=''>
                <div className="relative flex max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16 text-orange-500 p-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                    </svg>
                    <h1>Users List:</h1>
                </div>
                <div>
                    {users.map((user) => {
                        // console.log('Hotel Cover:', `${imgUrl}/${hotel.hotel_cover}`);

                        return (
                            <div key={user.id} className=" shadow-xl flex items-center justify-start space-x-4 bg-white p-1 m-2 rounded-2xl border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 hover:text-slate-600">
                                <img
                                    src={`${imgUrl}/${user.image}`}
                                    alt={`${user.user.username} cover`}
                                    className='h-[80px] w-[80px] rounded-full object-cover'
                                />
                                <h2 className='p-3 w-[100px] trancate md:w-[150px] text-l md:text-xl font-bold '>{user.user.username || "Unnamed Hotel"}</h2>
                                <p className='p-3 w-[100px] trancate md:w-[150px]'>Role: {user.user.role}</p>
                                <p className='p-3 w-[100px] trancate md:w-[150px]'>Verified: {user.verified ? '✓' : '▭'}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    </div>
    )
}

export default Users