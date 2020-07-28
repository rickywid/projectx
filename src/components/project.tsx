import React, { useState, useEffect } from "react";
import ApiService from "../lib/apiService";
import { Link } from "react-router-dom";
import Linkify from "react-linkify";
import {
  CodeOutlined,
  DesktopOutlined,
  TagFilled,
  TagsFilled,
  CalendarFilled,
  CheckCircleFilled,
  FlagFilled,
  BlockOutlined,
  StarOutlined,
  StarTwoTone,
  UpCircleOutlined,
} from "@ant-design/icons";
import {
  Tag,
  Select,
  Radio,
  Modal,
  Form,
  Input,
  Button,
  Divider,
  message,
} from "antd";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";
import Spinner from "./spinner";
import Comment from "./comment";
import NotFound from "./notFound";
import moment from "moment";
import history from "../lib/history";
import { HOSTNAME } from "../lib/env";
import { checkHttp } from "../lib/urlValidation";
import "../styles/global.scss";
import "../styles/project.scss";
import ParseDom from "../lib/domParser";

const { TextArea } = Input;
const { Option } = Select;

interface IFields {
  comment: { created_on: string };
}

const Project = () => {
  const api = new ApiService();
  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);

      const projectFetch = await api.getProject(id);

      if (projectFetch.status === 404) {
        setProjectFound(false);
        return;
      }

      const userFetch = await api.userAuth();
      const savedProjectsFetch = await api.isProjectSaved(id);

      const project = await projectFetch.json();
      const user = await userFetch.json();
      const savedProjects = await savedProjectsFetch.json();

      setisSaved(savedProjects.data);
      setUser(user);
      setProject(project.project);
      setC(project.comments);
      setLikeCount(project.likes.count);
      setisLiked(project.likes.users.includes(parseInt(user.id as string)));
      setIsLoading(false);

      document.title = `${project.project.name} - ${project.project.tagline}`;
    };

    fetch();
  }, []);

  const [user, setUser] = useState<any>({});
  const [project, setProject] = useState<any>({});
  const [projectFound, setProjectFound] = useState(true);
  const [c, setC] = useState<any>([]);
  const [isSaved, setisSaved] = useState<boolean>(false);
  const [isLiked, setisLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState<boolean>(
    false
  );
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>("1");

  const [form] = Form.useForm();

  const handleLike = async (like?: boolean) => {
    const id = window.location.pathname.split("/")[2];
    const form = new FormData();

    let data;

    form.append("project_id", project.id);
    form.append("user_id", user.id);

    if (like) {
      const res = await api.likeProject(id, form);
      if (res.status === 401) {
        redirect();
      }

      data = await res.json();
    } else {
      const res = await api.unlikeProject(id, form);
      if (res.status === 401) {
        redirect();
      }

      data = await res.json();
    }

    setisLiked(data.data.users.includes(user.id));
    setLikeCount(data.data.count);
  };

  const submitComment = async (values: IFields) => {
    const { comment } = values;
    const formComment = new FormData();
    setIsCommentSubmitting(true);

    formComment.append("comment", ParseDom(comment.toString()));
    formComment.append("project_id", project.uuid);
    formComment.append("user_id", user.id);

    const res = await api.createComment(formComment);
    const comments = await res.json();
    setC([...comments.data]);
    setIsCommentSubmitting(false);
    form.resetFields();
  };

  const handleSaveProject = async (saved: boolean) => {
    const id = window.location.pathname.split("/")[2];
    const form = new FormData();
    let data;

    form.append("project_id", project.id);
    form.append("user_id", user.id);

    if (!user.isAuthenticated) {
      history.push("/login");
      message.info("You must be logged in");

      return;
    }
    if (saved) {
      const res = await api.saveProject(id, form);
      data = await res.json();
    } else {
      const res = await api.unSaveProject(id, form);
      data = await res.json();
    }

    setisSaved(data.data);
  };

  const onChange = (e: any) => setValue(e.target.value);

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  const showReportProjectModal = () => setVisible(true);
  const handleCancel = () => setVisible(false);

  const handleReportProject = async () => {
    const form = new FormData();
    form.append("project_id", id);
    form.append("comment", value);
    await api.reportProject(form);
    message.success("Project has been reported");
    setVisible(false);
  };

  const copyUrl = () => {
    navigator.clipboard
      .writeText(document.location.href)
      .then(() => {
        message.info("Url has been copied");
      })
      .catch((err) => {
        // This can happen if the user denies clipboard permissions:
        console.error("Could not copy text: ", err);
      });
  };

  const handleUpdateComment = async (values: any, commentID: number) => {
    const form = new FormData();
    form.append("comment_id", commentID!.toString());
    form.append("comment", ParseDom(values.updateComment));
    form.append("project_id", id);
    const res = await api.updateComment(commentID, form);
    const comments = await res.json();

    setC([...comments.data]);
  };

  const handleDeleteComment = async (commentID: number) => {
    const form = new FormData();
    form.append("comment_id", commentID!.toString());
    form.append("project_id", id);
    await api.deleteComment(commentID, form);

    const res = await api.updateComment(commentID, form);
    const comments = await res.json();

    setC([...comments.data]);
  };

  const redirect = () => {
    message.info("You must be logged in");
    history.push("/login");
    return;
  };

  const handleCommentSort = async (value: string) => {
    const commentsFetch = await api.commentSort(id, value);
    const comments = await commentsFetch.json();
    setC(comments.data);
  };

  return !projectFound ? (
    <NotFound
      header="404!"
      subHeader="The page you are looking for does not exist."
      cta="Return to Homepage"
    />
  ) : (
    <div className="project-view">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="project-view-title">
            <div className="project-view-title-info">
              <h2>{project.name}</h2>
              <p>
                by{" "}
                <Link
                  className="project-owner"
                  to={`/user/${project.username}`}
                >
                  <img
                    className="user-avatar-img"
                    src={project.gh_avatar}
                    alt="avatar"
                  />{" "}
                  {project.username}
                </Link>
              </p>
            </div>
          </div>
          <img
            className="project-view-screenshot"
            src={project.images[0]}
            alt="screenshot"
          />
          <div className="project-actions-wrapper">
            <a className="project-links-btn" href={checkHttp(project.url)}>
              <DesktopOutlined /> WEBSITE
            </a>
            {project.repo ? (
              <a className="project-links-btn" href={checkHttp(project.repo)}>
                <CodeOutlined /> REPOSITORY
              </a>
            ) : (
              ""
            )}
            {isSaved ? (
              <a
                className="project-links-btn"
                onClick={() => handleSaveProject(false)}
              >
                <strong>
                  <StarTwoTone twoToneColor="#dea703" /> SAVED TO FAVOURITES
                </strong>
              </a>
            ) : (
              <a
                className="project-links-btn"
                onClick={() => handleSaveProject(true)}
              >
                <strong>
                  <StarOutlined /> ADD TO FAVOURITES
                </strong>
              </a>
            )}
          </div>
          <div className="project-view-content">
            <div className="project-view-left-col">
              <p className="project-tagline">{project.tagline}</p>
              <Linkify>
                <p className="project-description">{project.description}</p>
              </Linkify>
              <Divider />
              {user.isAuthenticated ? (
                <>
                  <h4>Comment</h4>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={submitComment as any}
                  >
                    <Form.Item
                      name="comment"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <TextArea
                        placeholder="What do you think of this project?"
                        rows={2}
                      />
                    </Form.Item>
                    <div>
                      {isCommentSubmitting ? (
                        <Button type="primary" disabled>
                          Send
                        </Button>
                      ) : (
                        <Button
                          className="comment-btn"
                          type="primary"
                          htmlType="submit"
                        >
                          Send
                        </Button>
                      )}
                    </div>
                  </Form>
                  <Divider />
                </>
              ) : (
                <p className="comment-login-header">
                  Please <Link to={`/login`}>Log In</Link> to write a comment
                </p>
              )}

              <div className="project-view-comments">
                <h4 className="project-view-comments-header">
                  {c.length}{" "}
                  {c.length > 1 || c.length === 0 ? "comments" : "comment"}{" "}
                </h4>
                <Select
                  className="project-view-comments-select"
                  defaultValue="oldest"
                  onChange={handleCommentSort}
                >
                  <Option value="oldest">Oldest</Option>
                  <Option value="newest">Newest</Option>
                </Select>
                {c?.map((c: any, i: number) => (
                  <Comment
                    key={i}
                    userId={user.id}
                    comment={c}
                    handleUpdateComment={handleUpdateComment}
                    handleDeleteComment={handleDeleteComment}
                  />
                ))}
              </div>
            </div>
            <div className="project-view-right-col">
              <div style={{ marginBottom: "20px" }}>
                {isLiked ? (
                  <Button
                    className="like-project-btn-default"
                    onClick={() => handleLike(false)}
                  >
                    <UpCircleOutlined style={{ fontSize: "1.5rem" }} />
                    <span style={{ marginRight: "10px" }}>UPVOTED</span>
                    <span>{likeCount}</span>
                  </Button>
                ) : (
                  <Button
                    className="like-project-btn"
                    onClick={() => handleLike(true)}
                  >
                    <UpCircleOutlined style={{ fontSize: "1.5rem" }} />
                    <span style={{ marginRight: "10px" }}>UPVOTE</span>
                    {parseInt(likeCount) ? <span>{likeCount}</span> : ""}
                  </Button>
                )}
              </div>
              <div className="project-share-wrapper">
                <FacebookShareButton url={HOSTNAME as string}>
                  <FacebookIcon size={32} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={HOSTNAME as string}
                  title={project.name}
                >
                  <TwitterIcon size={32} />
                </TwitterShareButton>
                <Button
                  className="btn-copy"
                  icon={<BlockOutlined />}
                  onClick={copyUrl}
                >
                  <strong>Copy</strong>
                </Button>
              </div>
              <div className="project-info">
                <div className="project-view-tags">
                  <TagFilled className="svg-filled" />
                  <ul>
                    {project.technologies.map(
                      (technology: string, i: number) => (
                        <Link key={i} to={`/tag/tech/${technology}`}>
                          <li style={{ listStyle: "none" }}>
                            <Tag color="blue">{technology}</Tag>
                          </li>
                        </Link>
                      )
                    )}
                  </ul>
                </div>
                <div className="project-view-tags">
                  <TagsFilled className="svg-filled" />
                  <ul>
                    {project.tags.map((category: string) => (
                      <Link to={`/tag/category/${category}`}>
                        <li style={{ listStyle: "none" }}>
                          <Tag color="cyan">{category}</Tag>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
                <div className="project-view-details">
                  <ul>
                    {project.collaboration && (
                      <li>
                        <CheckCircleFilled className="svg-filled" /> Interested
                        in collaborating
                      </li>
                    )}
                    <li>
                      <CalendarFilled className="svg-filled" />{" "}
                      {moment(project.created_on).format("MMM Do YYYY")}
                    </li>
                    <li>
                      <FlagFilled className="svg-filled" />{" "}
                      <button
                        className="project-report-btn"
                        onClick={showReportProjectModal}
                      >
                        Report
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Modal
        title="Report Project"
        visible={visible}
        onOk={handleReportProject}
        onCancel={handleCancel}
        okText="Submit"
      >
        <Radio.Group onChange={onChange} value={value}>
          <Radio style={radioStyle} value={"1"}>
            Website is down
          </Radio>
          <Radio style={radioStyle} value={"2"}>
            Sexual/NSFW
          </Radio>
          <Radio style={radioStyle} value={"3"}>
            Illegal
          </Radio>
          <Radio style={radioStyle} value={"4"}>
            Spam
          </Radio>
        </Radio.Group>
      </Modal>
    </div>
  );
};

export default Project;
