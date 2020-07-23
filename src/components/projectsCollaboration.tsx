import React, { useEffect, useState } from 'react';
import ProjectFilters from './projectFilters';
import ProjectsCard from './projectCard';
import ResultsHeader from './resultsHeader';
import Spinner from './spinner';
import NotFound from './notFound';
import Masthead from './masthead';

import ApiService from '../lib/apiService';

const ProjectsCollaboration = () => {
    const api = new ApiService();
    const [projects, setProjects] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [resultsCount, setResultsCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const userFetch = await api.userAuth();
            const user = await userFetch.json();
            const projectsFetch = await api.getProjectsByType('collaboration');
            const projects = await projectsFetch.json();
            setIsAuthenticated(user.isAuthenticated);
            setIsLoading(false);
            setProjects(projects.data);
            setResultsCount(projects.data.length);
        }

        fetch();
    }, []);

    return (
        <div>
        {isLoading ? <Spinner /> :
            <div>
                {!isAuthenticated ? <Masthead /> : ""}
                <ProjectFilters />
                {projects.length > 0 ? (
                    <>
                        <div className="tags-wrapper">
                            <ResultsHeader count={resultsCount} name="Collaboration" />
                            <ProjectsCard projects={projects} />
                        </div>
                    </>
                ) : (
                    <NotFound 
                        header="No results found"
                        subHeader="We couldn't find any projects. Try another search."
                    />
                    )}
            </div>
        }
    </div>
    )
}

export default ProjectsCollaboration;