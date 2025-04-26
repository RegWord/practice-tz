import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import BlogForm from '../components/BlogForm/BlogForm';
import { blogApi } from '../services/blogApi';
import { NotificationManager } from '../components/Notification/NotificationManager';
import { Blog } from '../types/Blog';
import { Spin } from 'antd';

const BlogEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blogId = parseInt(id || '0', 10);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchBlog();
  }, [blogId]);
  
  const fetchBlog = async () => {
    setLoading(true);
    try {
      const blogData = await blogApi.getBlogById(blogId);
      setBlog(blogData);
      if (!blogData) {
        NotificationManager.error({
          message: 'Ошибка',
          description: 'Запись не найдена'
        });
        navigate('/blog');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      NotificationManager.error({
        message: 'Ошибка',
        description: 'Не удалось загрузить запись'
      });
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (values: Omit<Blog, 'id' | 'deleted'>) => {
    if (!blog) return;
    
    setSubmitting(true);
    try {
      const updatedBlog = await blogApi.updateBlog(blog.id, values);
      if (updatedBlog) {
        NotificationManager.success({
          message: 'Успех',
          description: 'Запись блога успешно обновлена'
        });
        navigate(`/blog/${blog.id}`);
      } else {
        NotificationManager.error({
          message: 'Ошибка',
          description: 'Не удалось обновить запись'
        });
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      NotificationManager.error({
        message: 'Ошибка',
        description: 'Не удалось обновить запись'
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <Spin size="large" />
      </Layout>
    );
  }
  
  if (!blog) {
    return (
      <Layout>
        <div>Запись не найдена</div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <h1>Редактирование записи</h1>
      <BlogForm initialValues={blog} onSubmit={handleSubmit} loading={submitting} />
    </Layout>
  );
};

export default BlogEditPage;
