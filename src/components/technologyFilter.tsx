import React, { useEffect, useState } from 'react';
import ProjectsCard from './projectCard';
import ResultsHeader from './resultsHeader';
import Spinner from './spinner';
import ApiService from '../lib/apiService';
import { technologies } from '../lib/const';

interface ITechnologyFilter {
    children?: React.ReactNode;
    match: any;
}

const TechnologyFilter = ({ match }: ITechnologyFilter) => {
    const api = new ApiService();
    const params = match.params.technology;
    let value: string;

    const [projects, setProjects] = useState<[]>([]);
    const [resultsCount, setResultsCount] = useState<number>(0);
    const [loading, isLoading] = useState<boolean>(true);

    useEffect(() => {
        for(let key in technologies) {
            if(technologies[key].slug === params) {
                value = key;
            }
        }

        const fetch = async () => {
            const res = await api.filterTechnology(value);
            const projects = await res.json();
            
            setProjects(projects.data);
            setResultsCount(projects.data.length);
            isLoading(false);
        }

        fetch(); 
        
    }, []);

  return (
    <div>
        {loading ? <Spinner />  : 
        <>
            <div className="tags-wrapper">
                <ResultsHeader count={resultsCount} name={params} />
                <ProjectsCard projects={projects}/>
            </div>
        </>
        }
    </div>
  );
};

export default TechnologyFilter;
