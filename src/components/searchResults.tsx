import React, { useEffect, useState } from 'react';
import Spinner from './spinner';
import ProjectsCard from './projectCard';
import ResultsHeader from './resultsHeader';
import ApiService from '../lib/apiService';
import Masthead from './masthead';
import ProjectFilters from './projectFilters';
import NotFound from './notFound';

const SearchResults: React.FC = () => {
    const api = new ApiService();
    const params = new URLSearchParams(document.location.search.substring(1));
    const query = params.get('q');
    const [projects, setProjects] = useState<any[]>([]);
    const [resultsCount, setResultsCount] = useState<number>(0);
    const [loading, isLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {      
        const fetchData = async () => {
            
            const res = await api.search(query as string);
            const json = await res.json();
            const userFetch = await api.userAuth();
            const user = await userFetch.json();
            setIsAuthenticated(user.isAuthenticated);
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
                {!isAuthenticated ? <Masthead /> : ""}
                <ProjectFilters />
                {projects.length > 0 ? (
                    <>
                        <ResultsHeader count={resultsCount} name={query} />
                        <ProjectsCard projects={projects}/>
                    </>
                ) : 
                (
                    <NotFound 
                    header="No results found"
                    subHeader="We couldn't find any projects. Try another search."
                />
                )
                }
            </>
            }
        </div>
    )
};

export default SearchResults;
