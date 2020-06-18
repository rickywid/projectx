import React, { ReactNode } from 'react';
import { Link } from "react-router-dom";
import { Tag } from 'antd';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import '../styles/projectCard.scss';

interface IProps {
  children?: ReactNode,
  projects?: any
}

const ProjectCard = ({ projects }: IProps) => {
  const renderProjects = () => {
    return projects.map((project: any, index: number) => (
      <li key={index} className="project-item">
        <Link to={`/project/${project.id}`}>

          <div className="project-card" key={index} style={{ backgroundImage: `url(${project.images[0]}`, backgroundSize: 'cover'}}>
            <div className="project-detail-wrapper">
              <div className="project-title-wrapper">
                <h2>{project.name}</h2>
              </div>
              <Tag style={{zIndex: 1000}} onClick={() => console.log('tag clicked')}color="magenta">{project.tags[0]}</Tag>
            </div>
          </div>

        </Link>
        <div className="project-icons">
          <Link className="project-owner" to={`/user/${project.username}`}>{project.username}</Link>
          <div>
            <span className="project-comments"><CommentOutlined /> 20</span><span><HeartOutlined /> 20    </span>     
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


