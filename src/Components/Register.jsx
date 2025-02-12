import React, { useState } from 'react';
import { registerUser } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User'
  });

  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFieldErrors({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;

    try {
      const data = await registerUser(dataToSend);
      toast.success('User registered successfully!', 'Continue to login for confirmation');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);

      if (error.response && error.response.data) {
        const fieldErrors = error.response.data;
        setFieldErrors(fieldErrors);
      } else {
        setError('PLease make sure there are no spaces in your username');
      }
      toast.error('Registration failed! \n Use a unique username and email');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className=' p-2 text-[20px] flex justify-center mb-8 '>
        <p className='text-orange-600 cursor-pointer' onClick={() => navigate('/')} >Nomad's Table </p>
      </div>
      <div className='h-[650px] flex justify-center mb-8 '>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full" >
          <label className="block text-gray-700 text-sm font-bold mb-2 bg-orange-100">
            Registration Form:
          </label>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            {fieldErrors.username && <p className="text-red-500 text-xs italic">{fieldErrors.username[0]}</p>}
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Choose your Role
            </label>
            <select
              className="border border-gray-300 text-gray-700 text-sm rounded py-2 px-3 w-full"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="User"> Customer</option>
              <option value="Hotel Owner">Hotel Owner</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you like</p>

          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password*
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password"
              name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
            <p className="text-gray-600 text-xs italic">Repeat the password for confirmation</p>

          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>} {/* Error styling */}

          <button type="submit" className="md:w-[300px] w-full">Register</button>

          <div >
            <p className='text-slate-600 pt-[32px] flex'>don't have an account ? <p onClick={() => navigate('/login')} className='text-orange-600 cursor-pointer underline'>Login</p> </p></div>

        </form>
        <div>
          <img src="https://i.pinimg.com/736x/6a/fd/a3/6afda31369356388733b52e090006665.jpg" alt="" className='h-full object-cover' />
        </div>
      </div>
    </div>
  );
};

export default Register;
