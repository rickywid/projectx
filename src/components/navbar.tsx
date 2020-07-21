import React from 'react';
import { Button, Divider, Menu, Dropdown } from 'antd';
import { Link } from "react-router-dom";
import Search from './searchBar'
import useWindowDimensions from '../hooks/windowSize';
import AuthService from '../lib/authService';
import { subscriberUrl } from '../lib/const';
import '../App.scss';
import '../styles/navbar.scss';
import '../styles/mobileNav.scss';
import { slide as MenuSlide } from 'react-burger-menu'

import Logo from '../assets/logo.png';

interface Props {
  user: {
    username: string,
    gh_avatar: string
  };
  isAuthenticated: boolean;
  loading: boolean;
}

const NavBar = ({
  user, isAuthenticated, loading
}: Props) => {
  const api = new AuthService();
  const { height, width } = useWindowDimensions();


  const onSignout = async () => {
    await api.signout(new FormData());
    window.location.replace(process.env.REACT_APP_HOSTNAME as string);

  }

  const menu = (
    <Menu>
      <li>
        <Link className="nav-user-profile-mobile" to={`/user/${user.username}`}>
          Profile
          </Link>
      </li>
      <li>
        <button className="btn-signout" onClick={onSignout}>Sign Out</button>
      </li>
    </Menu>
  );

  return loading ? <></> : (
    <nav>
      {width > 1110 ?
        <>
          <div>
            <Link to="/">
              <img style={{ width: '170px' }} src={Logo} alt="logo" />
            </Link>
          </div>
          <Search />
          <ul className="nav-item-desktop">
            <li>
              <Link to="/tag/technology">
                Technologies
                </Link>
            </li>
            <li>
              <Link to="/tag/category">
                Categories
                </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to={`/upload`}>
                    <Button className="upload-btn" type="primary">UPLOAD</Button>
                  </Link>
                </li>
                <li>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      {user.username}
                    </a>
                  </Dropdown>
                </li>
              </>
            ) : <>
                <li>
                  <Link to={`/login`}>
                    Log In
                </Link>
                </li>
                <li>
                  <Link className="signup-btn" to={`/signup`}>
                    Sign Up
                </Link>
                </li>
              </>
            }

          </ul>
        </> :
        <div>
          {isAuthenticated ?
            <MenuSlide>
              <Search />
              <Link to={`/upload`}>
                <Button className="upload-btn" type="primary">UPLOAD</Button>
              </Link>
              <Link className="user-nav-link" to={`/user/${user.username}`}>
                {user.username}
              </Link>
              <Link to={`/tag/technology`}>
                Technology
            </Link>
              <Link to={`/tag/category`}>
                Category
            </Link>
              <Link to={`/guidelines`}>
                Guidelines
            </Link>
              <a href={subscriberUrl} target="__blank">Subscribe</a>

              <Link to={`/feedback`}>
                Feedback
            </Link>
              <button className="btn-signout" onClick={onSignout}>Sign Out</button>
            </MenuSlide> :
            
            <MenuSlide>
              <Search />
              <Divider style={{ margin: 0 }} />
              <Link to={`/upload`}>
                <Button className="upload-btn" type="primary">UPLOAD</Button>
              </Link>
              <Link to={`/signup`}>
                Sign Up
            </Link>
              <Link to={`/login`}>
                Log In
            </Link>
              <Link to={`/tag/technology`}>
                Technology
            </Link>
              <Link to={`/tag/category`}>
                Category
            </Link>
              <Link to={`/guidelines`}>
                Guidelines
            </Link>
              <a href={subscriberUrl} target="__blank">Subscribe</a>
              <Link to={`/feedback`}>
                Feedback
            </Link>
            </MenuSlide>
          }
        </div>
      }
    </nav>
  )
};

export default NavBar;
