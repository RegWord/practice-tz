import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import BlogCreatePage from './pages/BlogCreatePage';
import BlogEditPage from './pages/BlogEditPage';
import FakeApiPage from './pages/FakeApiPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/create" element={<BlogCreatePage />} />
      <Route path="/blog/:id" element={<BlogDetailPage />} />
      <Route path="/blog/:id/edit" element={<BlogEditPage />} />
      <Route path="/fake-api" element={<FakeApiPage />} />
      <Route path="/" element={<Navigate to="/blog" replace />} />
      <Route path="*" element={<Navigate to="/blog" replace />} />
    </Routes>
  );
};

export default AppRoutes;