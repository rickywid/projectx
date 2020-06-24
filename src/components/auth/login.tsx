import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Divider
} from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons';
import AuthService from '../../lib/authService';
import '../../styles/login.scss';
import Logo from  '../../assets/monkey.png';

interface IFormValues {
  username: string;
  password: string;
}

function App() {

  const [form] = Form.useForm();
  const [error, setError] = useState<boolean>(false)

  const onFinish = async (values: IFormValues) => {
    const api = new AuthService();
    const form = new FormData();
    const { username, password }: IFormValues = values;

    form.append('username', username);
    form.append('password', password);

    const res = await api.login(form);

    if (res.status === 200) {
      const user = await res.json();
      localStorage.setItem('userID', user.id);
      window.location.replace(process.env.REACT_APP_HOSTNAME as string);

      return;
    }

    setError(true);

  };

  return (
    <div className="login-wrapper">
      <div className="login-inner">
        <img style={{height: '50px', marginBottom: '20px'}} src={Logo} alt="logo"/>
        <h2>Log in</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish as any}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <p className="error-msg">{error ? 'Username or password is incorrect' : ''}</p>
            <small className="helper-link">Don't have an account? <Link to="/signup"><strong>Sign Up</strong></Link></small>
          </Form.Item>
        </Form>
        <Divider />
        <Button
          type="primary"
          icon={<GithubOutlined />}
          className="github-login-btn"
          onClick={() => window.open(`${process.env.REACT_APP_SERVER}/auth/github`, '_self')}
        >
          Log In with Github
            </Button>
      </div>
    </div>
  );
}

export default App;



