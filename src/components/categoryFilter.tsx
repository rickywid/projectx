import React, { useEffect, useState } from 'react';
import ProjectFilter from './projectFilters';
import ProjectsCard from './projectCard';
import ResultsHeader from './resultsHeader';
import NotFound from './notFound';
import Spinner from './spinner';
import Masthead from './masthead';
import ApiService from '../lib/apiService';
import { tags } from '../lib/const';

interface ITechnologyFilter {
    children?: React.ReactNode;
    match: any;
}

const TechnologyFilter = ({ match }: ITechnologyFilter) => {
    const api = new ApiService();
    const params = match.params.category;
    let value: string;

    const [projects, setProjects] = useState<[]>([]);
    const [resultsCount, setResultsCount] = useState<number>(0);
    const [loading, isLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        for(let key in tags) {
            if(tags[key].slug === params) {
                value = key;
            }
        }

        const fetch = async () => {
            const res = await api.filterCategory(value);
            const projects = await res.json();
            const userFetch = await api.userAuth();
const user = await userFetch.json();
setIsAuthenticated(user.isAuthenticated);
            setProjects(projects.data);
            setResultsCount(projects.data.length);
            isLoading(false);
        }

        fetch();
        
    }, []);

  return (
    <div>
        {loading ? <Spinner /> :
            <div>
                {!isAuthenticated ? <Masthead /> : ""}
                <ProjectFilter />
                {projects.length >= 1 ? (
                    <>
                        <div className="tags-wrapper">
                            <ResultsHeader count={resultsCount} name={params} />
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
  );
};

export default TechnologyFilter;
