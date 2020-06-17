import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    Checkbox, 
  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthService from '../../lib/authService';


interface IFormValues {
    username: string;
    password:string;
  }

function App() {

  const [form] = Form.useForm();
  const [error, setError] = useState<boolean>(false)

  const onFinish = async (values:IFormValues) => {
    const api = new AuthService();
    const form = new FormData();
    const { username, password }: IFormValues = values;

    form.append('username', username);
    form.append('password', password);

    const res = await api.login(form);

    if(res.status === 200) {
      const user = await res.json();
      localStorage.setItem('userID', user.id);
      window.location.replace('http://localhost:3000/');
    }
    
    setError(true);

  };

  return (
      <div>
          <strong className="login-title">Log in</strong>
          <small>{error ? 'Username or password is incorrect': ''}</small>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish as any}
          >
            <Form.Item
              label="username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              label="password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link to="/reset-password">
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or
              <Link to="/signup">
                Register
              </Link>
            </Form.Item>
          </Form>
            <button onClick={() => window.open(`http://localhost:5000/api/auth/github`, '_self')}>Github</button>
      </div>
  );
}

export default App;



