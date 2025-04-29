import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Layout from './layouts/Layout';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import Board from './pages/Board';

const App = () => {
  const [columns, setColumns] = useState({
    todo: {
      name: 'Todo',
      items: [
        {
          id: '1',
          title: 'Learn Drag and Drop',
          description: 'Understand how react-dnd works.',
          priority: 'high',
          dueDate: '2025-05-01',
        },
        {
          id: '2',
          title: 'Setup Kanban Layout',
          description: 'Create 4 columns (Todo, In Progress, Review, Done).',
          priority: 'medium',
          dueDate: '2025-05-03',
        },
      ],
    },
    inProgress: {
      name: 'In Progress',
      items: [
        {
          id: '3',
          title: 'Build Board UI',
          description: 'Create responsive, draggable columns.',
          priority: 'high',
          dueDate: '2025-05-05',
        },
      ],
    },
    review: {
      name: 'Review',
      items: [
        {
          id: '4',
          title: 'Code Review Tasks',
          description: 'Review DnD implementation with teammates.',
          priority: 'medium',
          dueDate: '2025-02-07',
        },
      ],
    },
    done: {
      name: 'Done',
      items: [
        {
          id: '5',
          title: 'Deploy App',
          description: 'Push final build to Netlify!',
          priority: 'low',
          dueDate: '2025-05-10',
        },
      ],
    },
  });

  return (
    <div className="min-h-screen">
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="board"
            element={
              <PrivateRoute>
                <Board columns={columns} setColumns={setColumns} />
              </PrivateRoute>
            }
          />
          <Route
            path="about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
