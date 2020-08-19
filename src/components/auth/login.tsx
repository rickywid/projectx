import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Divider } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import AuthService from "../../lib/authService";
import { siteName } from "../../lib/const";
import { SERVER, HOSTNAME } from "../../lib/env";
import "../../styles/login.scss";
import Logo from "../../assets/logo.png";

interface IFormValues {
  username: string;
  password: string;
}

function App() {
  useEffect(() => {
    document.title = `${siteName} - Log In`;
  });

  const [error, setError] = useState<string>("");

  const onFinish = async (values: IFormValues) => {
    const api = new AuthService();
    const form = new FormData();
    const { username, password }: IFormValues = values;

    form.append("username", username);
    form.append("password", password);

    try {
      const res = await api.login(form);
      const data = await res.json();

      if (data.authenticated) {
        window.location.replace(HOSTNAME as string);
      }

      setError(data.message);
    } catch (e) {
      console.log("called");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-inner">
        <img
          style={{ height: "28px", marginBottom: "20px" }}
          src={Logo}
          alt="logo"
        />
        <h2>Log In</h2>
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
                message: "Please input your Username!",
              },
            ]}
          >
            <Input size="large" placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input type="password" placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              data-testid="login-btn"
            >
              Log in
            </Button>
            <p className="error-msg" data-testid="login-error">
              {error ? error : ""}
            </p>
            <small className="helper-link">
              Don't have an account?{" "}
              <Link to="/signup">
                <strong>Sign Up</strong>
              </Link>
            </small>
            <small className="helper-link">
              <Link to="/faq">Experiencing login issues?</Link>
            </small>
          </Form.Item>
        </Form>
        <Divider />
        <Button
          type="primary"
          icon={<GithubOutlined />}
          className="github-login-btn"
          onClick={() => window.open(`${SERVER}/auth/github`, "_self")}
        >
          Log In with Github
        </Button>
      </div>
    </div>
  );
}

export default App;
