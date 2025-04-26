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
    totalCount: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    setError(null); // Сбрасываем ошибку перед новым запросом
    try {
      console.log(`Fetching posts for page ${page}`); // Логирование для диагностики
      const response = await fakeApi.getPosts(page);
      console.log('API Response:', response); // Логирование ответа
      if (response && response.data && response.pagination) {
        setPosts(response.data);
        setPagination(response.pagination);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      setError(error.message || 'Не удалось загрузить данные из FakeAPI');
      NotificationManager.error({
        message: 'Ошибка',
        description: error.message || 'Не удалось загрузить данные из FakeAPI',
      });
    } finally {
      setLoading(false);
      console.log('Loading set to false'); // Логирование завершения загрузки
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchPosts(page);
  };

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>Данные из FakeAPI</h1>
      <Spin spinning={loading}>
        {error ? (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#ff4d4f' }}>
            <p>{error}</p>
            <button onClick={() => fetchPosts(1)} style={{ color: '#1890ff', cursor: 'pointer' }}>
              Попробовать снова
            </button>
          </div>
        ) : posts.length > 0 ? (
          <>
            <List
              grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
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
            <div style={{ textAlign: 'center', marginTop: 24 }}>
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