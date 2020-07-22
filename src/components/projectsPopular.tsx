import React, { useEffect, useState } from 'react';
import ProjectFilters from './projectFilters';
import ProjectsCard from './projectCard';
import ResultsHeader from './resultsHeader';
import Spinner from './spinner';
import ApiService from '../lib/apiService';

const ProjectsPopular = () => {
    const api = new ApiService();
    const [projects, setProjects] = useState([]);
    const [resultsCount, setResultsCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const projectsFetch = await api.getProjectsByType('popular');
            const projects = await projectsFetch.json();

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
                <ProjectFilters />
                {projects.length > 0 ? (
                    <>
                        <div className="tags-wrapper">
                            <ResultsHeader count={resultsCount} name="Popular" />
                            <ProjectsCard projects={projects} />
                        </div>
                    </>
                ) : (
                    <div className="noMatch">
                        <div className="noMatch-inner">
                            <h1 className="noResults">No results found</h1>
                            <p>We couldn't find any projects. Try searching for something different.</p>
                        </div>
                    </div>
                    )}
            </div>
        }
    </div>
    )
}

export default ProjectsPopular;