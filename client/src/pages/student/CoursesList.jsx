import React, { useContext, useEffect, useState } from 'react'
import SearchBar from '../../components/student/SearchBar'
import { AppContext } from '../../context/AppContext'
import CourseCard from '../../components/student/CourseCard'
import Footer from '../../components/student/Footer'
import {useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'

const CoursesList = () => {
  const {allCourses,navigate} = useContext(AppContext);
  const {input} = useParams();
  const [filteredCourses, setFilteredCourses] = useState([]);
  useEffect(()=>{
    if(allCourses?.length>0){
      const tempCourses = allCourses.slice();
      input?setFilteredCourses(tempCourses.filter(course=>course?.courseTitle.toLowerCase().includes(input.toLowerCase()))):setFilteredCourses(tempCourses)
    }
  },[allCourses,input])  
  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left '>
        <div className='flex md:flex-row flex-col items-start justify-between w-full'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
            <p className='text-gray-500'><span className='text-blue-600 cursor-pointer' onClick={()=>navigate("/")}>Home</span> / <span>Course List</span></p>
          </div>
          <SearchBar data={input}/>
        </div>
        {input && <div className='inline-flex items-center gap-4 px-4 py-2 mt-8 text-gray-600 border -mb-8'>
          <p>{input}</p>
          <img src={assets.cross_icon} atl="cross" className='cursor-pointer' onClick={()=>navigate("/course-list")}/>
          </div>}
        {filteredCourses.length >0 ?<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0'>
          {filteredCourses?.map((course,index)=><CourseCard key={index} course={course}/>)}
        </div>:<div className='mt-10 text-4xl font-semibold text-gray-800'>No courses found</div>}
      </div>
      <Footer/>
    </>
  )
}

export default CoursesList