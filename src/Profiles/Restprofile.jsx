import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { deleteMenuItem, deletePicItem, getHotelProfile } from '../api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function Restprofile() {

  const deleteMenuItemAndRefresh = async (menuItemId) => {
    try {
      await deleteMenuItem(menuItemId);
      toast.success('Menu item deleted successfully!');
      window.location.reload();
    } catch (error) {
      toast.error('Failed to delete menu item: ' + error?.message || 'Unknown error');
    }
  };
  
  const deletePicItemAndRefresh = async (picitemId) => {
    try {
      await deletePicItem(picitemId);
      toast.success('Picture item deleted successfully!');
      window.location.reload();
    } catch (error) {
      toast.error('Failed to delete Picture item: ' + error?.message || 'Unknown error');
    }
  };

  const headbutton = 'm-0 p-3 text-gray-800 no-underline hover:bg-black hover:text-white border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 w-[100px] flex justify-center items-center cursor-pointer';
  const headbuttonSmall = 'm-0 p-3 text-gray-800 no-underline hover:bg-black hover:text-white border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 w-[75px] flex justify-center items-center cursor-pointer';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuItem, setMenuitem] = useState(false)

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const imgUrl = 'https://res.cloudinary.com/dm1dnfpng/';
  const responsive =
    'h-[18rem] w-[26rem] object-cover xs:h-[18rem] xs:w-[26rem] sm:h-[22rem] sm:w-[34rem] md:h-[24rem] md:w-[45rem] lg:h-[30rem] lg:w-[60rem] xl:h-[30rem] xl:w-[64rem]';

  useEffect(() => {
    const fetchHotelProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const hotelId = localStorage.getItem('userId');

        if (!token) {
          toast.error('You are not logged in.');
          navigate('/login');
          return;
        }

        if (!hotelId) {
          toast.error('No user ID found.');
          navigate('/login');
          return;
        }

        const response = await getHotelProfile();

        setHotel(response);
        console.log(response.id)
        localStorage.setItem('hotID', response.id)
        setLoading(false);

      } catch (error) {
        const errorMessage = error?.response?.data || error?.message || 'Unknown error';
        toast.error('Failed to fetch profile: ' + errorMessage);
        setLoading(false);
      }
    };

    fetchHotelProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="flex items-center mt-[200px] w-full ">
          <div className="m-auto">
            <span className="text-3xl mr-4">Loading</span>
            <svg
              className="animate-spin h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return <div>No hotel data available</div>;
  }

  const images = (hotel.hotel_picture.length > 0
    ? hotel.hotel_picture.map(picture => ({
      ...picture,
      image: `${imgUrl}${picture.image}`
    }))
    : [{ 'image': 'https://i.pinimg.com/736x/94/bf/34/94bf3444f7683e20d2b78693f09e9c31.jpg' }]
  );



  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="pt-18">
        <div>
          <div className="flex space-x-4 bg-white justify-center">
            <Link to="/edit-rest" className={`${headbutton} linked w-[170px]`} >Edit Hotel</Link>
            <Link to="/addMenu" className={`${headbutton} linked w-[170px]`} >Add Menu Item</Link>
            <Link to="/Restprofile" className={`${headbutton} linked w-[170px]`} >Preview</Link>
          </div>
        </div>
        <h1 className="text-orange-500 ml-4 p-3 rounded-2xl w-full mx-auto flex justify-center">Preview Page</h1>
        <div className="w-full mx-auto flex justify-center">
          <div className={`relative flex justify-center${responsive} rounded-2xl overflow-hidden`}>
            <img
              src={`${imgUrl}${hotel.hotel_cover}`}
              alt="Hotel"
              className={`${responsive} object-cover`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(167,151,131,0.9)] to-transparent p-4 text-center z-10 flex items-center justify-start">
              <h1 className="text-white ml-4 p-3 rounded-2xl font-bold">{hotel.hotel_bio}</h1>
            </div>
            <div className="absolute bg-white px-3 rounded-2xl text-orange-500 z-10 border-b-3 border-gray-200 hover:border-orange-400 transition-colors">
              <h1>{hotel.full_hotel_name}</h1>
            </div>
            <div className="absolute bottom-0 z-10">
              <div className="shadow-xl flex items-center justify-start space-x-4 bg-white p-2 m-2 rounded-2xl border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 hover:text-slate-600">
                <p className="p-3 w-[100px] truncate md:w-[200px]">
                  <div className="flex text-orange-500 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path
                        fillRule="evenodd"
                        d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        clipRule="evenodd"
                      />
                    </svg>{' '}
                    Location
                  </div>
                  {hotel.location}
                </p>
                <h2 className="p-3 w-[100px] truncate md:w-[200px] text-l md:text-xl font-bold ">
                  <div className="text-sm text-orange-500">Type: </div> {hotel.type}
                </h2>
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative w-full max-w-5xl mx-auto p-3 m-3">
            <h3>{hotel.full_hotel_name}: Photos</h3>
            <div className="relative">
              <img
                src={images[currentIndex].image}
                alt="carousel"
                className="w-full h-64 md:h-80 lg:h-110 object-cover rounded-lg"
              />
              <div className='flex items-center'>
                <h1 className='text-green-600 p-3'>{images[currentIndex].name}</h1>
                <div className='hover:text-orange-500 p-3'
                onClick={() => deletePicItemAndRefresh(images[currentIndex].id)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                  <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                </svg>
                </div>
              </div>

            </div>
            <div
              onClick={prevSlide}
              className="absolute cursor-pointer top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl p-2 rounded-full"
            >
              &#60;

            </div>
            <div
              onClick={nextSlide}
              className="absolute cursor-pointer top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl p-2 rounded-full"
            >
              &#62;
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'
                    }`}
                ></div>
              ))}
            </div>
          </div>
          <div className='p-10'>
            <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
            <div className="flex space-x-4 justify-center">
              <p className={`${headbutton} linked w-[170px]`} onClick={() => setMenuitem(false)}>Table Menu</p>
              <p className={`${headbutton} linked w-[170px]`} onClick={() => setMenuitem(true)}>Room Service</p>
            </div>
            <div>
              {menuItem ? (<div>
                {hotel.menu_items
                  .filter(item => item.type === "Beds")
                  .map(item => (
                    <div key={item.id}
                      className="shadow-xl flex items-center justify-start space-x-4 bg-white p-1 m-2 rounded-2xl border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 hover:text-slate-600"
                    >
                      <img
                        src={`${imgUrl}/${item.image}`}
                        alt={`${item.name} image`}
                        className='h-[80px] w-[80px] rounded-full object-cover'
                      />
                      <h2 className='p-3 w-[100px] truncate md:w-[150px] text-l md:text-xl font-bold '>{item.name || "Unnamed Item"}</h2>
                      <p className='p-3 w-[100px] truncate md:w-[150px]'>Price: ${item.price}</p>
                      <p className='p-3 w-[150px] truncate md:w-[200px]'>: {item.description}</p>
                      <div className='p-3 w-[150px] truncate md:w-[100px] hover:text-orange-500 cursor-pointer'
                        onClick={() => deleteMenuItemAndRefresh(item.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                          <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                        </svg>

                      </div>
                    </div>
                  ))}
              </div>) : (
                <div>
                  {hotel.menu_items
                    .filter(item => item.type === "Food")
                    .map(item => (
                      <div key={item.id}
                        className="shadow-xl flex items-center justify-start space-x-4 bg-white p-1 m-2 rounded-2xl border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 hover:text-slate-600"
                      >
                        <img
                          src={`${imgUrl}/${item.image}`}
                          alt={`${item.name} image`}
                          className='h-[80px] w-[80px] rounded-full object-cover'
                        />
                        <h2 className='p-3 w-[100px] truncate md:w-[150px] text-l md:text-xl font-bold '>{item.name || "Unnamed Item"}</h2>
                        <p className='p-3 w-[100px] truncate md:w-[150px]'>Price: ${item.price}</p>
                        <p className='p-3 w-[150px] truncate md:w-[200px]'>: {item.description}</p>
                        <div className='p-3 w-[150px] truncate md:w-[100px] hover:text-orange-500 cursor-pointer'
                          onClick={() => deleteMenuItemAndRefresh(item.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                          </svg>

                        </div>
                      </div>
                    ))}
                </div>
              )}

            </div>
          </div>
        </div>
        <footer className="relative pt-6 pb-2 mt-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-slate-500 font-semibold py-1 ">
                  <div>
                  {`Contact number:-- ${hotel.phone_number}`}
                  </div>
                  <div>
                  {`Contact mail:-- ${hotel.email}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Restprofile;
