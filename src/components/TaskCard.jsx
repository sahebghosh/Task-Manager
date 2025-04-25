import React from 'react';

const TaskCard = ({ title, description, isCompleted, onToggle }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 mt-1">{description}</p>
      <span
        className={`inline-block mt-3 text-sm font-medium px-2 py-1 rounded 
          ${
            isCompleted
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
      >
        {isCompleted ? 'Completed' : 'Pending'}
      </span>
      <button
        onClick={onToggle}
        className="block mt-4 text-sm text-blue-600 hover:underline focus:outline-none"
      >
        Mark as {isCompleted ? 'Pending' : 'Completed'}
      </button>
    </div>
  );
};

export default TaskCard;
