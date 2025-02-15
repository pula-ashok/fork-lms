import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration"

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState([])
  const currency = import.meta.env.VITE_CURRENCY;
  //fetch all courses
  const fetchAllCourses = async()=>{
    setAllCourses(dummyCourses)
  }
  useEffect(()=>{
    fetchAllCourses()},[])
  const calculateRating = course =>{
      if(course?.courseRatings?.length <= 0){
        return 0;
      }
      let totalRating = 0;
      course?.courseRatings?.forEach(rating => {
        totalRating += rating.rating
      })
      return Number(totalRating / course?.courseRatings?.length)
  }
  const calculateChaptertime = chapter =>{
    let time = 0;
    chapter?.chapterContent?.map(lecture=>time += lecture?.lectureDuration);
    return humanizeDuration(time*60*1000,{units:["h","m"]});
  }
  const calculateCourseDuration = course =>{
    let time = 0;
    course?.courseContent?.map(chapter=>chapter?.chapterContent?.map(lecture=>time += lecture?.lectureDuration));
    return humanizeDuration(time*60*1000,{units:["h","m"]});
  }
  const calculateLectures = course =>{
    let totalLectures = 0;
    course?.courseContent?.map(chapter=>{
      if(Array.isArray(chapter?.chapterContent)){
        totalLectures += chapter?.chapterContent?.length;
      }
    });
    return totalLectures;
  }
  const value = {currency,allCourses,calculateRating,calculateChaptertime,calculateCourseDuration,calculateLectures};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;