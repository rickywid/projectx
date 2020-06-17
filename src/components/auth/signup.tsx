import React, { useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Checkbox,
  Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import AuthService from '../../lib/authService';

function App() {

  const [form] = Form.useForm();
  const [displayError, setDisplayError] = useState(false);

  const onFinish = async (values: any) => {
    const api = new AuthService();
    const form = new FormData();
    const { username, email, password } = values;

    form.append('username', username);
    form.append('password', password);
    form.append('email', email);
    
    const res = await api.signup(form);

    if(res.status === 200) {
        const user = await res.json();
        localStorage.setItem('userID', user.id)
        window.location.replace("http://localhost:3000");
    } else {
        const err = await res.json();
        setDisplayError(err.message)
    }
  };

  return (
      <div>
          {displayError}
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            scrollToFirstError
            >
            <Form.Item
            name="email"
            label="E-mail"
            rules={[
                {
                type: 'email',
                message: 'The input is not valid E-mail!',
                },
                {
                required: true,
                message: 'Please input your E-mail!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            name="username"
            label={
                (
                <span>
                    Username&nbsp;
                    <Tooltip title="What do you want others to call you?">
                    <QuestionCircleOutlined />
                    </Tooltip>
                </span>
                )
            }
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            name="password"
            label="Password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            hasFeedback
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
                {
                required: true,
                message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
                }),
            ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
                {
                validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
                },
            ]}
            >
            <Checkbox>
                I have read and understand the
                <a href="/terms"> rules</a>
            </Checkbox>
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="form-signup-button">
                Sign up
            </Button>
            </Form.Item>
            </Form>
            <button onClick={() => window.open(`http://localhost:5000/api/auth/github`, '_self')}>Github</button>
      </div>
  );
}

export default App;



