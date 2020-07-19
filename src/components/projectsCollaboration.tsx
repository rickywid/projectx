import React, { useEffect, useState } from 'react';
import ProjectFilters from './projectFilters';
import ProjectsCard from './projectCard';
import ApiService from '../lib/apiService';

const ProjectsCollaboration = () => {
    const api = new ApiService();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const projectsFetch = await api.getProjectsByType('collaboration');
            const projects = await projectsFetch.json();

            setProjects(projects.data);
        }

        fetch();
    }, []);

    return (
        <div>
            <ProjectFilters />
            <h2>Projects interested in collaborating</h2>
            <ProjectsCard projects={projects} />
        </div>
    )
}

export default ProjectsCollaboration;