import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
const Header = () => {
  return (
    <div className="md:text-3xl text-2xl flex justify-between p-3 border-b-2 items-center border-slate-700 font-bold text-blue-500">
      <span>Screen<span className='text-white'>Craze</span></span>
      <button class="bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-white font-semibold  px-2 py-1 rounded shadow-md transition duration-300 ease-in-out"><h1 className='md:text-xl text-sm  flex items-center text-white'>Add<AiOutlinePlus className='ml-1 md:mt-1 inline text-white  rounded-md md:text-xl text-lg'></AiOutlinePlus></h1> </button>   
    </div>
  )
}

export default Header
