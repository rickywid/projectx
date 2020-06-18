import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Form,
    Input,
    Tooltip,
    Checkbox,
    Button,
    Divider
} from 'antd';
import { QuestionCircleOutlined, GithubOutlined } from '@ant-design/icons';
import AuthService from '../../lib/authService';
import Placeholder from '../../lib/placeholders';
import Logo from  '../../assets/monkey.png';

function App() {

    const [form] = Form.useForm();
    const [displayError, setDisplayError] = useState(false);

    const onFinish = async (values: any) => {
        const api = new AuthService();
        const placeholder = new Placeholder();
        const form = new FormData();
        const { username, email, password } = values;

        form.append('username', username);
        form.append('password', password);
        form.append('email', email);
        form.append('profile_img', placeholder.user());

        const res = await api.signup(form);

        if (res.status === 200) {
            const user = await res.json();
            localStorage.setItem('userID', user.id)
            window.location.replace("http://localhost:3000");
        } else {
            const err = await res.json();
            setDisplayError(err.message)
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-inner">
                <img style={{height: '50px', marginBottom: '20px'}} src={Logo} alt="logo"/>
                <h2>Sign Up</h2>
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
                                message: 'Required',
                            },
                            {
                                required: true,
                                message: 'Required',
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
                                message: 'Required',
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
                                message: 'Required',
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
                                message: 'Required',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('Passwords do not match'));
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
                                validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Required'))),
                            },
                        ]}
                    >
                        <Checkbox>
                            I have read and understand the
                <a href="/terms"> rules</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Sign up
                        </Button>
                        <p className="error-msg">{displayError}</p>
                        <small className="helper-link">Already have an account? <Link to="/login"><strong>Log In</strong></Link></small>
                    </Form.Item>
                </Form>
                <Divider />
        <Button
          type="primary"
          icon={<GithubOutlined />}
          className="github-login-btn"
          onClick={() => window.open(`http://localhost:5000/api/auth/github`, '_self')}
        >
          Sign Up with Github
            </Button>
            </div>
        </div>
    );
}

export default App;




