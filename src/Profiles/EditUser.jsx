import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateUserProfile, getUserProfile } from '../api';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

function EditUser() {
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    bio: '',
    image: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response);
        setFormData({
          username: response.user.username,
          full_name: response.full_name,
          bio: response.bio,
          image: response.image || ''
        });
        setLoading(false);
      } catch (error) {
        const errorMessage = error?.response?.data || error?.message || 'Unknown error';
        toast.error("Failed to fetch user data: " + errorMessage);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append("full_name", formData.full_name);
    formDataToSend.append("bio", formData.bio);
    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }
  

    try {
      await updateUserProfile(user.user.id, formDataToSend);
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      const errorMessage = error?.response?.data || error?.message || "Unknown error";
      toast.error("Failed to update profile: " + errorMessage);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="mt-[100px]">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            {/* <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md"
                required
              />
            </div> */}
            <div className="mb-4">
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md"
                rows="4"
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
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image</label>
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
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
