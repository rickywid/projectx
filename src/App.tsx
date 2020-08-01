import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import ApiService from "./lib/apiService";
import { NODE_ENV } from "./lib/env";
import useWindowDimensions from "./hooks/windowSize";
import Routes from "./routes";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import SubscribeForm from "./components/subscribeForm";
import "./App.scss";
import Logo from "./assets/logo.png";
import { subscriberUrl } from "./lib/const";

interface IUser {
  isAuthenticated: boolean;
  username: string;
  gh_avatar: string;
}

function App() {
  const [user, setUser] = useState<IUser>({
    isAuthenticated: false,
    username: "",
    gh_avatar: "",
  });
  const [loading, isLoading] = useState<boolean>(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const api = new ApiService();
    const fetchData = async () => {
      // userID if user logged in via username/password
      // this can also be userID of a new user account (signup)
      const userID = localStorage.getItem("userID") || 0;

      const res = await api.getUser(userID as string);
      const json = await res.json();
      localStorage.removeItem("userID");

      isLoading(false);
      if (json.data.isAuthenticated) {
        setUser(json.data);
      }
    };

    fetchData();
  }, []);

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  const [visible, setVisible] = useState<boolean>(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {NODE_ENV === "development" && width > 1110 && (
        <div
          className={`beta-notification ${!isNotificationOpen ? "close" : ""}`}
        >
          <span onClick={showModal}>Sign Up</span> to our mailing list to
          receive updates about upcoming features and LAUNCH DATE!{" "}
          <CloseCircleOutlined
            className="close"
            onClick={handleCloseNotification}
          />
        </div>
      )}
      <NavBar
        user={user}
        isAuthenticated={user.isAuthenticated}
        loading={loading}
      />
      {width < 1110 && (
        <>
          <div className="nav-mobile-wrapper">
            <Link to="/">
              <img className="logo-mobile" src={Logo} alt="logo" />
              {NODE_ENV === "development" && (
                <strong
                  style={{ position: "absolute", top: "6px", fontSize: "12px" }}
                >
                  beta
                </strong>
              )}
            </Link>
            {user.isAuthenticated && (
              <Link
                className="nav-user-profile-mobile"
                to={`/user/${user.username}`}
              >
                <span>{user.username[0]}</span>
              </Link>
            )}
          </div>
          <div
            className={`beta-notification mobile ${
              !isNotificationOpen ? "close" : ""
            }`}
          >
            <a href={subscriberUrl} target="__blank">
              Sign Up
            </a>{" "}
            to our mailing list to receive updates about upcoming features and
            LAUNCH DATE!{" "}
            <CloseCircleOutlined
              className="close"
              onClick={handleCloseNotification}
            />
          </div>
        </>
      )}
      <Layout>
        <Layout.Content>{Routes}</Layout.Content>
        {width > 700 && <Footer />}
      </Layout>
      <SubscribeForm
        handleOk={handleOk}
        handleCancel={handleCancel}
        isVisible={visible}
      />
    </Layout>
  );
}

export default App;
