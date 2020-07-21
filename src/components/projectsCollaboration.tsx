import React, { useEffect, useState } from 'react';
import ProjectFilters from './projectFilters';
import ProjectsCard from './projectCard';
import Spinner from './spinner';
import ApiService from '../lib/apiService';

const ProjectsCollaboration = () => {
    const api = new ApiService();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const projectsFetch = await api.getProjectsByType('collaboration');
            const projects = await projectsFetch.json();
            setIsLoading(false);
            setProjects(projects.data);
        }

        fetch();
    }, []);

    return (
        <div>
            {isLoading ? <Spinner /> : 
                <div>
                    <ProjectFilters />
                    {projects.length > 1 ? (
                        <>
                            <h2>Projects interested in collaborating</h2>
                            <ProjectsCard projects={projects} />
                        </>
                    ) : <h2>No projects found</h2>}
                </div>
            }
        </div>
    )
}

export default ProjectsCollaboration;