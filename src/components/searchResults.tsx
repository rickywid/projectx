import React, { useEffect, useState } from 'react';
import Spinner from './spinner';
import ProjectsCard from './projectCard';
import ResultsHeader from './resultsHeader';
import ApiService from '../lib/apiService';

const SearchResults: React.FC = () => {
    const api = new ApiService();
    const params = new URLSearchParams(document.location.search.substring(1));
    const query = params.get('q');
    const [projects, setProjects] = useState<any[]>([]);
    const [resultsCount, setResultsCount] = useState<number>(0);
    const [loading, isLoading] = useState<boolean>(true);
  
    useEffect(() => {      
        const fetchData = async () => {
            
            const res = await api.search(query as string);
            const json = await res.json();
            
            setProjects(json.data);
            setResultsCount(json.count);
            isLoading(false);
        }
        
        fetchData();

    }, []);

    return (
        
        <div>
            {loading ? <Spinner />  : 
            <>
                <ResultsHeader count={resultsCount} name={query} />
                <ProjectsCard projects={projects}/>
            </>
            }
        </div>
    )
};

export default SearchResults;
