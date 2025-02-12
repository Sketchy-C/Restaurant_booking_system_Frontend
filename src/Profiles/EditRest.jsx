import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { updateHotelProfile, getHotelProfile } from '../api';
import Navbar from '../Components/Navbar';

function EditRest() {
  const headbutton = 'm-0 p-3 text-gray-800 no-underline hover:bg-black hover:text-white border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 w-[100px] flex justify-center items-center cursor-pointer';
  const headbuttonSmall = 'm-0 p-3 text-gray-800 no-underline hover:bg-black hover:text-white border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 w-[75px] flex justify-center items-center cursor-pointer';

  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const [hotelData, setHotelData] = useState({
    hotel_cover: '',
    hotel_tables: 10,
    hotel_table_seats: 3,
    full_hotel_name: '',
    location: '',
    hotel_bio: '',
    type: 'hotel',
    phone_number: '',
    email:'',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const token = localStorage.getItem('token');
        const hotelId = localStorage.getItem('userId');

        if (!token || !hotelId) {
          toast.error('You are not logged in or no hotel ID found.');
          navigate('/login');
          return;
        }

        const response = await getHotelProfile(); 
        setHotelData(response);
      } catch (error) {
        toast.error('Failed to fetch hotel data');
      }
    };
    fetchHotelData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("full_hotel_name", hotelData.full_hotel_name);
    formDataToSend.append("location", hotelData.location);
    formDataToSend.append("hotel_bio", hotelData.hotel_bio);
    formDataToSend.append("hotel_tables", hotelData.hotel_tables);
    formDataToSend.append("hotel_table_seats", hotelData.hotel_table_seats);
    formDataToSend.append("type", hotelData.type);
    formDataToSend.append("phone_number", hotelData.phone_number);
    formDataToSend.append("email", hotelData.email);

    if (imageFile) {
      formDataToSend.append("hotel_cover", imageFile);
    }

    try {
      const hotelId = localStorage.getItem('userId');

      if (!hotelId) {
        toast.error("Hotel ID not found.");
        return;
      }

      await updateHotelProfile(hotelId, formDataToSend);
      toast.success("Hotel profile updated successfully");
      navigate(`/Restprofile`);
    } catch (error) {
      const errorMessage = error?.response?.data || error?.message || "Unknown error";
      toast.error(`Failed to update profile: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div>
      <Navbar />
      <div className="pt-18">
        <div>
          <div className="flex space-x-4 bg-white justify-center">
            <Link to="/edit-rest" className={`${headbutton} linked w-[180px]`} >Edit Hotel</Link>
            <Link to="/addMenu" className={`${headbutton} linked w-[180px]`} >Add Menu Item</Link>
            <Link to="/Restprofile" className={`${headbutton} linked w-[180px]`} >Preview</Link>
          </div>
        </div>
        <div className="w-full mx-auto flex justify-center pt-10">
          
        <div className='bg-white px-20 rounded-2xl'>
          <div className="max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4">Edit Hotel Info</h2>
            <form onSubmit={handleSubmit}>
              {/* Hotel Name */}
              <div className="mb-4">
                <label htmlFor="full_hotel_name" className="block text-sm font-medium text-gray-700">Hotel Name</label>
                <input
                  type="text"
                  id="full_hotel_name"
                  name="full_hotel_name"
                  value={hotelData.full_hotel_name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Location */}
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={hotelData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Hotel Bio */}
              <div className="mb-4">
                <label htmlFor="hotel_bio" className="block text-sm font-medium text-gray-700">Hotel Bio</label>
                <textarea
                  id="hotel_bio"
                  name="hotel_bio"
                  value={hotelData.hotel_bio}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md"
                  rows="4"
                  required
                />
              </div>

              {/* Hotel Cover Image URL */}

              {imageFile && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Image preview"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  className={`mt-1 block w-full p-2 border rounded-md`}
                />
              </div>

              {/* Number of tables */}
              <div className="mb-4">
                <label htmlFor="hotel_seats" className="block text-sm font-medium text-gray-700">Number of Tables</label>
                <input
                  type="number"
                  id="hotel_tables"
                  name="hotel_tables"
                  value={hotelData.hotel_tables}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md"
                  min="1"
                  required
                />
              </div>

              {/* Number of tables */}
              <div className="mb-4">
                <label htmlFor="hotel_seats" className="block text-sm font-medium text-gray-700">Seats per table</label>
                <input
                  type="number"
                  id="hotel_table_seats"
                  name="hotel_table_seats"
                  value={hotelData.hotel_table_seats}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md"
                  min="1"
                  required
                />
              </div>
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="hotel_seats" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={hotelData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              {/* Number  */}
              <div className="mb-4">
                <label htmlFor="hotel_seats" className="block text-sm font-medium text-gray-700">Number</label>
                <input
                  type="number"
                  id="phone_number"
                  name="phone_number"
                  value={hotelData.phone_number}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md"
                  required
                />
              </div>
              

              <div className="flex justify-center p-5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
              
              <div className='m-2'>
                <Link to='/addpic' className={`${headbutton} linked w-full`}>Add hotel images</Link>
              </div>  
            </form>
          </div>
        </div>
        </div>
          
      </div>
    </div>
  );
}

export default EditRest;
