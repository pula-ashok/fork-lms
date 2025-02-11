import React from 'react'
import { assets } from './../../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isCourseListpage = location.pathname.includes("/course-list");
  return (
    <div className={`flex justify-between items-center px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListpage ? "bg-white":"bg-cyan-100/70"}`}>
      <img src={assets.logo} alt="logo" className='w-28 lg:w-32 cursor-pointer'/>
      {/* desktop view  */}
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex items-center gap-5'>
          <button>Become Educator</button>
          | <Link to={"/my-enrollments"}>My Enrollements</Link>
        </div>
        <button className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>
      </div>
      {/* mobile view  */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className='flex items-center gap-5'>
          <button>Become Educator</button>
          | <Link to={"/my-enrollments"}>My Enrollements</Link>
        </div>
        <button><img src={assets.user_icon} alt='user icon'/></button>
      </div>
    </div>
  )
}

export default Navbar