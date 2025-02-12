import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getHotelProfiles } from '../api';
import { toast } from 'react-toastify';

function Dashboard() {

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
            <div className="flex items-center">
                <span className="text-3xl mr-4">Loading</span>
                <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </div>;
    }

    return (
        <div className='p-1 w-full '>
            <div className='flex  p-5'>
                <h1 className='text-orange-600'>Nomad's Table </h1>
            </div>
            <div className=''>
                <p className='text-s italic pl-3'>welcome, book a seat, with friends and family, were happy to give good service !</p>
                <div className='bg-white flex flex-col items-center justify-center w-full'>
                    <h1 className='text-orange-700 bg-[] justify-center' >We are Happy to serve !</h1>
                </div>
            </div>
            <div className='flex slide relative '>
                <img src="https://i.pinimg.com/736x/ee/43/df/ee43df70de3c21de25ff6d7c11577f17.jpg" alt="" />
                <img src="https://i.pinimg.com/736x/11/c2/24/11c224ba86a23574b419ae87a370edad.jpg" alt="" />
                <img src="https://i.pinimg.com/736x/84/9d/2f/849d2fd53ea56b9c11f27bdf12faed4e.jpg" alt="" />
                <img src="https://i.pinimg.com/736x/0a/f0/ab/0af0abacf574daab058e9fe023ce09e6.jpg" alt="" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#e4e4e4] to-transparent p-4 text-center z-10">

                <div className='w-full flex flex-col items-center'>
                    <h1 className='text-orange-700 bg-white p-0 mt-0 mb-16 w-[500px] justify-center pl-2 pr-2 rounded-4xl' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>Get started today, or Login </h1>
                    <div className='flex pb-8'>
                        <button onClick={() => navigate('/register')} className="m-5 w-[200px]">Get started </button>
                        <button onClick={() => navigate('/login')} className="m-5 w-[200px]" >Login </button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {hotels.map((hotel) => {
                        return (
                            <div key={hotel.user} className='m-5 '>
                                <Link to={`/login`}>
                                    <div className="max-w-sm text-black border rounded-lg shadow-sm  bg-white m-2 rounded-3xl overflow-hidden border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 hover:text-slate-600 ">
                                        <a href="#">
                                            <img className="w-100 h-70 object-cover"
                                                src={`${imgUrl}/${hotel.hotel_cover}`}
                                                alt={`${hotel.full_hotel_name} cover`} />
                                        </a>
                                        <div className="p-5">
                                            <a href="#">
                                                <h2 className='p-3 w-[100px] trancate md:w-[200px] text-l md:text-xl font-bold text-black hover:text-orange-500 '>{hotel.full_hotel_name || "Unnamed Hotel"}</h2>
                                            </a>
                                            <div className='flex'>
                                                <p className='p-3 w-[100px] trancate md:w-[200px]'>Type: {hotel.type}</p>
                                                <p className='p-3 w-[100px] trancate md:w-[200px]'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                    <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                                                </svg>
                                                    {hotel.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Dashboard