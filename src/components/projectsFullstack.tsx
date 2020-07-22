import React, { useEffect, useState } from 'react';
import ProjectFilters from './projectFilters';
import ProjectsCard from './projectCard';
import ResultsHeader from './resultsHeader';
import NotFound from './notFound';
import Spinner from './spinner';
import ApiService from '../lib/apiService';

const ProjectsFullstack = () => {
    const api = new ApiService();
    const [projects, setProjects] = useState([]);
    const [resultsCount, setResultsCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const projectsFetch = await api.getProjectsByType('fullstack');
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
                            <ResultsHeader count={resultsCount} name={'Full Stack'} />
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

export default ProjectsFullstack;