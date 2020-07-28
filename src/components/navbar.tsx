import React, { useState } from "react";
import { Button, Divider, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import Search from "./searchBar";
import useWindowDimensions from "../hooks/windowSize";
import AuthService from "../lib/authService";
import { subscriberUrl } from "../lib/const";
import "../App.scss";
import "../styles/navbar.scss";
import "../styles/mobileNav.scss";
import { slide as MenuSlide } from "react-burger-menu";

import Logo from "../assets/logo.png";

interface Props {
  user: {
    username: string;
    gh_avatar: string;
  };
  isAuthenticated: boolean;
  loading: boolean;
}

const NavBar = ({ user, isAuthenticated, loading }: Props) => {
  const api = new AuthService();
  const { height, width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const onSignout = async () => {
    await api.signout(new FormData());
    window.location.replace(process.env.REACT_APP_HOSTNAME as string);
  };

  const menu = (
    <Menu>
      <li>
        <Link className="nav-user-profile-mobile" to={`/user/${user.username}`}>
          Profile
        </Link>
      </li>
      <li>
        <button className="btn-signout" onClick={onSignout}>
          Sign Out
        </button>
      </li>
    </Menu>
  );

  const handleStateChange = (state: any) => {
    setMenuOpen(state.isOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return loading ? (
    <></>
  ) : (
    <nav>
      {width > 1110 ? (
        <>
          <div>
            <Link to="/">
              <img className="nav-logo" src={Logo} alt="logo" />
              <strong style={{ position: "absolute", top: 0 }}>beta</strong>
            </Link>
          </div>
          <Search />
          <ul className="nav-item-desktop">
            <li>
              <Link to="/tag/technology">Technologies</Link>
            </li>
            <li>
              <Link to="/tag/category">Categories</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to={`/upload`}>
                    <Button className="upload-btn" type="primary">
                      UPLOAD
                    </Button>
                  </Link>
                </li>
                <li>
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      {user.username}
                    </a>
                  </Dropdown>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={`/login`}>Log In</Link>
                </li>
                <li>
                  <Link className="signup-btn" to={`/signup`}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </>
      ) : (
        <div>
          {isAuthenticated ? (
            <MenuSlide
              isOpen={menuOpen}
              onStateChange={(state) => handleStateChange(state)}
            >
              <Link
                to="/"
                onClick={handleMenuClose}
                style={{ position: "relative" }}
              >
                <img className="nav-logo" src={Logo} alt="logo" />
                <strong
                  style={{
                    position: "absolute",
                    top: "-16px",
                    fontSize: "12px",
                    color: "#00b2a0",
                    fontWeight: "bold",
                  }}
                >
                  beta
                </strong>
              </Link>
              <Search />
              <Link to={`/upload`} onClick={handleMenuClose}>
                <Button className="upload-btn" type="primary">
                  UPLOAD
                </Button>
              </Link>
              <Link
                className="user-nav-link"
                onClick={handleMenuClose}
                to={`/user/${user.username}`}
              >
                {user.username}
              </Link>
              <Link to={`/tag/technology`} onClick={handleMenuClose}>
                Technology
              </Link>
              <Link to={`/tag/category`} onClick={handleMenuClose}>
                Category
              </Link>
              <Link to={`/guidelines`} onClick={handleMenuClose}>
                Guidelines
              </Link>
              <a href={subscriberUrl} target="__blank">
                Subscribe
              </a>

              <Link to={`/feedback`} onClick={handleMenuClose}>
                Feedback
              </Link>
              <button className="btn-signout" onClick={onSignout}>
                Sign Out
              </button>
            </MenuSlide>
          ) : (
            <MenuSlide
              isOpen={menuOpen}
              onStateChange={(state) => handleStateChange(state)}
            >
              <Link
                to="/"
                style={{ position: "relative" }}
                onClick={handleMenuClose}
              >
                <img className="nav-logo" src={Logo} alt="logo" />
                <strong
                  style={{
                    position: "absolute",
                    top: "-16px",
                    fontSize: "12px",
                    color: "#00b2a0",
                    fontWeight: "bold",
                  }}
                >
                  beta
                </strong>
              </Link>
              <Search />
              <Divider style={{ margin: 0 }} />
              <Link to={`/upload`} onClick={handleMenuClose}>
                <Button className="upload-btn" type="primary">
                  UPLOAD
                </Button>
              </Link>
              <Link to={`/signup`} onClick={handleMenuClose}>
                Sign Up
              </Link>
              <Link to={`/login`} onClick={handleMenuClose}>
                Log In
              </Link>
              <Link to={`/tag/technology`} onClick={handleMenuClose}>
                Technology
              </Link>
              <Link to={`/tag/category`} onClick={handleMenuClose}>
                Category
              </Link>
              <Link to={`/guidelines`} onClick={handleMenuClose}>
                Guidelines
              </Link>
              <a href={subscriberUrl} target="__blank">
                Subscribe
              </a>
              <Link to={`/feedback`} onClick={handleStateChange}>
                Feedback
              </Link>
            </MenuSlide>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
