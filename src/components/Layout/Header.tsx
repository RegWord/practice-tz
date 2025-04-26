import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const location = useLocation();
  
  const getSelectedKey = (): string => {
    const path = location.pathname;
    if (path.includes('/blog')) return 'blog';
    if (path.includes('/fake-api')) return 'fake-api';
    return '';
  };
  
  return (
    <AntHeader style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
      <div className="logo" style={{ float: 'left', color: 'white', fontSize: '18px', marginRight: '20px' }}>
        Blog CRUD App
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[getSelectedKey()]}
        items={[
          {
            key: 'blog',
            label: <Link to="/blog">Блог</Link>
          },
          {
            key: 'fake-api',
            label: <Link to="/fake-api">FakeAPI</Link>
          }
        ]}
      />
    </AntHeader>
  );
};

export default Header;