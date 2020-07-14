import React from 'react';
import { Link } from "react-router-dom";
import { Tag } from 'antd';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import '../styles/projectCard.scss';
import ApiService from '../lib/apiService';
import truncate from '../lib/truncate';
import { motion } from "framer-motion"

const animate1 = {
  rest: {
    opacity: 0,
    bottom: 0,
  },
  hover: {
    opacity: 1,
  }
}

const animate2 = {
  rest: { opacity: 0 },
  hover: {
    opacity: 1
  }
}

const animate3 = {
  rest: {
    background: 'none'
  },
  hover: {
    background: 'linear-gradient(0deg, rgba(0,0,0,0.5471054632790616) 0%, rgba(255,255,255,0) 100%)' 
  }
}

const ProjectCard = (props: any) => {
  const api = new ApiService();


  const renderProjects = () => {

    return props.projects.map((project: any, index: number) => (
      <li key={index} className="project-item">
        <Link to={`/project/${project.uuid}`}>
          <motion.div
            initial="rest"
            animate="rest"
            whileHover="hover"
            className="project-card"
            style={{
              backgroundImage: `url(${project.images[0]}`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            <motion.div
              className="project-tag"
              variants={animate2}
            >
              {project.tags.length > 1 ? 
                <span>
                  <Tag>{project.tags[0]}</Tag>
                  <Tag>+{project.tags.slice(1).length}</Tag>
                </span> 
                : 
                <Tag>{project.tags[0]}</Tag>
              }
            </motion.div>
            <motion.div className="project-name-wrapper" variants={animate3}>
              <motion.p 
                className="project-name"
                variants={animate1}
              >
                {project.name.length > 30 ? truncate(project.name, 23) : project.name}
              </motion.p>
            </motion.div>
          </motion.div>
        </Link>
        <div className="project-icons">
          <Link 
            className="project-owner" 
            to={`/user/${project.username}`}>
              <img 
                className="project-user-avatar"
                src={project.gh_avatar} 
                alt="avatar" /> {project.username}
          </Link>
          {props.isOwner ? <small className="project-edit"><Link to={`/project/edit/${project.uuid}`}>EDIT</Link></small> : ''}
          <div>
            <span className="project-comments">
              <CommentOutlined /> {project.comment_count}
            </span>
            <span>
                <HeartOutlined /> {project.likes_count}    
            </span>
          </div>
        </div>
      </li>
    ));
  }

  return (
    <div>
      <ul className="list-wrapper">
        {renderProjects()}
      </ul>

    </div>
  );
};

export default ProjectCard;
