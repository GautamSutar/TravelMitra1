import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/login`, {
        email,
        password,
      });

      // Store JWT token in session storage
      const token = response.data.token;
      sessionStorage.setItem('token', token);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome to Travel Mitra!',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#27ED64',
      });

      setError('');
      navigate('/');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: `${err.response?.data?.message || 'Server error'}, Please try again`,
        confirmButtonText: 'Retry',
        confirmButtonColor: '#FF5733',
      });
      setMessage('');
    }
  };

  return (
    <section className="login-container bg-gray-50 min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="log-head-grad font-cursive flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Get Login For Better Experience
        </Link>
        <div className="w-full max-w-md rounded-lg shadow-2xl bg-white p-6 space-y-4 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Sign in
            </button>
            <p className="text-center text-sm font-semibold text-gray-700">
              Don’t have an account yet?{' '}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {message && <p className="text-green-500 text-center mt-4">{message}</p>}
        </div>
      </div>
    </section>
  );
};

export default Login;
