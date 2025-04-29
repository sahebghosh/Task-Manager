import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import { showSuccess } from '../utils/toastUtils';

const Board = ({ columns, setColumns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [error, setError] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewTask, setViewTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  if (!columns || Object.keys(columns).length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500 dark:text-gray-400">
        No tasks yet! Please add some tasks.
      </div>
    );
  }

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = Array.from(sourceColumn.items);
    const destItems = Array.from(destColumn.items);
    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  const handleOpenAddModal = (columnId) => {
    setSelectedColumnId(columnId);
    setEditingTaskId(null);
    setIsModalOpen(true);
    setNewTitle('');
    setNewDescription('');
    setNewPriority('medium');
    setNewDueDate('');
    setError('');
  };

  const handleOpenEditModal = (columnId, task) => {
    setSelectedColumnId(columnId);
    setEditingTaskId(task.id);
    setNewTitle(task.title);
    setNewDescription(task.description);
    setNewPriority(task.priority || 'medium');
    setNewDueDate(task.dueDate || '');
    setIsModalOpen(true);
  };

  const handleSaveTask = () => {
    if (!newTitle.trim()) {
      setError('Title is required');
      return;
    }

    if (editingTaskId) {
      // Editing existing task
      const updatedColumns = { ...columns };
      const columnItems = updatedColumns[selectedColumnId].items.map((task) =>
        task.id === editingTaskId
          ? {
              ...task,
              title: newTitle.trim(),
              description: newDescription.trim(),
              priority: newPriority,
              dueDate: newDueDate,
            }
          : task
      );
      updatedColumns[selectedColumnId].items = columnItems;
      setColumns(updatedColumns);
      showSuccess('Task updated successfully!');
    } else {
      // Adding new task
      const newTask = {
        id: Date.now().toString(),
        title: newTitle.trim(),
        description: newDescription.trim() || 'No description',
        priority: newPriority,
        dueDate: newDueDate,
      };

      const updatedColumn = {
        ...columns[selectedColumnId],
        items: [newTask, ...columns[selectedColumnId].items],
      };

      setColumns({
        ...columns,
        [selectedColumnId]: updatedColumn,
      });
      showSuccess('Task added successfully!');
    }

    setIsModalOpen(false);
    setEditingTaskId(null);
  };

  const confirmDeleteTask = () => {
    if (!taskToDelete) return;

    const { columnId, taskId } = taskToDelete;
    const updatedColumns = { ...columns };
    updatedColumns[columnId].items = updatedColumns[columnId].items.filter(
      (task) => task.id !== taskId
    );
    setColumns(updatedColumns);
    showSuccess('Task deleted successfully!');
    setTaskToDelete(null);
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 rounded px-1">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-2">
      <h1 className="text-3xl font-bold text-left mb-6 text-indigo-600 dark:text-yellow-400">
        Kanban Board
      </h1>

      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded focus:outline-none dark:bg-gray-700 dark:text-white text-sm"
        />
        <button
          onClick={() => setSearchQuery('')}
          className="px-3 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm"
        >
          Clear Search
        </button>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="p-2 border rounded focus:outline-none dark:bg-gray-700 dark:text-white text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          <option value="all">Filter by Priority</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      {/* DragDrop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-md min-h-[500px] flex flex-col transition ${
                    snapshot.isDraggingOver
                      ? 'bg-indigo-100 dark:bg-indigo-800'
                      : ''
                  }`}
                >
                  <h2 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-white">
                    {column.name}
                  </h2>

                  <div className="flex flex-col gap-4 mb-4">
                    {column.items
                      .filter(
                        (task) =>
                          task.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) &&
                          (priorityFilter === 'all' ||
                            task.priority === priorityFilter)
                      )
                      .sort((a, b) => {
                        const priorityOrder = { high: 1, medium: 2, low: 3 };
                        return (
                          priorityOrder[a.priority] - priorityOrder[b.priority]
                        );
                      })
                      .map((task, index) => {
                        const isOverdue = task.dueDate && task.dueDate < today;
                        return (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white dark:bg-gray-700 p-4 rounded shadow hover:scale-105 transform transition-all duration-300 min-h-[160px] ${
                                  snapshot.isDragging
                                    ? 'scale-105 shadow-2xl z-50'
                                    : ''
                                } ${isOverdue ? 'border border-red-400' : ''}`}
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <h3 className="font-bold">
                                    {highlightMatch(task.title, searchQuery)}
                                  </h3>
                                  <span
                                    className={`px-2 py-1 rounded text-xs font-bold capitalize ${
                                      task.priority === 'high'
                                        ? 'bg-red-500 text-white'
                                        : task.priority === 'medium'
                                        ? 'bg-yellow-400 text-black'
                                        : 'bg-green-500 text-white'
                                    }`}
                                  >
                                    {task.priority}
                                  </span>
                                </div>

                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 overflow-hidden text-ellipsis mb-2">
                                  {highlightMatch(
                                    task.description,
                                    searchQuery
                                  )}
                                </p>

                                {task.description.length > 80 && (
                                  <button
                                    onClick={() => setViewTask(task)}
                                    className="text-blue-500 text-xs hover:underline"
                                  >
                                    Read More
                                  </button>
                                )}

                                {task.dueDate && (
                                  <p
                                    className={`text-xs mt-2 ${
                                      isOverdue
                                        ? 'text-red-500 font-bold'
                                        : 'text-gray-500 dark:text-gray-400'
                                    }`}
                                  >
                                    Due: {task.dueDate}
                                  </p>
                                )}

                                {/* Edit & Delete buttons */}
                                <div className="flex justify-end gap-2 mt-2">
                                  <button
                                    onClick={() =>
                                      handleOpenEditModal(columnId, task)
                                    }
                                    className="text-blue-500 hover:scale-110 transition"
                                    title="Edit Task"
                                  >
                                    <Edit3 size={18} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      setTaskToDelete({
                                        columnId,
                                        taskId: task.id,
                                      })
                                    }
                                    className="text-red-500 hover:scale-110 transition"
                                    title="Delete Task"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>

                  <button
                    onClick={() => handleOpenAddModal(columnId)}
                    className="mt-auto flex items-center justify-center gap-2 text-sm text-indigo-600 dark:text-yellow-500 font-semibold hover:underline"
                  >
                    <Plus size={18} /> Add Task
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Add / Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">
          {editingTaskId ? 'Edit Task' : 'Add New Task'}
        </h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value);
            if (error) setError('');
          }}
          className="w-full p-2 mb-4 border rounded focus:outline-none dark:bg-gray-700 dark:text-white"
          placeholder="Title *"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none dark:bg-gray-700 dark:text-white"
          placeholder="Description"
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none dark:bg-gray-700 dark:text-white"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleSaveTask}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          {editingTaskId ? 'Save Changes' : 'Add Task'}
        </button>
      </Modal>

      {/* Modal to view full description */}
      <Modal isOpen={!!viewTask} onClose={() => setViewTask(null)}>
        {viewTask && (
          <>
            <h2 className="text-2xl font-bold mb-4">{viewTask.title}</h2>
            <textarea
              value={viewTask.description}
              readOnly
              className="w-full h-48 p-2 border rounded resize-none dark:bg-gray-700 dark:text-white focus:outline-none"
            />
          </>
        )}
      </Modal>
      <Modal isOpen={!!taskToDelete} onClose={() => setTaskToDelete(null)}>
        <h2 className="text-2xl font-bold mb-4 text-center">Delete Task</h2>
        <p className="text-center mb-6 text-gray-700 dark:text-gray-300">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={confirmDeleteTask}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setTaskToDelete(null)}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Board;
