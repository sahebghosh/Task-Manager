import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';

const Home = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Learn React Fundamentals',
      description: 'Understand props, state, and component structure.',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Style using Tailwind CSS',
      description: 'Apply utility classes for layout and design.',
      isCompleted: true,
    },
    {
      id: 3,
      title: 'Build a dynamic UI',
      description: 'Use loops and conditional rendering.',
      isCompleted: false,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [error, setError] = useState({
    title: '',
    description: '',
  });

  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    const newErrors = {
      title: newTitle.trim() ? '' : 'Task title is required',
      description: newDescription.trim() ? '' : 'Task description is required',
    };

    if (newErrors.title || newErrors.description) {
      setError(newErrors);
      return;
    }

    const newTask = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      isCompleted: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTitle('');
    setNewDescription('');
    setError({ title: '', description: '' });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">
        Task Manager App
      </h1>

      {/* Add Task Form */}
      <form
        onSubmit={handleAddTask}
        className="mb-8 bg-white p-4 rounded shadow space-y-4"
      >
        <input
          type="text"
          placeholder="Task Title"
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value);
            if (error.title) setError((prev) => ({ ...prev, title: '' }));
          }}
          className={`w-full p-2 border rounded ${
            error.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {error.title && (
          <p className="text-red-500 text-xs mt-1">{error.title}</p>
        )}
        <textarea
          placeholder="Task Description"
          value={newDescription}
          onChange={(e) => {
            setNewDescription(e.target.value);
            if (error.description)
              setError((prev) => ({ ...prev, description: '' }));
          }}
          className={`w-full p-2 border rounded ${
            error.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {error.description && (
          <p className="text-red-500 text-xs mt-1">{error.description}</p>
        )}
        <button
          type="submit"
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-200"
        >
          Add Task
        </button>
      </form>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Pending
        </button>
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {tasks
          .filter((task) => {
            if (filter === 'completed') return task.isCompleted;
            if (filter === 'pending') return !task.isCompleted;
            return true;
          })
          .map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              isCompleted={task.isCompleted}
              onToggle={() => toggleTaskStatus(task.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
