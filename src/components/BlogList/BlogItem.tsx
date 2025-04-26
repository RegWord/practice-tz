import React from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Blog } from '../../types/Blog';

interface BlogItemProps {
  blog: Blog;
}

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
  const { id, title, text } = blog;
  
  // Обрезаем текст, если он слишком длинный
  const truncatedText = text.length > 150 ? `${text.substring(0, 150)}...` : text;
  
  return (
    <Card
      title={title}
      style={{ marginBottom: 16 }}
      extra={
        <Link to={`/blog/${id}`}>
          <Button type="primary">Читать полностью</Button>
        </Link>
      }
    >
      <p>{truncatedText}</p>
    </Card>
  );
};

export default BlogItem;
