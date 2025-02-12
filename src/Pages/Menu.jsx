import React, { useState } from 'react';
import { create_MenuItem } from '../api';
import { toast } from 'react-toastify';
import Navbar from '../Components/Navbar'
import { Link, useNavigate } from 'react-router-dom';

function Menu() {
  const headbutton = 'm-0 p-3 text-gray-800 no-underline hover:bg-black hover:text-white border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 w-[100px] flex justify-center items-center cursor-pointer';
  const headbuttonSmall = 'm-0 p-3 text-gray-800 no-underline hover:bg-black hover:text-white border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 w-[75px] flex justify-center items-center cursor-pointer';

  const navigate = useNavigate();
  console.log(localStorage.getItem('hotel_id'))
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    price: '',
    hotel_id: localStorage.getItem('hotelId'),
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('type', formData.type);
      formDataToSubmit.append('description', formData.description);
      formDataToSubmit.append('price', formData.price);
      formDataToSubmit.append('hotel_id', formData.hotel_id);

      if (imageFile) {
        formDataToSubmit.append('image', imageFile);
      }

      const response = await create_MenuItem(formDataToSubmit);
      toast.success('Menu item created successfully!');
      navigate('/Restprofile')
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Error creating menu item: ' + (error.message || error));
    }
  };

  if (loading) {
    return <div>
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
    </div>;
  }

  return (
    <div>
      <Navbar />
      <div className="pt-18">
        <div className='pb-10'>
          <div className="flex space-x-4 bg-white justify-center">
                      <Link to="/edit-rest" className={`${headbutton} linked w-[180px]`} >Edit Hotel</Link>
                      <Link to="/addMenu" className={`${headbutton} linked w-[180px]`} >Add Menu Item</Link>
                      <Link to="/Restprofile" className={`${headbutton} linked w-[180px]`} >Preview</Link>
          </div>
        </div>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Add Menu item</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Type
              </label>
              <select
                className="border border-gray-300 text-gray-700 text-sm rounded py-2 px-3 w-full"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="Food">Table</option>
                <option value="Beds">Room</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md"
                required
              />
            </div>

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
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Item Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Menu;
