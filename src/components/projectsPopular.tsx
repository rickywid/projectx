import React, { useEffect, useState } from 'react';
import ProjectFilters from './projectFilters';
import ProjectsCard from './projectCard';
import ResultsHeader from './resultsHeader';
import Spinner from './spinner';
import NotFound from './notFound';
import ApiService from '../lib/apiService';
import Masthead from './masthead';

const ProjectsPopular = () => {
    const api = new ApiService();
    const [projects, setProjects] = useState([]);
    const [resultsCount, setResultsCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const projectsFetch = await api.getProjectsByType('popular');
            const projects = await projectsFetch.json();
            const userFetch = await api.userAuth();
            const user = await userFetch.json();
            setIsAuthenticated(user.isAuthenticated);
            setProjects(projects.data);
            setResultsCount(projects.data.length);
            setIsLoading(false);
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
                            <ResultsHeader count={resultsCount} name="Popular" />
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

export default ProjectsPopular;