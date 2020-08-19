import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Tooltip, Checkbox, Button, Divider } from "antd";
import { QuestionCircleOutlined, GithubOutlined } from "@ant-design/icons";
import AuthService from "../../lib/authService";
import Placeholder from "../../lib/placeholders";
import { siteName } from "../../lib/const";
import { SERVER, HOSTNAME } from "../../lib/env";
import Logo from "../../assets/logo.png";

function App() {
  useEffect(() => {
    document.title = `${siteName} - Sign Up`;
  });

  const [form] = Form.useForm();
  const [displayError, setDisplayError] = useState<string>("");

  const onFinish = async (values: any) => {
    const api = new AuthService();
    const placeholder = new Placeholder();
    const form = new FormData();
    const { username, email, password } = values;

    form.append("username", username);
    form.append("password", password);
    form.append("email", email);
    form.append("profile_img", placeholder.user());

    try {
      const res = await api.signup(form);
      const data = await res.json();

      if (data.status === "ok") {
        localStorage.setItem("userID", data.id);
        window.location.replace(HOSTNAME as string);
      } else {
        setDisplayError(data.message);
      }
    } catch (e) {
      console.log(e);
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
        <h2>Sign Up</h2>
        <Form
          form={form}
          name="register"
          onFinish={onFinish as any}
          layout="vertical"
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Required",
              },
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="username"
            label={
              <span>
                Username&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: "Required",
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
                message: "Required",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Required",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("Passwords do not match"));
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
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Required")),
              },
            ]}
          >
            <Checkbox data-testid="signup-checkbox">
              I have read and understand the
              <Link to="/guidelines"> rules</Link>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              data-testid="signup-btn"
            >
              Sign up
            </Button>
            <p data-testid="error-msg" className="error-msg">
              {displayError ? displayError : ""}
            </p>
            <small className="helper-link">
              Already have an account?{" "}
              <Link to="/login">
                <strong>Log In</strong>
              </Link>
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
          Sign Up with Github
        </Button>
      </div>
    </div>
  );
}

export default App;
