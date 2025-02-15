import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const CourseDetails = () => {
  const {id} = useParams();
  const [courseData, setCourseData] = useState(null);
  const {allCourses,calculateRating} = useContext(AppContext);
  const fetchCourseData = async() =>{
    const course = allCourses.find(course=>course._id === id);
    setCourseData(course);
  }
  useEffect(()=>{
    fetchCourseData();
  },[id])
  console.log(courseData)
  return (
    <div className='relative flex md:flex-row flex-col-reverse gap-10 items-start justify-between md:px-36 px-8 md:pt-36 pt-20 text-left'>
      <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/50'></div>
      {/* left section  */}
      <div>
        <h1 className='md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800'>{courseData?.courseTitle}</h1>
        <p dangerouslySetInnerHTML={{__html: courseData?.courseDescription.slice(0,200)}}></p>
         <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
                  <p>{calculateRating(courseData)}</p>
                  <div className='flex'>
                    {[...Array(5)].map((_,index)=><img key={index} src={index < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt="star" className='w-3.5 h-3.5'/>)}
                  </div>
                  <p className='text-blue-600'>({courseData?.courseRatings?.length} {courseData?.courseRatings?.length>1 ?"ratings":"rating"})</p>
                  <p>{courseData?.enrolledStudents?.length} {courseData?.enrolledStudents?.length>1 ?"students":"student"}</p>
         </div>
         <p className='text-sm'>Course by <span className='text-blue-600 underline'>{courseData?.educator.name ?? "Ashok"}</span></p>
      </div>
      {/* right section  */}
      <div></div>
    </div>
  )
}

export default CourseDetails