import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-center p-4 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-300 dark:bg-yellow-300 opacity-30 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] bg-pink-300 dark:bg-yellow-500 opacity-30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-100px] left-[50%] w-[400px] h-[400px] bg-blue-300 dark:bg-yellow-200 opacity-30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-yellow-400 mb-6"
      >
        Welcome to Task Manager App
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mb-8"
      >
        Organize your work efficiently, manage your tasks visually with drag and
        drop. Start creating your own Kanban board today!
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Link
          to="/board"
          className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg hover:bg-indigo-700 transition dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500"
        >
          Go to Board
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
