import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import {Line } from "rc-progress"

const MyEnrollments = () => {
  const {enrolledCourses,calculateCourseDuration,navigate} = useContext(AppContext);
  const [progressArray, setProgressArray] = useState([
    {lecturesCompleted: 1, totalLectures: 5},
    {lecturesCompleted: 3, totalLectures: 6},
    {lecturesCompleted: 4, totalLectures: 4},
    {lecturesCompleted: 0, totalLectures: 3},
    {lecturesCompleted: 5, totalLectures: 7},
    {lecturesCompleted: 6, totalLectures: 8},
    {lecturesCompleted: 2, totalLectures: 6},
    {lecturesCompleted: 4, totalLectures: 10},
    {lecturesCompleted: 3, totalLectures: 5},
    {lecturesCompleted: 7, totalLectures: 7},
    {lecturesCompleted: 1, totalLectures: 4},
    {lecturesCompleted: 0, totalLectures: 2},
    {lecturesCompleted: 5, totalLectures: 5},
  ])
  return (
    <div className=' md:px-36 px-8 pt-10'>
      <h1 className='text-2xl font-semibold'>My Enrollments</h1>
      <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
          <tr>
            <th className='px-4 py-3 font-semibold truncate'>Course</th>
            <th className='px-4 py-3 font-semibold truncate'>Duration</th>
            <th className='px-4 py-3 font-semibold truncate'>Completed</th>
            <th className='px-4 py-3 font-semibold truncate'>Status</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {enrolledCourses?.map((course,index)=><tr key={index}>
            <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
              <img src={course?.courseThumbnail} alt="thumbnail" className='w-14 sm:w-24 md:w-28' />
              <div className='flex-1'>
                <p className='mb-1 max-sm:text-sm'>{course?.courseTitle}</p>
                <Line strokeWidth={2} className='bg-gray-300 rounded-full' percent={progressArray[index]?progressArray[index].lecturesCompleted/progressArray[index].totalLectures*100:0}/>
              </div>
            </td>
            <td className='px-4 py-3 max-sm:hidden'>{calculateCourseDuration(course)}</td>
            <td className='px-4 py-3 max-sm:hidden'>{progressArray[index] && `${progressArray[index].lecturesCompleted}  / ${progressArray[index].totalLectures}`} <span>Lectures</span></td>
            <td className='px-4 py-3 max-sm:text-right'>
              <button onClick={()=>navigate("/player/"+course._id)} className='bg-blue-600 px-3 sm:px-5 py-1.5 max-sm:text-xs text-white'>{progressArray[index] && progressArray[index].lecturesCompleted/progressArray[index].totalLectures ===1 ? "Completed" : "On Going"}</button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default MyEnrollments