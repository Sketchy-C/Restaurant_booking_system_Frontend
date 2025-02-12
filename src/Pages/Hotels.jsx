import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getHotelProfiles } from '../api';
import Navbar from '../Components/Navbar';
import ProfileHome from './ProfileHome';

function Hotels() {
    const [hotels, setHotels] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const imgUrl = 'https://res.cloudinary.com/dm1dnfpng'

    useEffect(() => {
        const fetchHotelProfile = async () => {
            try {
                const response = await getHotelProfiles();
                setHotels(response);
                setLoading(false);

            } catch (error) {
                const errorMessage = error?.response?.data || error?.message || "Unknown error";
                toast.error("Failed to fetch hotels: " + errorMessage);
                setLoading(false);
            }

        };

        fetchHotelProfile();
    }, [navigate]);

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

    if (!hotels) {
        return <div>No user data available</div>;
    }

    return (
        <div className=''>
            <Navbar />
            <div className='flex'>
                <div className='mt-[64px]'>
                    <ProfileHome />
                </div>
                <div >

                    <div className="relative flex max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16 text-orange-500 p-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
                            <path fill-rule="evenodd" d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z" clip-rule="evenodd" />
                        </svg>
                        <h1>Hotels available:</h1>
                    </div>
                    <div>
                        {hotels.map((hotel) => {
                            return (
                                <div key={hotel.user} >
                                    <Link to={`/OtherRestprofile/${hotel.user}`}>

                                    <div className="text-black shadow-xl flex items-center justify-start space-x-4 bg-white p-2 m-2 rounded-2xl border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 hover:text-slate-600 ">
                                    <img
                                        src={`${imgUrl}/${hotel.hotel_cover}`}
                                        alt={`${hotel.full_hotel_name} cover`}
                                        className='h-[100px] w-[100px] rounded-full object-cover'
                                    />
                                    <h2 className='p-3 w-[100px] trancate md:w-[200px] text-l md:text-xl font-bold '>{hotel.full_hotel_name || "Unnamed Hotel"}</h2>
                                    <p className='p-3 w-[100px] trancate md:w-[200px]'>Type: {hotel.type}</p>
                                    <p className='p-3 w-[100px] trancate md:w-[200px]'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                                    </svg>
                                        {hotel.location}</p>
                                </div>
                                </Link>

                                    </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hotels;
