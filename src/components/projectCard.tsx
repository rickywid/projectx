import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import { MessageFilled, UpCircleFilled } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import truncate from "../lib/truncate";
import { motion } from "framer-motion";
import "../styles/projectCard.scss";
import "../styles/global.scss";

const animate1 = {
  rest: {
    opacity: 0,
    bottom: 0,
  },
  hover: {
    opacity: 1,
  },
};

const animate2 = {
  rest: { opacity: 0 },
  hover: {
    opacity: 1,
  },
};

const animate3 = {
  rest: {
    background:
      "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0) 100%)",
  },
  hover: {
    background:
      "linear-gradient(0deg, rgba(0,0,0,0.5471054632790616) 0%, rgba(255,255,255,0) 100%)",
  },
};

interface Props {
  projects: Array<any>;
  fetchData: () => void;
  hasMore: boolean;
  isOwner?: boolean;
}

const ProjectCard = ({ projects, fetchData, hasMore, isOwner }: Props) => {
  return (
    <ul style={{ padding: 0 }}>
      <InfiniteScroll
        dataLength={projects.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <h4 style={{ textAlign: "center", gridColumnStart: 2 }}>
            Loading...
          </h4>
        }
        endMessage={
          <p style={{ textAlign: "center", gridColumnStart: 2 }}>
            <b>Yay! You have seen it all. What are you going to build next?</b>
          </p>
        }
      >
        <div className="list-wrapper">
          {projects.map((project: any, index: number) => (
            <li key={index} className="project-item">
              <Link to={`/project/${project.uuid}`}>
                <motion.div
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  className="project-card"
                  style={{
                    backgroundImage: `url(${project.images[0]}`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <motion.div className="project-tag" variants={animate2}>
                    {project.tags.length > 1 ? (
                      <span>
                        <Tag>{project.tags[0]}</Tag>
                        <Tag>+{project.tags.slice(1).length}</Tag>
                      </span>
                    ) : (
                      <Tag>{project.tags[0]}</Tag>
                    )}
                  </motion.div>
                  <motion.div
                    className="project-name-wrapper"
                    variants={animate3}
                  >
                    <motion.p className="project-name" variants={animate1}>
                      {project.name.length > 30
                        ? truncate(project.name, 23)
                        : project.name}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </Link>
              <div className="project-icons">
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
                {isOwner ? (
                  <small className="project-edit">
                    <Link to={`/project/edit/${project.uuid}`}>EDIT</Link>
                  </small>
                ) : (
                  ""
                )}
                <div>
                  <span className="project-comments">
                    <MessageFilled className="svg-filled" />{" "}
                    {project.comment_count}
                  </span>
                  <span>
                    <UpCircleFilled className="svg-filled" />{" "}
                    {project.likes_count}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </div>
      </InfiniteScroll>
    </ul>
  );
};

export default ProjectCard;
