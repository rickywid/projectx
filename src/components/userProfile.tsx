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
  const [userProjects, setUserProjects] = useState<any>([]);
  const [userLikedProjects, setUserLikedProjects] = useState([]);
  const [userSavedProjects, setUserSavedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visible2, setVisible2] = useState<boolean>(false);
  const [value2, setValue2] = useState("");
  const [error, showError] = useState(false);
  const [currentPageUserProject, setCurrentPageUserProjects] = useState<number>(
    1
  );
  const [
    currentPageUserLikedProject,
    setCurrentPageUserLikedProjects,
  ] = useState<number>(1);
  const [
    currentPageUserSavedProject,
    setCurrentPageUserSavedProjects,
  ] = useState<number>(1);
  const [hasMoreUserProjects, setHasMoreUserProjects] = useState<boolean>(true);
  const [hasMoreUserLikedProjects, setHasMoreUserLikedProjects] = useState<
    boolean
  >(true);
  const [hasMoreUserSavedProjects, setHasMoreUserSavedProjects] = useState<
    boolean
  >(true);
  const [userProjectsCount, setUserProjectsCount] = useState<number>(0);
  const [userProjectsLikedCount, setUserProjectsLikedCount] = useState<number>(
    0
  );
  const [userProjectsSavedCount, setUserProjectsSavedCount] = useState<number>(
    0
  );
  const [activeTab, setActiveTab] = useState<string>("1");

  useEffect(() => {
    const fetch = async () => {
      const userFetch = await api.userAuth();

      if (userFetch.status === 404) {
        setUser(null);
      }

      const userAuth = await userFetch.json();
      const userProfileFetch = await api.getUserProfile(username);
      const userProfile = await userProfileFetch.json();

      const userLikedProjectsFetch = await api.getUserLikedProjects(
        username,
        currentPageUserProject,
        20
      );
      const userSavedProjectsFetch = await api.getUserSavedProjects(
        username,
        currentPageUserProject,
        20
      );
      const userProjectsFetch = await api.getUserProjects(
        username,
        currentPageUserProject,
        20
      );

      const userLikedProjects = await userLikedProjectsFetch.json();
      const userSavedProjects = await userSavedProjectsFetch.json();
      const userProjects = await userProjectsFetch.json();

      setUserAuth(userAuth);
      setUser(userProfile.user);

      setUserProjects(userProjects.data);
      setUserProjectsCount(userProjects.total);
      setHasMoreUserProjects(userProjects.hasMore);

      setUserSavedProjects(userSavedProjects.data);
      setUserProjectsSavedCount(userSavedProjects.total);
      setHasMoreUserSavedProjects(userSavedProjects.hasMore);

      setUserLikedProjects(userLikedProjects.data);
      setUserProjectsLikedCount(userLikedProjects.total);
      setHasMoreUserLikedProjects(userLikedProjects.hasMore);

      setIsLoading(false);

      document.title = `${userProfile.user.username}'s Profile - ${siteName}`;
    };

    fetch();
  }, []);

  const callback = (key: string) => {
    setActiveTab(key);
  };

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

  const fetchData = async () => {
    if (activeTab === "1") {
      console.log("fetch more user projects");
      // fetch user projects
      const userProjectsFetch = await api.getUserProjects(
        username,
        currentPageUserProject + 1,
        20
      );
      const projects = await userProjectsFetch.json();
      setCurrentPageUserProjects(currentPageUserProject + 1);
      setHasMoreUserProjects(projects.hasMore);
      setUserProjects(userProjects.concat(projects.data));
    }

    if (activeTab === "2") {
      console.log("fetch more liked projects");
      // fetch user liked projects
      const userLikedProjectsFetch = await api.getUserLikedProjects(
        username,
        currentPageUserLikedProject + 1,
        20
      );
      const likedProjects = await userLikedProjectsFetch.json();

      setCurrentPageUserLikedProjects(currentPageUserLikedProject + 1);
      setHasMoreUserLikedProjects(likedProjects.hasMore);
      setUserLikedProjects(userLikedProjects.concat(likedProjects.data));
    }

    if (activeTab === "3") {
      console.log("fetch more saved projects");
      // fetch user saved projects
      const userSavedProjectsFetch = await api.getUserSavedProjects(
        username,
        currentPageUserSavedProject + 1,
        20
      );
      const savedProjects = await userSavedProjectsFetch.json();

      setCurrentPageUserSavedProjects(currentPageUserSavedProject + 1);
      setHasMoreUserSavedProjects(savedProjects.hasMore);
      setUserSavedProjects(userSavedProjects.concat(savedProjects.data));
    }
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
          <Tabs
            className="user-tabs"
            defaultActiveKey={activeTab}
            onChange={callback}
          >
            <TabPane
              tab={
                <span>
                  <strong>My Projects </strong>
                  <span style={{ color: "grey" }}>{userProjectsCount}</span>
                </span>
              }
              key="1"
            >
              {userProjects.length ? (
                <ProjectsCard
                  isOwner={user.selfProfile}
                  projects={userProjects}
                  fetchData={fetchData}
                  hasMore={hasMoreUserProjects}
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
                  <span style={{ color: "grey" }}>
                    {userProjectsLikedCount}
                  </span>
                </span>
              }
              key="2"
            >
              <ProjectsCard
                projects={userLikedProjects}
                fetchData={fetchData}
                hasMore={hasMoreUserLikedProjects}
              />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <strong> Saved Projects </strong>
                  <span style={{ color: "grey" }}>
                    {userProjectsSavedCount}
                  </span>
                </span>
              }
              key="3"
            >
              <ProjectsCard
                projects={userSavedProjects}
                fetchData={fetchData}
                hasMore={hasMoreUserSavedProjects}
              />
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
