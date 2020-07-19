import React, { useEffect, useState } from 'react';
import ProjectFilters from './projectFilters';
import ProjectsCard from './projectCard';
import ApiService from '../lib/apiService';

const ProjectsFullstack = () => {
    const api = new ApiService();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const projectsFetch = await api.getProjectsByType('fullstack');
            const projects = await projectsFetch.json();

            setProjects(projects.data);
        }

        fetch();
    }, []);

    return (
        <div>
            <ProjectFilters />
            <h2>Full Stack Projects</h2>
            <ProjectsCard projects={projects} />
        </div>
    )
}

export default ProjectsFullstack;