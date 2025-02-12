import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { getOtherProfile, getUserProfile, makeBooking } from '../api';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import domtoimage from 'dom-to-image';

function OtherRestprofile() {
  const headbutton = 'm-0 p-3 text-gray-800 no-underline hover:bg-black hover:text-white border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 w-auto flex justify-center items-center cursor-pointer';

  // Screenshot
  const captureScreenshot = () => {
    const element = document.getElementById('check');

    if (element) {
      domtoimage.toPng(element)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'Nomads_table_Invoice.png';
          link.click();
          navigate('/notification')
        })
        .catch((error) => {
          console.error('Error capturing screenshot:', error);
        });
    } else {
      console.log('Element with id "check" not found');
    }
  };

  // Toogle my selections
  const [showFoods, setShowFoods] = useState(false);
  const [showRooms, setShowRooms] = useState(false);
  const [showInvoice, setInvoice] = useState(false);
  const [user, setUser] = useState(null);

  const toggleFoods = () => {
    setShowFoods(!showFoods)
    setShowRooms(false)
  };
  const toggleRooms = () => {
    setShowRooms(!showRooms)
    setShowFoods(false)
  };

  const [selection, setSelection] = useState('');
  const [menuItems, setMenuItems] = useState(null);

  const handleSelectionChange = (event) => {
    const value = event.target.value;
    setSelection(value);
    if (value === 'room') {
      setMenuItems(true);
    } else if (value === 'table') {
      setMenuItems(false);
    } else {
      setMenuItems(null);
    }
  };

  const [selectedItemDetails, setSelectedItemDetails] = useState("");
  const selectedItem = (itemName, itemData, RefHotel, menuItemid) => {

    localStorage.setItem('menuitemId', menuItemid);
    let selectedItem = ''
    let itemType = ''
    if (menuItems == true) {
      selectedItem = `Room type ✅ ${itemName}: ${itemData}`;
      itemType = 'Room'
    } else if (menuItems == false) {
      selectedItem = `Main meal ✅ ${itemName}: ${itemData}`;
      itemType = 'Table'
    } else {
      selectedItem = `Select table or room`;
      itemType = 'Table'

    }
    toast.success(`Selected ${itemName}:`);
    setSelectedItemDetails(selectedItem);
    localStorage.setItem('ref_hotel', RefHotel);
    const userid = localStorage.getItem('userId')

    console.log(` hotel: ${RefHotel},\n user_id: ${userid},\n hotel_name: ${hotel.full_hotel_name},\n menuitem: ${menuItemid},\n user: ${userid},\n type: ${itemType}`)

  };

  // getting other hotel info
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const imgUrl = 'https://res.cloudinary.com/dm1dnfpng/';
  const responsive =
    'h-[18rem] w-[26rem] object-cover xs:h-[18rem] xs:w-[26rem] sm:h-[22rem] sm:w-[34rem] md:h-[24rem] md:w-[45rem] lg:h-[30rem] lg:w-[60rem] xl:h-[30rem] xl:w-[64rem]';
  const { hotelId } = useParams();

  // get hotel info
  const [currentHotelId, setCurrentHotelId] = useState(null);

  useEffect(() => {
    const fetchHotelProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          toast.error('You are not logged in.');
          navigate('/login');
          return;

        }

        if (!hotelId) {
          toast.error('No hotel ID found.');
          navigate('/login');
          return;
        }

        const response = await getOtherProfile(hotelId);
        localStorage.setItem('hotel', hotelId);

        setHotel(response);
        console.log(response.id)
        setCurrentHotelId(response.id);


        const resUser = await getUserProfile();
        setUser(resUser);

        setLoading(false);

      } catch (error) {
        const errorMessage = error?.response?.data || error?.message || 'Unknown error';
        toast.error('Failed to fetch profile: ' + errorMessage);
        setLoading(false);
      }
    };

    fetchHotelProfile();
  }, [hotelId, navigate]);

  const handleBooking = async (event) => {
    event.preventDefault();
    let userId = localStorage.getItem('userId');
    const menuItem = parseInt(localStorage.getItem('menuitemId'))
    userId = parseInt(localStorage.getItem('userId'));
    const number = parseInt(event.target.elements.number.value);
    const selection2 = selection.charAt(0).toUpperCase() + selection.slice(1);


    // if (!currentHotelId || !userId || !selection) {
    //   toast.error('Missing required data!');
    //   return;
    // }

    const bookData = {
      hotel: currentHotelId,
      user: userId,
      hotel_name: hotel.full_hotel_name,
      menuItem: menuItem,
      type: selection2,
      number: number,
    };

    console.log('Booking data:', bookData);

    try {
      const bookingResponse = await makeBooking(bookData);
      setInvoice(true)
      toast.success('Booking successful!');

    } catch (error) {
      const errorMsg = error?.message || 'Unknown error';
      console.error('Error details:', error);
      toast.error('Booking failed: ' + errorMsg);
    }
  };


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
        <h1 className="text-orange-500 ml-4 p-3 rounded-2xl w-full mx-auto flex justify-center"></h1>
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
            <h3 className='text-orange-400 text-xl'>{hotel.full_hotel_name}: Photos</h3>
            <div className="relative">
              <img
                src={images[currentIndex].image}
                alt="carousel"
                className="w-full h-64 md:h-80 lg:h-110 object-cover rounded-lg"
              />
              <h1 className='text-green-600'>{images[currentIndex].name}</h1>
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
        </div>
        <div className='flex justify-center pb-10'>
          <div className=' p-5 flex justify-center bg-white rounded-2xl w-full m-2'>
            <div className='w-full my-auto p-5 text-orange-500 text-xl'>
              <p className='text-2xl'>Book one of Our Services </p>
              <div>
                <div className="bg-white border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl">
                  <h2 className="text-2xl font-medium mb-4">Book</h2>
                  <form onSubmit={handleBooking}>
                    <div className="mb-4">
                      <label htmlFor="selection" className="block text-gray-700 font-medium mb-2">Table or Room</label>
                      <select
                        id="selection"
                        name="selection"
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                        onChange={handleSelectionChange}
                      >
                        <option value="">Select an option</option>
                        <option value="table">Table</option>
                        <option value="room">Room</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      {menuItems ? (
                        <label htmlFor="menuItem" className="block text-gray-700 font-medium mb-2">What type of room ?</label>
                      ) : (
                        <div>
                        <label htmlFor="menuItem" className="block text-gray-700 font-medium mb-2">Select main food ?</label>
                        <p className="text-gray-600 text-xs italic">Select the main food, the rest will be orderd on arrival</p>
                        </div>
                      )}
                      {menuItems ? (
                        <div>
                          <p onClick={toggleRooms}
                            className={`${headbutton} linked`}>
                            {showRooms ? "Hide Rooms" : "Show Rooms"}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p onClick={toggleFoods}
                            className={`${headbutton} linked`}>
                            {showFoods ? "Hide Menu" : "Show Menu"}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className='mb-4'>
                      <p>{selectedItemDetails}</p>
                    </div>
                    <div className="mb-4">
                      {menuItems ? (
                        <label htmlFor="menuItem" className="block text-gray-700 font-medium mb-2">Number of rooms</label>
                      ) : (
                        <div>
                        <label htmlFor="menuItem" className="block text-gray-700 font-medium mb-2">Number of tables</label>
                        <p>{`Seats per table: ${hotel.hotel_table_seats}`}</p>
                        </div>
                      )}
                      <input type="number"
                        name="number"
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>
                    <div>
                      <button type="submit" className="w-[200px]">Book</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>

          </div>

        </div> <div className='p-5'>
          <div className='flex'>

          </div>
          <div>
            {showFoods && (
              <div className="menu-list fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 z-50 flex flex-col justify-center items-center" style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
                <h1 className='font-bold bg-white p-5 rounded-full py-0 border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 hover:text-slate-600 hover:bg-red-300 cursor-pointer' onClick={toggleFoods}>x</h1>
                <div>
                  {hotel.menu_items
                    .filter(item => item.type === "Food")
                    .map(item => (
                      <div key={item.id}
                        className="shadow-xl flex items-center justify-start space-x-4 bg-white p-1 m-2 rounded-2xl border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 hover:text-slate-600"
                        onClick={() => selectedItem(item.name, item.description, item.hotel_id, item.id)}>
                        <img
                          src={`${imgUrl}/${item.image}`}
                          alt={`${item.name} image`}
                          className='h-[80px] w-[80px] rounded-full object-cover'
                        />
                        <h2 className='p-3 w-[100px] truncate md:w-[150px] text-l md:text-xl font-bold '>{item.name || "Unnamed Item"}</h2>
                        <p className='p-3 w-[100px] truncate md:w-[150px]'>Price: ${item.price}</p>
                        <p className='p-3 w-[150px] truncate md:w-[200px]'>: {item.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {showRooms && (
              <div className="menu-list fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 z-50 flex flex-col justify-center items-center " style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
                <h1 className='font-bold bg-white p-5 rounded-full py-0 border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 hover:text-slate-600 hover:bg-red-300 cursor-pointer' onClick={toggleRooms}>x</h1>
                <div>
                  {hotel.menu_items
                    .filter(item => item.type === "Beds")
                    .map(item => (
                      <div key={item.id}
                        className="shadow-xl flex items-center justify-start space-x-4 bg-white p-1 m-2 rounded-2xl border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 hover:text-slate-600"
                        onClick={() => selectedItem(item.name, item.description, item.hotel_id, item.id)}>
                        <img
                          src={`${imgUrl}/${item.image}`}
                          alt={`${item.name} image`}
                          className='h-[80px] w-[80px] rounded-full object-cover'
                        />
                        <h2 className='p-3 w-[100px] truncate md:w-[150px] text-l md:text-xl font-bold '>{item.name || "Unnamed Item"}</h2>
                        <p className='p-3 w-[100px] truncate md:w-[150px]'>Price: ${item.price}</p>
                        <p className='p-3 w-[150px] truncate md:w-[200px]'>: {item.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
          <div>
            {showInvoice && (
              <div className=" fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 z-50 flex flex-col justify-center items-center " style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
                <div className="flex flex-col h-screen w-full items-center justify-center p-3">
                  <p>Invoice</p>
                  <div id='check' className="w-80 rounded bg-gray-50 px-6 pt-8 shadow-lg">
                    <img src={`${imgUrl}${hotel.hotel_cover}`} alt="hotel pic" className="mx-auto max-h-30 w-16 py-4 object-cover rounded-full" />
                    <div className="flex flex-col justify-center items-center gap-2">
                      <h4 className="font-semibold">Nomad's Table Invoice</h4>
                    </div>  
                    <div className="flex flex-col gap-3 border-b py-6 text-xs">
                      <p className="flex justify-between">
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Order Type:</span>
                        <span>{hotel.type}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Host:</span>
                        <span>{hotel.full_hotel_name}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Customer:</span>
                        <span>{user.user.username}</span>
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="flex">
                            <th className="w-full py-2">Order</th>
                            {/* <th className="min-w-[44px] py-2">QTY</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="flex">
                            <td className="flex-1 py-1">{selectedItemDetails}</td>
                            {/* <td className="min-w-[44px]"></td> */}
                          </tr>
                          <tr className="flex py-1">
                            <td className="flex-1">Booking Pending...</td>
                            <td className="min-w-[44px]">##</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="border-b border border-dashed"></div>
                      <div className="py-4 justify-center items-center flex flex-col gap-2">
                        <p className="flex gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M21.3 12.23h-3.48c-.98 0-1.85.54-2.29 1.42l-.84 1.66c-.2.4-.6.65-1.04.65h-3.28c-.31 0-.75-.07-1.04-.65l-.84-1.65a2.567 2.567 0 0 0-2.29-1.42H2.7c-.39 0-.7.31-.7.7v3.26C2 19.83 4.18 22 7.82 22h8.38c3.43 0 5.54-1.88 5.8-5.22v-3.85c0-.38-.31-.7-.7-.7ZM12.75 2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2h1.5V2Z" fill="#000"></path>
                            <path d="M22 9.81v1.04a2.06 2.06 0 0 0-.7-.12h-3.48c-1.55 0-2.94.86-3.63 2.24l-.75 1.48h-2.86l-.75-1.47a4.026 4.026 0 0 0-3.63-2.25H2.7c-.24 0-.48.04-.7.12V9.81C2 6.17 4.17 4 7.81 4h3.44v3.19l-.72-.72a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2 2c.01.01.02.01.02.02a.753.753 0 0 0 .51.2c.1 0 .19-.02.28-.06.09-.03.18-.09.25-.16l2-2c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0l-.72.72V4h3.44C19.83 4 22 6.17 22 9.81Z" fill="#000"></path>
                          </svg>
                          {hotel.email}
                        </p>
                        <p className="flex gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path fill="#000" d="M11.05 14.95L9.2 16.8c-.39.39-1.01.39-1.41.01-.11-.11-.22-.21-.33-.32a28.414 28.414 0 01-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41C2.24 8.67 2 7.58 2 6.54c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C4.15 2.31 4.85 2 5.59 2c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.1.1.21.2.31.3.4.39.41 1.03.01 1.43zM21.97 18.33a2.54 2.54 0 01-.25 1.09c-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.01 0-.02.01-.03.01-.59.24-1.23.37-1.92.37-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98c-.39-.29-.78-.58-1.15-.89l3.27-3.27c.28.21.53.37.74.48.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78z"></path>
                          </svg>
                          {hotel.phone_number}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`${headbutton} linked bg-white m-5`} onClick={captureScreenshot}>
                    <p className='text-lg'>Save invoice</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
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

export default OtherRestprofile;