import React from 'react';
import Layout from '../components/Layout/Layout';
import FakeApiList from '../components/FakeApiList/FakeApiList';

const FakeApiPage: React.FC = () => {
  return (
    <Layout>
      <FakeApiList />
    </Layout>
  );
};

export default FakeApiPage;