import React from 'react';
import Layout from '../components/Layout/Layout';
import BlogList from '../components/BlogList/BlogList';

const BlogPage: React.FC = () => {
  return (
    <Layout>
      <BlogList />
    </Layout>
  );
};

export default BlogPage;