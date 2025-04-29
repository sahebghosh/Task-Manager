import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-yellow-400 mb-6"
      >
        About This App
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mb-4"
      >
        Task Manager App is a simple yet powerful productivity tool where you
        can organize your work, manage tasks visually using a beautiful
        drag-and-drop Kanban Board, and stay on top of your priorities.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mb-8"
      >
        Built using React, TailwindCSS, Framer Motion, and React Beautiful DnD.
        Designed for ease of use and maximum productivity!
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Created by{' '}
          <span className="font-semibold text-indigo-600 dark:text-yellow-400">
            Saheb Ghosh
          </span>{' '}
        </p>
      </motion.div>
    </div>
  );
};

export default About;
