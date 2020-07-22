import React, { useEffect, useState } from 'react';
import ProjectFilter from './projectFilters';
import ProjectsCard from './projectCard';
import ResultsHeader from './resultsHeader';
import Spinner from './spinner';
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

    useEffect(() => {
        for(let key in tags) {
            if(tags[key].slug === params) {
                value = key;
            }
        }

        const fetch = async () => {
            const res = await api.filterCategory(value);
            const projects = await res.json();
            
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
                <ProjectFilter />
                {projects.length > 1 ? (
                    <>
                        <div className="tags-wrapper">
                            <ResultsHeader count={resultsCount} name={params} />
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
  );
};

export default TechnologyFilter;
