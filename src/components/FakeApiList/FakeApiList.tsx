import React, { useEffect, useState } from 'react';
import { List, Card, Pagination, Spin } from 'antd';
import { fakeApi } from '../../services/fakeApi';
import { FakeApiPost, FakeApiPagination } from '../../types/FakeApiData';
import { NotificationManager } from '../Notification/NotificationManager';

const FakeApiList: React.FC = () => {
  const [posts, setPosts] = useState<FakeApiPost[]>([]);
  const [pagination, setPagination] = useState<FakeApiPagination>({
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalCount: 0
  });
  const [loading, setLoading] = useState<boolean>(false);
  
  // Загрузка постов при монтировании компонента и изменении страницы
  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const response = await fakeApi.getPosts(page);
      setPosts(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching posts:', error);
      NotificationManager.error({
        message: 'Ошибка',
        description: 'Не удалось загрузить данные из FakeAPI'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Загружаем данные при первом рендере
  useEffect(() => {
    fetchPosts(1);
  }, []);
  
  // Обработчик изменения страницы
  const handlePageChange = (page: number) => {
    fetchPosts(page);
  };
  
  return (
    <div>
      <h1>Данные из FakeAPI</h1>
      
      <Spin spinning={loading}>
        {posts.length > 0 ? (
          <>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={posts}
              renderItem={(post) => (
                <List.Item key={post.id}>
                  <Card title={post.title}>
                    <p>{post.body}</p>
                    <p><strong>ID пользователя:</strong> {post.userId}</p>
                    <p><strong>ID поста:</strong> {post.id}</p>
                  </Card>
                </List.Item>
              )}
            />
            
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Pagination
                current={pagination.currentPage}
                pageSize={pagination.pageSize}
                total={pagination.totalCount}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </>
        ) : !loading && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p>Данные не найдены.</p>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default FakeApiList;