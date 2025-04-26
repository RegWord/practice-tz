import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import BlogDetail from '../components/BlogDetail/BlogDetail';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blogId = parseInt(id || '0', 10);
  
  return (
    <Layout>
      <BlogDetail blogId={blogId} />
    </Layout>
  );
};

export default BlogDetailPage;