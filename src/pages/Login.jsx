import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    navigate('/board');
  };

  return (
    <div className="relative flex items-center justify-center min-h-[90vh] bg-gradient-to-tr from-blue-300 via-indigo-400 to-purple-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4 overflow-hidden">
      {/* Beautiful background blur effects */}
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000 bottom-10 right-10"></div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-xl p-10 max-w-md w-full z-10"
      >
        <h2 className="text-4xl font-bold text-center text-indigo-600 dark:text-yellow-400 mb-8">
          Welcome Back 🚀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              className="w-full p-3 rounded-full border focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-gray-700 dark:text-white dark:focus:ring-yellow-400"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              className="w-full p-3 rounded-full border focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-gray-700 dark:text-white dark:focus:ring-yellow-400"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-black font-bold py-3 rounded-full transition transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
