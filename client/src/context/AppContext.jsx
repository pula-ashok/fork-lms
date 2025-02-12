import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";

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
  const value = {currency,allCourses,calculateRating};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;