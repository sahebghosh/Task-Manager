import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Layout from './layouts/Layout';
import { showSuccess, showError } from './utils/toastUtils';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    showSuccess('Task added successfully!');
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    showSuccess('Task deleted successfully!');
  };

  const editTask = (taskId, updatedTitle, updatedDescription) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, title: updatedTitle, description: updatedDescription }
          : task
      )
    );
    showSuccess('Task updated successfully!');
  };

  const toggleTaskStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <div className="min-h-screen">
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Home
                tasks={tasks}
                toggleTaskStatus={toggleTaskStatus}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            }
          />
          <Route path="create" element={<CreateTask addTask={addTask} />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
