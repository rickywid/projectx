import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import AuthService from '../lib/authService';
import '../styles/navbar.scss';
import Logo from '../assets/monkey.png';
const { Sider } = Layout;
const { SubMenu } = Menu;

interface Props {
  user: {username: string};
  isAuthenticated: boolean;
}

const NavBar = ({
  user, isAuthenticated
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
      <Link to={`/upload`}>
        <span>Upload</span>
      </Link>
    </Menu.Item>
    <SubMenu key="sub1" title="Tags">
      <Menu.Item key="34">
        <Link to={`/tag/technology`}>
            <span>Technology</span>
          </Link>
      </Menu.Item>
      <Menu.Item key="64">
        <Link to={`/tag/category`}>
              <span>Category</span>
            </Link>
      </Menu.Item>
    </SubMenu>
    <Menu.Item key="11">
      <button className="btn-signout" onClick={onSignout}>Signout</button>
    </Menu.Item>
  </Menu>  
  )
  
  const unAuthMenu = () => (
    <Menu theme="light" mode="inline">
      <Menu.Item key="5">
        <Link to={`/signup`}>
          <span>Sign Up</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to={`/login`}>
          <span>Log In</span>
        </Link>
      </Menu.Item>
    <SubMenu key="sub1" title="Tags">
      <Menu.Item key="76">
        <Link to={`/technology`}>
            <span>Technology</span>
          </Link>
      </Menu.Item>
      <Menu.Item key="57">
        <Link to={`/category`}>
              <span>Category</span>
            </Link>
      </Menu.Item>
    </SubMenu>
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
      <Link to="/">
        <img src={Logo} alt="logo"/>
      </Link>
    </div>
    {isAuthenticated ? authMenu() : unAuthMenu()}
  </Sider>
  )
};

export default NavBar;
