import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const SearchBar = ({data}) => {
  const [input, setInput] = useState(data?data:"")
  const {navigate} = useContext(AppContext);
  const searchHandler=(e)=>{
    e.preventDefault();
   {input && navigate("/course-list/"+input)} 
  }
  return (
    <form onSubmit={searchHandler} className='max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded'>
      <img src={assets.search_icon} alt="search" className='md:w-auto w-10 px-3'/>
      <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder='Search for courses' className='w-full h-full outline-none text-gray-500/88 '/>
      <button type='submit' className='bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1'>Search</button>
    </form>
  )
}

export default SearchBar