import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Trash2, Edit3 } from 'lucide-react';
import Modal from '../components/Modal';

const Home = ({ tasks, toggleTaskStatus, deleteTask, editTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [filter, setFilter] = useState('all');

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    editTask(editingTaskId, editedTitle, editedDescription);
    setIsModalOpen(false);
    setEditingTaskId(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'pending') return !task.isCompleted;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto p-2">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600 dark:text-yellow-400">
        All Tasks
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {['all', 'completed', 'pending'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full transition ${
              filter === f
                ? f === 'completed'
                  ? 'bg-green-500 text-white'
                  : f === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-indigo-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task Cards */}
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No tasks available!!
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-2">
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={`rounded-xl shadow-md p-6 transition ${
                  task.isCompleted
                    ? 'bg-green-100 dark:bg-green-700 text-gray-700 dark:text-white'
                    : 'bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{task.title}</h2>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      task.isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 text-white'
                    }`}
                  >
                    {task.isCompleted ? 'Completed' : 'Pending'}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {task.description}
                </p>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    title={
                      task.isCompleted ? 'Mark as Pending' : 'Mark as Completed'
                    }
                    className="text-green-600 dark:text-green-400 hover:scale-110 transition transform"
                  >
                    <CheckCircle size={22} />
                  </button>

                  <button
                    onClick={() => startEditing(task)}
                    title="Edit Task"
                    className="text-blue-600 dark:text-yellow-300 hover:scale-110 transition transform"
                  >
                    <Edit3 size={22} />
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    title="Delete Task"
                    className="text-red-500 hover:scale-110 transition transform"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal for Editing */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none"
          placeholder="Title"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none"
          placeholder="Description"
        />
        <button
          onClick={handleSaveEdit}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Save Changes
        </button>
      </Modal>
    </div>
  );
};

export default Home;
