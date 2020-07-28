import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Linkify from "react-linkify";
import {
  EllipsisOutlined,
  GithubOutlined,
  TwitterOutlined,
  HomeFilled,
} from "@ant-design/icons";
import { Input, Modal, Button, Tabs, message, Popover } from "antd";
import ApiService from "../lib/apiService";
import { siteName } from "../lib/const";
import { checkHttp } from "../lib/urlValidation";
import ProjectsCard from "../components/projectCard";
import Spinner from "./spinner";
import NotFound from "./notFound";
import "../styles/userProfile.scss";
import { ReactComponent as CodeSVG } from "../assets/code.svg";

const { TabPane } = Tabs;

interface IUserProfile {
  children?: React.ReactNode;
  match: any;
}

const UserProfile = ({ match }: IUserProfile) => {
  const api = new ApiService();
  const username = match.params.username;

  const [user, setUser] = useState<any>({});
  const [userAuth, setUserAuth] = useState<any>({});
  const [userProjects, setUserProjects] = useState([]);
  const [likedProjects, setLikedProjects] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visible2, setVisible2] = useState<boolean>(false);
  const [value2, setValue2] = useState("");
  const [error, showError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const userFetch = await api.userAuth();

      if (userFetch.status === 404) {
        setUser(null);
      }

      const userAuth = await userFetch.json();
      const userProfileFetch = await api.getUserProfile(username);
      const userProfile = await userProfileFetch.json();

      setUserAuth(userAuth);
      setUser(userProfile.data.user);
      setUserProjects(userProfile.data.userProjects);
      setLikedProjects(userProfile.data.likedProjects);
      setSavedProjects(userProfile.data.savedProjects);
      setIsLoading(false);

      document.title = `${userProfile.data.user.username}'s Profile - ${siteName}`;
    };

    fetch();
  }, []);

  const callback = (key: string) => {};

  const showModal = () => {
    setVisible2(true);
  };

  const handleReport = async () => {
    const form = new FormData();
    form.append("user_id", user.id);
    form.append("reason", value2);
    const res = await api.reportUser(form);

    if (res.status === 200) {
      message.success("User has been reported");
      setValue2("");
      setVisible2(false);
      showError(false);
    } else {
      showError(true);
    }
  };

  const onChange2 = (e: any) => {
    setValue2(e.target.value);
  };

  const handleCancel2 = () => {
    setVisible2(false);
  };

  return !user ? (
    <NotFound
      header="404!"
      subHeader="The page you are looking for does not exist."
      cta="Return to Homepage"
    />
  ) : (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="user-profile-wrapper">
          <div className="user-profile-info">
            <img className="user-avatar" src={user.gh_avatar} alt="" />
            <div className="user-profile-detail">
              <div className="user-profile-header">
                <h1 className="user-name">{user.username}</h1>
                {user.gh_profile_url ||
                user.user_profile_url ||
                user.twitter_profile_url ? (
                  <div className="user-profile-social-wrapper">
                    {user.user_profile_url ? (
                      <a
                        href={checkHttp(user.user_profile_url)}
                        target="__blank"
                      >
                        <HomeFilled />
                      </a>
                    ) : (
                      <></>
                    )}
                    {user.gh_profile_url ? (
                      <a href={checkHttp(user.gh_profile_url)} target="__blank">
                        <GithubOutlined />
                      </a>
                    ) : (
                      <></>
                    )}
                    {user.twitter_profile_url ? (
                      <a
                        href={checkHttp(user.twitter_profile_url)}
                        target="__blank"
                      >
                        <TwitterOutlined />
                      </a>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Linkify>
                <p className="user-profile-bio">{user.description}</p>
              </Linkify>
              <div className="user-profile-detail-bottom">
                <div className="user-profile-options">
                  {userAuth.username === username && (
                    <Link to={`/user/edit/${user.username}`}>
                      <Button size="small" type="dashed">
                        edit
                      </Button>
                    </Link>
                  )}
                  {userAuth.isAuthenticated && (
                    <Popover
                      content={
                        <div>
                          <p
                            className="popover-btn"
                            onClick={() => showModal()}
                          >
                            Report
                          </p>
                        </div>
                      }
                      trigger="click"
                    >
                      <EllipsisOutlined style={{ fontSize: "20px" }} />
                    </Popover>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Tabs className="user-tabs" defaultActiveKey="1" onChange={callback}>
            <TabPane
              tab={
                <span>
                  <strong>My Projects </strong>
                  <span style={{ color: "grey" }}>{userProjects.length}</span>
                </span>
              }
              key="1"
            >
              {userProjects.length ? (
                <ProjectsCard
                  isOwner={user.selfProfile}
                  projects={userProjects}
                />
              ) : (
                <div className="user-msg-no-projects">
                  <CodeSVG
                    style={{ width: 150, marginBottom: 20, fill: "#b3b3b3" }}
                  />
                  <p>You haven't uploaded any projects yet.</p>
                  <Link to="/upload">
                    <Button type="primary">Upload your first project</Button>
                  </Link>
                </div>
              )}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <strong> Liked Projects </strong>
                  <span style={{ color: "grey" }}>{likedProjects.length}</span>
                </span>
              }
              key="2"
            >
              <ProjectsCard projects={likedProjects} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <strong> Saved Projects </strong>
                  <span style={{ color: "grey" }}>{savedProjects.length}</span>
                </span>
              }
              key="3"
            >
              <ProjectsCard projects={savedProjects} />
            </TabPane>
          </Tabs>
        </div>
      )}

      <Modal
        title="Report User"
        visible={visible2}
        onOk={handleReport}
        onCancel={handleCancel2}
        okText="Submit"
      >
        <p>
          <strong>Why are you reporting {username}?</strong>
        </p>
        <Input.TextArea onChange={onChange2} value={value2} rows={4} />
        {error ? <p className="error-msg">Cannot be blank</p> : ""}
      </Modal>
    </div>
  );
};

export default UserProfile;
