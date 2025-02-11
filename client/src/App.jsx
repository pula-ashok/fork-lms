import React from 'react'
import {Routes, Route, useMatch} from 'react-router-dom'
import Home from './pages/student/Home';
import CoursesList from './pages/student/CoursesList';
import CourseDetails from './pages/student/CourseDetails';
import Player from './pages/student/Player';
import Loading from './components/student/Loading';
import Educator from './pages/educator/Educator';
import Dashboard from './pages/educator/Dashboard';
import AddCourse from './pages/educator/AddCourse';
import MyCourses from './pages/educator/MyCourses';
import StudentsEnrolled from './pages/educator/StudentsEnrolled';
import Navbar from './components/student/Navbar';
const App = () => {
  const isEducatorRoute = useMatch("/educator/*");
  return (
    <di className="text-default min-h-screen bg-white">
      {!isEducatorRoute &&<Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/course-list" element={<CoursesList/>} />
        <Route path="/course-list/:input" element={<CoursesList/>} />
        <Route path="/course/:id" element={<CourseDetails/>} /> 
        <Route path='/player/:courseId' element={<Player/>}/>
        <Route path='/loading/:path' element={<Loading/>}/>
        <Route path='/educator' element={<Educator/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='add-course' element={<AddCourse/>}/>
          <Route path='my-courses' element={<MyCourses/>}/>
          <Route path='students-enrolled' element={<StudentsEnrolled/>}/>
        </Route>
      </Routes>
    </di>
  )
}

export default App