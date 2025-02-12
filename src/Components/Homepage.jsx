import React from 'react';
import Navbar from '../Components/Navbar';
import UserProfile from '../Profiles/UserProfile';
import ProfileHome from '../Pages/ProfileHome';


function Homepage() {
  return (
    <div>
        <Navbar/>
        <div className='mt-[64px]'> 
        <ProfileHome/>
        </div>
    </div>
  )
}


export default Homepage
