import React, { useEffect, useState } from 'react';
import ProjectFilters from './projectFilters';
import ProjectsCard from './projectCard';
import ApiService from '../lib/apiService';

const ProjectsPopular = () => {
    const api = new ApiService();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const projectsFetch = await api.getProjectsByType('popular');
            const projects = await projectsFetch.json();

            setProjects(projects.data);
        }

        fetch();
    }, []);

    return (
        <div>
            <ProjectFilters />
            <h2>Popular Projects</h2>
            <ProjectsCard projects={projects} />
        </div>
    )
}

export default ProjectsPopular;