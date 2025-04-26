import React from 'react';
import { Form, Input, Button } from 'antd';
import { Blog } from '../../types/Blog';

const { TextArea } = Input;

interface BlogFormProps {
  initialValues?: Partial<Blog>;
  onSubmit: (values: Omit<Blog, 'id' | 'deleted'>) => void;
  loading: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialValues, onSubmit, loading }) => {
  const [form] = Form.useForm();
  
  // Начальные значения формы
  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);
  
  // Обработчик отправки формы
  const handleSubmit = (values: Omit<Blog, 'id' | 'deleted'>) => {
    onSubmit(values);
  };
  
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        name="title"
        label="Заголовок"
        rules={[
          { required: true, message: 'Пожалуйста, введите заголовок' },
          { max: 100, message: 'Заголовок не должен превышать 100 символов' }
        ]}
      >
        <Input placeholder="Введите заголовок" />
      </Form.Item>
      
      <Form.Item
        name="text"
        label="Текст"
        rules={[
          { required: true, message: 'Пожалуйста, введите текст' }
        ]}
      >
        <TextArea rows={10} placeholder="Введите текст записи" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialValues?.id ? 'Сохранить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BlogForm;