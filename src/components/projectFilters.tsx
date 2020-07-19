import React from 'react';
import { Link } from 'react-router-dom';
import history from '../lib/history';
import '../styles/filterButtons.scss';

const ProjectFilters = () => {

    const pathname = history.location.pathname;

    return (
        <div className="filter-wrapper">
            <Link className={`filter-btn ${pathname === `/` ? 'active' : ''}`} to="/">All</Link>
            <Link className={`filter-btn ${pathname === `/frontend` ? 'active' : ''}`} to="/frontend">Front End</Link>
            <Link className={`filter-btn ${pathname === `/fullstack` ? 'active' : ''}`} to="/fullstack">Full Stack</Link>
            <Link className={`filter-btn ${pathname === `/popular` ? 'active' : ''}`} to="/popular">Popular</Link>
            <Link className={`filter-btn ${pathname === `/collaboration` ? 'active' : ''}`} to="/collaboration">Collaboration</Link>
        </div>
    );
}

export default ProjectFilters;