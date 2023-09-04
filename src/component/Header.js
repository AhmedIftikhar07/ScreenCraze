import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSolidUserCircle } from 'react-icons/bi';
import { ImExit } from 'react-icons/im';
// import { MdOutlineLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { database } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  let naviage = useNavigate()
  const handleLogOut = () => {
    signOut(database)
      .then(() => {
        swal({
          text: "Logout successfully",
          icon: "success",
          buttons: false,
          timer: 3000,
        });

        localStorage.removeItem('userUID');
        naviage('/login')

      })
      .catch(error => {
        console.error("Sign out error:", error);
      });
  };


  let tokeen = localStorage.getItem('userUID') ?? '';
  let isLoggedIn = false;

  if (tokeen !== '') {

    isLoggedIn = true;

  } else {

    isLoggedIn = false;

  }

  return (

    <div className="md:text-3xl header text-2xl flex justify-between px-2 py-6 items-center font-bold text-purple-500">
      <Link to={'/'}>
        <span>Screen<span className='text-white'>Craze</span></span>
      </Link>
      <div className="flex items-center space-x-3">
        {isLoggedIn ?
          <>
            <Link to={'/addmovie'}>
              <button className="bg-purple-600 hover:bg-purple-700 text-white active:bg-purple-900 md:px-2 px-1 py-1 font-semibold md:py-0 rounded shadow-md transition duration-300 ease-in-out">
                <h1 className='md:text-xl text-sm flex items-center '>
                  ADD<AiOutlinePlus className='ml-1 md:mt-1 inline rounded-md md:text-xl text-lg font-bold'></AiOutlinePlus>
                </h1>
              </button>
            </Link>
            <button className='text-purple-500 mt-2 md:text-2xl text-xl transition duration-300 ease-in-out hover:text-purple-600 active:text-purple-900' onClick={handleLogOut}>
              <ImExit></ImExit>
            </button>
          </>
          : <Link to={'/login'}>
            <BiSolidUserCircle className='text-purple-600 hover:text-purple-700 active:text-purple-900 text-4xl'></BiSolidUserCircle>
          </Link>
        }
      </div>
    </div>

  )
}

export default Header
