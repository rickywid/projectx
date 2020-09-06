import React, { useState } from "react";
import { Button, Divider, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import Search from "./searchBar";
import useWindowDimensions from "../hooks/windowSize";
import AuthService from "../lib/authService";
import { subscriberUrl } from "../lib/const";
import { NODE_ENV, HOSTNAME } from "../lib/env";
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
  const { width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const onSignout = async () => {
    await api.signout(new FormData());
    window.location.replace(HOSTNAME as string);
  };

  const menu = (
    <Menu>
      <li>
        <Link
          data-testid="profile-btn"
          className="nav-user-profile-mobile"
          to={`/user/${user.username}`}
        >
          Profile
        </Link>
      </li>
      <li>
        <button
          data-testid="signout-btn"
          className="btn-signout"
          onClick={onSignout}
        >
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
            <Link to="/" style={{ position: "relative" }}>
              <img className="nav-logo" src={Logo} alt="logo" />
              {NODE_ENV === "development" && (
                <strong style={{ position: "absolute", top: "-15px" }}>
                  beta
                </strong>
              )}
            </Link>
          </div>
          <Search />
          <ul className="nav-item-desktop">
            <li>
              <Link data-testid="technologies" to="/tag/technology">
                Technologies
              </Link>
            </li>
            <li>
              <Link data-testid="categories" to="/tag/category">
                Categories
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <li
                    data-testid="profile-badge"
                    className="user-profile-badge-desktop"
                  >
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      {user.username[0]}
                    </a>
                  </li>
                </Dropdown>
                <li>
                  <Link to={`/upload`}>
                    <Button
                      data-testid="upload-btn"
                      className="upload-btn"
                      type="primary"
                    >
                      UPLOAD
                    </Button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link data-testid="login-btn" to={`/login`}>
                    Log In
                  </Link>
                </li>
                <li>
                  <Link
                    data-testid="signup-btn"
                    className="signup-btn"
                    to={`/signup`}
                  >
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
                {NODE_ENV === "development" && (
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
                )}
              </Link>
              <Search />
              <Link
                data-testid="upload-btn-slide"
                to={`/upload`}
                onClick={handleMenuClose}
              >
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
                Subscribedd
              </a>

              <Link to={`/feedback`} onClick={handleMenuClose}>
                Feedback
              </Link>
              <button className="signout-btn-slide" onClick={onSignout}>
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
                {NODE_ENV === "development" && (
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
                )}
              </Link>
              <Search />
              <Divider style={{ margin: 0 }} />
              <Link to={`/upload`} onClick={handleMenuClose}>
                <Button
                  data-testid="upload-btn-mobile"
                  className="upload-btn"
                  type="primary"
                >
                  UPLOAD
                </Button>
              </Link>
              <Link
                data-testid="signup-btn-mobile"
                to={`/signup`}
                onClick={handleMenuClose}
              >
                Sign Up
              </Link>
              <Link
                data-testid="login-btn-mobile"
                to={`/login`}
                onClick={handleMenuClose}
              >
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
