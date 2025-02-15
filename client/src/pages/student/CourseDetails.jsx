import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';

const CourseDetails = () => {
  const {id} = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({})
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false)
  const {currency, allCourses,calculateRating,calculateChaptertime,calculateCourseDuration,calculateLectures} = useContext(AppContext);
  const fetchCourseData = async() =>{
    const course = allCourses.find(course=>course._id === id);
    setCourseData(course);
  }
  useEffect(()=>{
    fetchCourseData();
  },[allCourses,id])
  const toggleSections=(id)=>{
    setOpenSections(prev=>({...prev,[id]:!prev[id]}))
  }
  console.log(courseData)
  return (
    <div className='relative flex md:flex-row flex-col-reverse gap-10 items-start justify-between md:px-36 px-8 md:pt-36 pt-20 text-left'>
      <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/50'></div>
      {/* left section  */}
      <div>
        <h1 className='md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800'>{courseData?.courseTitle}</h1>
        <p dangerouslySetInnerHTML={{__html: courseData?.courseDescription.slice(0,200)}}></p>
         <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
                  <p>{calculateRating(courseData )}</p>
                  <div className='flex'>
                    {[...Array(5)].map((_,index)=><img key={index} src={index < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt="star" className='w-3.5 h-3.5'/>)}
                  </div>
                  <p className='text-blue-600'>({courseData?.courseRatings?.length} {courseData?.courseRatings?.length>1 ?"ratings":"rating"})</p>
                  <p>{courseData?.enrolledStudents?.length} {courseData?.enrolledStudents?.length>1 ?"students":"student"}</p>
         </div>
         <p className='text-sm'>Course by <span className='text-blue-600 underline'>{courseData?.educator.name ?? "Ashok"}</span></p>
         <div className='pt-8 text-gray-800'>
          <h2 className='text-xl font-bold'>Course Structure</h2>
          <div className='pt-5'>
            {
              courseData?.courseContent?.map((chapter,index)=>
              <div className='border border-gray-300 bg-white mb-2 rounded' key={index}>
                <div className='flex justify-between items-center px-4 py-3 cursor-pointer selct-none' onClick={()=>toggleSections(index)}>
                  <div className='flex items-center gap-2'>
                    <img src={assets.down_arrow_icon} alt="down arrow" />
                    <p className='font-medium md:text-base text-sm'>{chapter?.chapterTitle}</p>
                  </div>
                    <p className='text-sm md:text-default'>{chapter?.chapterContent?.length} {chapter?.chapterContent?.length>1 ?"lectures":"lecture"} - {calculateChaptertime(chapter)}</p>               
                </div>
                <div className={`overflow-hidden trasntion-all duration-300 ${openSections[index]?'max-h-96':'max-h-0'}`}>
                    <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                      {
                        chapter?.chapterContent?.map((lecture,index)=>
                        <li className='flex items-center gap-2 py-1 mb-2 cursor-pointer' key={index}>
                          <img src={assets.play_icon} alt="play icon" className='w-4 h-4 mt-1' />
                          <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lecture?.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {lecture?.isPreviewFree && <p className='text-blue-500 cursor-pointer'>Preview</p>}
                            <p>{humanizeDuration(lecture?.lectureDuration*60*1000,{units:["h","m"]})} </p>
                          </div>
                          </div>
                        </li>
                        )
                      }
                    </ul>
                  </div>
              </div>
              )
            }
          <div className='py-20 text-sm md:text-default'>
            <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
            <p className='pt-3 rich-text' dangerouslySetInnerHTML={{__html: courseData?.courseDescription}}></p>
          </div>
          </div>
         </div>
      </div>
      {/* right section  */}
      <div className='max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]'>
        <img src={courseData?.courseThumbnail} alt="thumbnail" />
        <div className='p-5'>
          <div className='flex items-center gap-2'>
            <img src={assets.time_left_clock_icon} alt="clock icon" className='w-3.5' />
            <p className='text-red-500'><span className='font-medium'>5 days left</span> at this price!</p>
          </div>
          <div className='flex gap-3 items-center pt-2'>
            <p className='text-gray-800 font-semibold md:text-4xl text-2xl'>{currency} {(courseData?.coursePrice - (courseData?.discount * courseData?.coursePrice) / 100).toFixed(2)}</p>
            <p className='md:text-lg text-gray-500 line-through'>{currency} {courseData?.coursePrice}</p>
            <p className='md:text-lg text-gray-500'>{courseData?.discount}% off</p>
          </div>
          <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500 '>
            <div className='flex items-center gap-2'>
              <img src={assets.star} alt="star" />
              <p>{calculateRating(courseData)}</p>
            </div>
            <div className='h-4 w-px bg-gray-500/40'></div>
            <div className='flex items-center gap-2'>
              <img src={assets.time_clock_icon} alt="clock" />
              <p>{calculateCourseDuration(courseData)}</p>
            </div>
            <div className='h-4 w-px bg-gray-500/40' ></div>
            <div className='flex items-center gap-2'>
              <img src={assets.lesson_icon} alt="lesson" />
              <p>{calculateLectures(courseData)} {calculateLectures(courseData) > 1 ? "lessons" : "lesson"}</p>
            </div>
          </div>
          <button className='bg-blue-600 w-full md:mt-6 mt-4 py-3 rounded text-white font-medium'>{alreadyEnrolled ? "Already Enrolled" : "Enroll Now"}</button>
          <div className='pt-6'>
            <p className='md:text-xl text-lg font-medium text-gray-800'>What’s in the course?</p>
            <ul className='ml-4 pt-2 text-sm md:text-default list-disc text-gray-500'>
              <li>Lifetime access with free updates.</li>
              <li>Step-by-step, hands-on project guidance.</li>
              <li>Downloadable resources and source code.</li>
              <li>Quizzes to test your knowledge.</li>
              <li>Certificate of completion.</li>
              <li>Quizzes to test your knowledge.</li>
            </ul>
          </div>
        </div>      
      </div>
    </div>
  )
}

export default CourseDetails