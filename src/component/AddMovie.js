import React, { useState } from 'react';
import Spninner from './Spninner';
import { addDoc } from 'firebase/firestore';
import swal from 'sweetalert';
import { moviesRef } from '../firebase/firebase';

import { Link, useNavigate } from 'react-router-dom';
const AddMovie = () => {
  document.title = "ScreenCraze | Add Movie"

  const history = useNavigate()
  const [loader, setLoader] = useState(false);
  const [form, SetForm] = useState({
    title: '',
    year: '',
    description: '',
    image: '',
    rated: 0,
    rating: 0
  });
  const [validation, setValidation] = useState({
    title: true,
    year: true,
    image: true,
    description: true,
  });

  const addMovie = async () => {
    // Check for empty fields and set validation status
    const newValidation = {
      title: form.title !== '',
      year: form.year !== '',
      image: form.image !== '',
      description: form.description !== '',
    };
    setValidation(newValidation);

    // Check if all fields are valid
    if (Object.values(newValidation).every(valid => valid)) {
      setLoader(true);
      try {
        await addDoc(moviesRef, form);
        swal({
          text: 'Successfully added',
          icon: 'success',
          buttons: false,
          timer: 3000,
        });
        history('/')
        SetForm({
          title: '',
          year: '',
          image: '',
          description: '',
        })
      } catch (err) {
        swal({
          text: err,
          icon: 'error',
          buttons: false,
          timer: 3000,
        });
      }
      setLoader(false);
    }
  };


  let tokeen = localStorage.getItem('userUID') ?? '';
  let isLoggedIn = false;

  if (tokeen !== '') {

    isLoggedIn = true;

  } else {

    isLoggedIn = false;

  }




  return (
    <div>


      <section className="text-gray-600 body-font relative otherBg">
        {isLoggedIn ?
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-col text-center w-full mb-5">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                Add Movie
              </h1>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full md:w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className={`leading-7 text-sm ${!validation.title ? 'text-red-500' : 'text-gray-300'
                        }`}
                    >
                      Name<span className='text-purple-500'>*</span>
                    </label>
                    <input
                      value={form.title}
                      onChange={e => SetForm({ ...form, title: e.target.value })}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Title"
                      className={`w-full bg-white-100 bg-opacity-50 rounded border ${!validation.title ? 'border-red-500' : 'border-gray-300'
                        } focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                    />
                  </div>
                </div>
                <div className="p-2 w-full md:w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="year"
                      className={`leading-7 text-sm ${!validation.year ? 'text-red-500' : 'text-gray-300'
                        }`}
                    >
                      Year<span className='text-purple-500'>*</span>
                    </label>
                    <input
                      value={form.year}
                      onChange={e => SetForm({ ...form, year: e.target.value })}
                      type="number"
                      id="year"
                      name="year"
                      placeholder="Enter Year"
                      className={`w-full bg-white-100 bg-opacity-50 rounded border ${!validation.year ? 'border-red-500' : 'border-gray-300'
                        } focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="image"
                      className={`leading-7 text-sm ${!validation.image ? 'text-red-500' : 'text-gray-300'
                        }`}
                    >
                      Image<span className='text-purple-500'>*</span>
                    </label>
                    <input
                      value={form.image}
                      onChange={e => SetForm({ ...form, image: e.target.value })}
                      id="image"
                      name="image"
                      placeholder="Enter Image Link"
                      className={`w-full bg-white-100 bg-opacity-50 rounded border ${!validation.image ? 'border-red-500' : 'border-gray-300'
                        } focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className={`leading-7 text-sm ${!validation.description ? 'text-red-500' : 'text-gray-300'
                        }`}
                    >
                      Description<span className='text-purple-500'>*</span>
                    </label>
                    <textarea
                      value={form.description}
                      onChange={e =>
                        SetForm({ ...form, description: e.target.value })
                      }
                      id="message"
                      name="message"
                      placeholder="About Movie"
                      className={`w-full bg-white-100 bg-opacity-50 rounded border ${!validation.description ? 'border-red-500' : 'border-gray-300'
                        } focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`}
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    onClick={addMovie}
                    className="flex mx-auto text-white bg-purple-600 border-0 py-2 px-8 focus:outline-none hover:bg-purple-700 active:bg-purple-900 transition-all duration-200 rounded text-lg"
                  >
                    {loader ? <Spninner /> : 'ADD'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          : <p className='text-center text-lg mt-20 text-white mx-6'>Please Signup or Login your account to add Movie <br /> <br /> <span className='text-sm'>Register your account <Link className='text-purple-600 underline' to={'/signup'}>Now</Link> </span></p>
        }
      </section>
    </div>
  );
};

export default AddMovie;


