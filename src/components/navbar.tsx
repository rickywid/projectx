import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import AuthService from '../lib/authService';
import '../styles/navbar.scss';
import Logo from '../assets/monkey.png';
const { Sider } = Layout;

interface Props {
  root: string;
  user: {username: string};
  signup: string;
  login: string;
  upload: string;
  isAuthenticated: boolean;
}

const NavBar = ({
  root, user, signup, login, upload, isAuthenticated
}: Props) => {
  const api = new AuthService();

  const onSignout = async () => {
    await api.signout(new FormData());
    localStorage.removeItem('userID');
    localStorage.removeItem('username');
    window.location.replace(process.env.REACT_APP_HOSTNAME as string);

  }

  const authMenu = () => (
    <Menu theme="light" mode="inline">
    <Menu.Item key="1">
      <Link className="user-nav-link" to={`/user/${user.username}`}>
        <span>
          {user.username}
        </span>
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to={`/${upload}`}>
        <span>{upload}</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="3">
      <button className="btn-signout" onClick={onSignout}>signout</button>
    </Menu.Item>
  </Menu>  
  )
  
  const unAuthMenu = () => (
    <Menu theme="light" mode="inline">
      <Menu.Item key="4">
        <Link to={`/${signup}`}>
          <span>Sign Up</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to={`/${login}`}>
          <span>Log In</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="6">
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
        <img src={Logo} alt="logo"/>
      </Link>
    </div>
    {isAuthenticated ? authMenu() : unAuthMenu()}
  </Sider>
  )
};

export default NavBar;
