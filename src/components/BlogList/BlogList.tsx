import React, { useEffect, useState } from 'react';
import { List, Pagination, Button, Spin } from 'antd';
import { Link } from 'react-router-dom';
import BlogItem from './BlogItem';
import { blogApi } from '../../services/blogApi';
import { Blog } from '../../types/Blog';
import { NotificationManager } from '../Notification/NotificationManager';

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 10;
  
  // Загрузка блогов при изменении страницы
  const fetchBlogs = async (page: number) => {
    setLoading(true);
    try {
      const { blogs, total } = await blogApi.getBlogs(page, pageSize);
      setBlogs(blogs);
      setTotal(total);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      NotificationManager.error({
        message: 'Ошибка',
        description: 'Не удалось загрузить записи блога.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);
  
  // Обработчик изменения страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Записи блога</h1>
        <Link to="/blog/create">
          <Button type="primary">Создать запись</Button>
        </Link>
      </div>
      
      <Spin spinning={loading}>
        {blogs.length > 0 ? (
          <>
            <List
              dataSource={blogs}
              renderItem={(blog) => (
                <List.Item key={blog.id}>
                  <BlogItem blog={blog} />
                </List.Item>
              )}
            />
            
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p>Записей не найдено.</p>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default BlogList;