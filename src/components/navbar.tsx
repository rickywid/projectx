import React from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import AuthService from '../lib/authService';
const { Sider } = Layout;

interface Props {
  root: string;
  username?: string;
  signup: string;
  login: string;
  upload: string;
  isAuthenticated: boolean;
}

const NavBar = ({
  root, username, signup, login, upload, isAuthenticated
}: Props) => {
  const api = new AuthService();

  const onSignout = async () => {
    await api.signout(new FormData());
    localStorage.removeItem('userID');
    window.location.replace("http://localhost:3000");    
  }

  const authMenu = () => (
    <Menu theme="light" mode="inline">
      
    <Menu.Item key="1">
      <VideoCameraOutlined />
      <Link to={`/user/${username}`}>
        <span>{username}</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="4">
      <UserOutlined />
      <Link to={`/${upload}`}>
        <span>{upload}</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="5">
      <UserOutlined />
      <Link to={`/users`}>
        <span>users</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="6">
      <UserOutlined />
      <button onClick={onSignout}>signout</button>
    </Menu.Item>
  </Menu>  
  )
  
  const unAuthMenu = () => (
    <Menu theme="light" mode="inline">
      <Menu.Item key="2">
        <UploadOutlined />
        <Link to={`/${signup}`}>
          <span>{signup}</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <UserOutlined />
        <Link to={`/${login}`}>
          <span>{login}</span>
        </Link>
      </Menu.Item>
    </Menu>  
  )

  return (
    <Sider
    breakpoint="lg"
    collapsedWidth="0"
    onBreakpoint={(broken) => {
      console.log(broken);
    }}
    onCollapse={(collapsed, type) => {
      console.log(collapsed, type);
    }}
    >
    <div className="logo">
      <Link to={root}>
        <span>Home</span>
      </Link>
    </div>
    {isAuthenticated ? authMenu() : unAuthMenu()}
  </Sider>
  )
};

export default NavBar;
