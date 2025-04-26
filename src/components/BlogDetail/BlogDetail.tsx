import React, { useEffect, useState } from 'react';
import { Typography, Button, Space, Divider, Spin, Popconfirm } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Blog } from '../../types/Blog';
import { blogApi } from '../../services/blogApi';
import { NotificationManager } from '../Notification/NotificationManager';

const { Title, Paragraph } = Typography;

interface BlogDetailProps {
  blogId: number;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blogId }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!blog) return;

    setDeleting(true);
    try {
      const success = await blogApi.deleteBlog(blog.id);
      if (success) {
        NotificationManager.success({
          message: 'Успех',
          description: 'Запись успешно удалена'
        });
        navigate('/blog');
      } else {
        NotificationManager.error({
          message: 'Ошибка',
          description: 'Не удалось удалить запись'
        });
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      NotificationManager.error({
        message: 'Ошибка',
        description: 'Не удалось удалить запись'
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  }

  if (!blog) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Запись не найдена</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} style={{ margin: 0, fontWeight: 600 }}>
          {blog.title}
        </Title>
        <Space>
          <Link to={`/blog/${blog.id}/edit`}>
            <Button type="primary">Редактировать</Button>
          </Link>
          <Popconfirm
            title="Удалить запись"
            description="Вы уверены, что хотите удалить эту запись?"
            onConfirm={handleDelete}
            okText="Да"
            cancelText="Нет"
          >
            <Button danger loading={deleting}>
              Удалить
            </Button>
          </Popconfirm>
        </Space>
      </div>

      <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.05)' }} />

      <Paragraph style={{ whiteSpace: 'pre-line', fontSize: '16px', lineHeight: '1.6' }}>
        {blog.text}
      </Paragraph>

      <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.05)' }} />

      <Link to="/blog">
        <Button type="default">Вернуться к списку</Button>
      </Link>
    </div>
  );
};

export default BlogDetail;