import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { UserCollection, database } from '../firebase/firebase';
import bcrypt from 'bcryptjs';
import { getDocs, query, where } from 'firebase/firestore';
import { AppState } from '../App';

const Login = () => {
  document.title = "ScreenCraze | Login"

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const useAppState = useContext(AppState);
  const history = useNavigate();
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const loginHandle = async () => {
    setLoader(true);

    if (!form.email || !form.password) {
      setLoader(false);
      setErrors({
        email: !form.email,
        password: !form.password,
      });
      return;
    }

    const quer = query(UserCollection, where('email', '==', form.email));
    const querySnap = await getDocs(quer);

    if (querySnap.empty) {
      // No user with the provided email exists
      setLoader(false);
      swal({
        text: "User does not exist. Please sign up first.",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
      return;
    }

    // If we have reached this point, a user with the provided email exists
    querySnap.forEach((userDoc) => {
      const userData = userDoc.data();
      const isUser = bcrypt.compareSync(form.password, userData.password);

      if (isUser) {
        signInWithEmailAndPassword(database, form.email, form.password)
          .then((response) => {
            localStorage.setItem('userUID', response.user.uid);
            console.log(response.user.uid);
            swal({
              text: "Sign In successfully",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            useAppState.setLogin(true);
            useAppState.setUserName(userData.name);
            history('/');
          })
          .catch((error) => {
            swal({
              text: "An error occurred during login.",
              icon: "error",
              buttons: false,
              timer: 3000,
            });
          });
      } else {
        swal({
          text: "Invalid Email or Password",
          icon: "error",
          buttons: false,
          timer: 3000,
        });
      }

      setLoader(false);
      setForm({
        email: "",
        password: "",
      });
    });
  };


  return (
    <>
    <section className="text-gray-600 body-font relative flex otherBg justify-center min-h-screen">
      <div className="container pt-20 md:mx-auto mx-3">
        <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto md:mr-auto w-full md:py-8 mt-8 md:mt-0">
          <h1 className="text-3xl font-bold text-white my-8 text-center">Login</h1>
          <div className={`relative mb-4 ${errors.email ? 'text-red-500' : 'text-white'}`}>
            <label htmlFor="email" className={`leading-7 text-sm ${errors.email ? 'text-rose-500' : 'text-white'}`}>
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
            <label htmlFor="password" className={`leading-7 text-sm ${errors.password ? 'text-rose-500' : 'text-white'}`}>
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
            onClick={loginHandle}
            className="mx-auto text-white bg-purple-600 border-0 py-2 px-5 focus:outline-none hover:bg-purple-700 active:bg-purple-900 transition-all duration-200 rounded text-lg"
          >
            {loader ? <TailSpin color="white" width={45} height={28} /> : 'Login'}
          </button>

          <div className="text-center text-gray-300 text-xs mt-5">
            <p>Don't have an account ?</p>
            <Link className="underline text-purple-500 inline" to={'/signup'}>
              Signup
            </Link>{' '}
            now.
          </div>
        </div>
      </div>
    </section>
  </>
  );
};

export default Login;
