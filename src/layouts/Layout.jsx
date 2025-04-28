import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
        {/* NAVBAR */}
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-tight">Task Manager</div>

          {/* Right controls */}
          <div className="flex items-center gap-4 relative">
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8">
              {['/', '/create', '/about'].map((path, i) => {
                const label = ['Home', 'Create Task', 'About'][i];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                      `text-lg transition-all duration-300 transform ${
                        isActive
                          ? 'text-yellow-300 font-bold scale-105'
                          : 'hover:text-yellow-200 hover:scale-105'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                );
              })}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-white text-indigo-600 px-3 py-1 rounded-full font-medium hover:bg-gray-200 transition"
              title="Toggle Dark Mode"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>

            {/* Hamburger Icon (Mobile only) */}
            <button
              className="md:hidden block"
              onClick={() => setMenuOpen(!menuOpen)}
              title="Menu"
            >
              ☰
            </button>

            {/* Dropdown Menu (Mobile) */}
            {menuOpen && (
              <div className="absolute right-0 top-14 z-50">
                <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg w-44 overflow-hidden">
                  <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                    {['/', '/create', '/about'].map((path, i) => {
                      const label = ['Home', 'Create Task', 'About'][i];
                      return (
                        <NavLink
                          key={path}
                          to={path}
                          end={path === '/'}
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) =>
                            `px-4 py-2 text-center transition-all duration-200 ${
                              isActive
                                ? 'bg-blue-100 dark:bg-gray-700 font-bold text-indigo-700 dark:text-yellow-300'
                                : 'hover:bg-blue-100 dark:hover:bg-gray-700 hover:scale-105'
                            }`
                          }
                        >
                          {label}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-grow p-6"
        >
          <Outlet />
        </motion.main>

        {/* FOOTER */}
        <footer className="bg-gray-800 dark:bg-gray-700 text-white p-4 text-center">
          © {new Date().getFullYear()} Task Manager App
        </footer>
      </div>
    </div>
  );
};

export default Layout;
