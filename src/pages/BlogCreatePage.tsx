import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import BlogForm from '../components/BlogForm/BlogForm';
import { blogApi } from '../services/blogApi';
import { NotificationManager } from '../components/Notification/NotificationManager';
import { Blog } from '../types/Blog';

const BlogCreatePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (values: Omit<Blog, 'id' | 'deleted'>) => {
    setLoading(true);
    try {
      const newBlog = await blogApi.createBlog(values);
      NotificationManager.success({
        message: 'Успех',
        description: 'Запись блога успешно создана'
      });
      navigate(`/blog/${newBlog.id}`);
    } catch (error) {
      console.error('Error creating blog:', error);
      NotificationManager.error({
        message: 'Ошибка',
        description: 'Не удалось создать запись блога'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <h1>Создание новой записи</h1>
      <BlogForm onSubmit={handleSubmit} loading={loading} />
    </Layout>
  );
};

export default BlogCreatePage;