import React from 'react';
import { Link } from "react-router-dom";
import { Tag, Divider } from 'antd';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import '../styles/projectCard.scss';
import api from '../lib/apiService';
import ApiService from '../lib/apiService';

const ProjectCard = (props: any) => {
  const api = new ApiService();


  const renderProjects = () => {
    return props.projects.map((project: any, index: number) => (
      <li key={index} className="project-item">
        <Link to={`/project/${project.id}`}>

          <div className="project-card" key={index} style={{ backgroundImage: `url(${project.images[0]}`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
            <div className="project-detail-wrapper">
              <div className="project-title-wrapper">
                <h2>{project.name}</h2>
              </div>
              <Tag style={{zIndex: 1000}} onClick={() => console.log('tag clicked')}color="magenta">{project.tags[0]}</Tag>
            </div>
          </div>

        </Link>
        <div className="project-icons">
          <Link className="project-owner" to={`/user/${project.username}`}><img style={{height: '20px', borderRadius: '100%'}} src={project.gh_avatar} alt="avatar"/> {project.username}</Link>
          {props.isOwner ? <small className="project-edit"><Link to={`/project/edit/${project.id}`}>Edit</Link></small>: ''}
          <div>
            <span className="project-comments"><CommentOutlined /> {project.comment_count}</span><span><HeartOutlined /> {project.likes_count}    </span>     
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


