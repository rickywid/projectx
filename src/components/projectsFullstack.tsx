import React, { useEffect, useState } from 'react';
import ProjectFilters from './projectFilters';
import ProjectsCard from './projectCard';
import Spinner from './spinner';
import ApiService from '../lib/apiService';

const ProjectFullstack = () => {
    const api = new ApiService();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const projectsFetch = await api.getProjectsByType('fullstack');
            const projects = await projectsFetch.json();

            setProjects(projects.data);
            setIsLoading(false);
        }

        fetch();
    }, []);

    return (
        <div>
            {isLoading ? <Spinner /> : 
                <div>
                    <ProjectFilters />
                    <h2>Full StackProjects</h2>
                    <ProjectsCard projects={projects} />
                </div>
            }
        </div>
    )
}

export default ProjectFullstack;