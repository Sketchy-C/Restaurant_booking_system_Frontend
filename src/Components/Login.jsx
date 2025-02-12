import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { username, password };
      console.log("Sending data to login API:", data);

      const response = await loginUser(data);
      if (response?.success) {
        navigate('/profile');
      }
    } catch (error) {
      toast.error("Login failed: " + error?.message || "Unknown error");
    }
  };

  return (
    <div>
      <div className=' p-2 text-[20px] flex justify-center mb-8 '>
        <p className='text-orange-600 cursor-pointer' onClick={() => navigate('/')} >Nomad's Table </p>
      </div>
      <div className='h-[400px] flex justify-center mb-2'>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full">
          <label className="block text-gray-700 text-sm font-bold mb-2 bg-orange-100">
            Login Form:
          </label>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <p className="text-gray-600 text-xs italic">Enter your username</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-gray-600 text-xs italic">Make sure to use the correct password</p>
          </div>

          <button type="submit" className='md:w-[300px] w-full'>Login</button>

          <div >
            <p className='text-slate-600 pt-[32px] flex'>don't have an account ? <p onClick={() => navigate('/register')} className='text-orange-600 cursor-pointer underline'>Register</p> </p></div>


        </form>

        <div>
          <img
            src="https://i.pinimg.com/736x/e1/41/69/e141692f84858db3261ea2962df27b5b.jpg"
            alt=""
            className='h-full object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
