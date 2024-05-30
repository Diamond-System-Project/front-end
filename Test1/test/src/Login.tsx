import React, { useState } from "react";
import Register from "./Register";
import { CSSTransition } from 'react-transition-group';
import './style.css' 

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      alert("Sign in successful!");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="transition-container">
            <CSSTransition
          in={!isRegister}
          timeout={300}
          classNames="form"
          unmountOnExit
        >
          <>
            <div className="flex justify-center">
              <svg
                className="w-12 h-12 text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-9h-3v-2h3V7h2v4h3v2h-3v4h-2v-4z" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Sign in to your account
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="block ml-2 text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="w-5 h-5 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-2 text-sm text-gray-500">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <svg
                  className="w-5 h-5 mr-2"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.38 12.56c0-.78-.07-1.53-.19-2.26H12v4.28h5.84c-.25 1.36-1 2.51-2.13 3.28v2.72h3.43c2.01-1.85 3.18-4.58 3.18-7.82z" />
                  <path d="M12 23c3.11 0 5.73-1.04 7.64-2.79l-3.43-2.72c-.95.64-2.15 1.03-3.46 1.03-2.66 0-4.91-1.8-5.71-4.22H3.07v2.74C4.98 20.44 8.23 23 12 23z" />
                  <path d="M6.29 14.31A5.957 5.957 0 015.63 12c0-.81.14-1.58.41-2.31V6.95H3.07A9.938 9.938 0 002 12c0 1.67.4 3.24 1.07 4.64l3.22-2.33z" />
                  <path d="M12 4.67c1.68 0 3.18.58 4.37 1.71l3.28-3.28C17.72 1.81 15.1 1 12 1 8.23 1 4.98 3.56 3.07 7.05l3.34 2.74C7.09 7.61 9.34 4.67 12 4.67z" />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <svg
                  className="w-5 h-5 mr-2"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.799 8.207 11.387.6.11.82-.262.82-.581 0-.287-.011-1.244-.017-2.25-3.338.726-4.042-1.44-4.042-1.44-.546-1.385-1.334-1.755-1.334-1.755-1.091-.745.082-.73.082-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.305 3.492.998.108-.774.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.932 0-1.311.469-2.383 1.236-3.222-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.956-.266 1.981-.398 3.001-.403 1.018.005 2.044.137 3.001.403 2.292-1.553 3.298-1.23 3.298-1.23.655 1.652.243 2.873.119 3.176.77.839 1.236 1.911 1.236 3.222 0 4.61-2.804 5.628-5.475 5.92.43.37.824 1.1.824 2.218 0 1.602-.014 2.896-.014 3.287 0 .321.217.696.825.578C20.566 21.798 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>
            <div className="flex items-center justify-center mt-4">
              <p className="text-sm text-gray-600">
                Not a member?{" "}
                <button
                  className="font-medium text-blue-600 hover:text-blue-500"
                  onClick={() => setIsRegister(true)}
                >
                  Register
                </button>
              </p>
            </div>
          </>
          </CSSTransition>
        </div>
      
        <CSSTransition
          in={isRegister}
          timeout={300}
          classNames="form"
          unmountOnExit
        >
          <div>
            <Register setIsRegister={setIsRegister} />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Login;
