import React, { useEffect, useState } from 'react';
import ProjectFilters from './projectFilters';
import ProjectsCard from './projectCard';
import ResultsHeader from './resultsHeader';
import Spinner from './spinner';
import ApiService from '../lib/apiService';

const ProjectsCollaboration = () => {
    const api = new ApiService();
    const [projects, setProjects] = useState([]);
    const [resultsCount, setResultsCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const projectsFetch = await api.getProjectsByType('collaboration');
            const projects = await projectsFetch.json();
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
                <ProjectFilters />
                {projects.length > 0 ? (
                    <>
                        <div className="tags-wrapper">
                            <ResultsHeader count={resultsCount} name="Collaboration" />
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

export default ProjectsCollaboration;