import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { database, UserCollection } from '../firebase/firebase';
import swal from 'sweetalert';
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const Signup = () => {
  const  navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  document.title = "ScreenCraze | Signup"
  const [loader, setLoader] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleSubmit = async () => {
    setLoader(true);
    // Check if required fields are empty
    if (!form.name || !form.email || !form.password) {
      setLoader(false);
      // Set error state for empty fields
      setErrors({
        name: !form.name,
        email: !form.email,
        password: !form.password,
      });
      return;
    }
  
    createUserWithEmailAndPassword(database, form.email, form.password)
      .then(async val => {
        
        const userData = UserCollection;
        const salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(form.password, salt);
        await addDoc(userData, { name: form.name, password: hash, email: form.email }).then(val => {
          
          swal({
            text: "Sign Up successfully",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setLoader(false);
          navigate('/login');
        }).catch(err => {
          if (err.code === "auth/email-already-in-use") {
            swal({
              text: "Email already in use. Please choose a different email.",
              icon: "error",
              buttons: false,
              timer: 3000,
            });
          } else {
            swal({
              text: "Failed to signup",
              icon: "error",
              buttons: false,
              timer: 3000,
            });
          }
          setLoader(false);
        });
      })
      .catch(err => {
        swal({
          text: 'User already exist !', // Display Firebase authentication error message
          icon: "error",
          buttons: false,
          timer: 3000,
        });
        setLoader(false);
      });
      setForm({
        name: "",
    email: "",
    password: "",
      })
  };
  
  

  return (
    <>
    <section className="text-gray-600 body-font relative flex justify-center min-h-screen otherBg">
      <div className="container md:pt-20 pt-5 md:mx-auto mx-3">
        <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto md:mr-auto w-full md:py-8 mt-8 md:mt-0">
          <h1 className="text-3xl font-bold text-white my-8 text-center">Sign Up</h1>

          <div className={`relative mb-4 ${errors.name ? 'text-red-500' : 'text-white'}`}>
            <label htmlFor="name" className={`${errors.name ? 'text-rose-500' : 'text-white'}leading-7 text-sm `}>
              Name<span className="text-purple-500">*</span>
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className={`w-full bg-white rounded border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
            />
          </div>
          <div className={`relative mb-4 ${errors.email ? 'text-red-500' : 'text-white'}`}>
            <label htmlFor="email" className={` ${errors.email ? 'text-rose-500' : 'text-white'}leading-7 text-sm `}>
              Email<span className="text-purple-500">*</span>
            </label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              className={`w-full bg-white rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
            />
          </div>
          <div className={`relative mb-4 ${errors.password ? 'text-red-500' : 'text-white'}`}>
            <label htmlFor="password" className={` ${errors.password ? 'text-rose-500' : 'text-white'}leading-7 text-sm `}>
              Password<span className="text-purple-500">*</span>
            </label>
            <div className="relative">
              <input
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                className={`w-full bg-white rounded border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 pr-10 leading-8 transition-colors duration-200 ease-in-out`}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 9a9 9 0 0111.95-8.59c.38.36.7.77.94 1.21M21 21l-8-8M19 13a9 9 0 10-9-9"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 9a9 9 0 0111.95-8.59c.38.36.7.77.94 1.21M21 21l-8-8M19 13a9 9 0 10-9-9"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mx-auto text-white bg-purple-600 border-0 py-2 px-5 focus:outline-none hover:bg-purple-700 active:bg-purple-900 transition-all duration-200 rounded text-lg"
          >
            {loader ? <TailSpin color="white" width={54} height={27} /> : 'Submit'}
          </button>

          <div className="text-center text-gray-300 text-xs mt-5">
            <p>Already have an account ?</p>
            <Link className="underline text-purple-500 inline" to={'/login'}>
              Login
            </Link>{' '}
            now.
          </div>
        </div>
      </div>
    </section>
  </>
  );
};

export default Signup;
